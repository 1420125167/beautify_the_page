# encoding:utf-8
import requests
from bs4 import BeautifulSoup
import re
import sys
import io
import pymysql
insert_table_sql = """\
INSERT INTO others_news(news_title,news_content,news_date,news_link)
 VALUES('{news_title}','{news_content}','{news_date}','{news_link}')
"""

sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')

conn = pymysql.connect(
    host = '127.0.0.1',
    user = 'root',
    passwd= '',
    db = 'aiwebapi_db',
    charset = 'utf8'
)
cur = conn.cursor()

def sort_seed(news):
	return news['date']

sql = "select global_extra from others_global where global_account = 'administer_yf'"
cur.execute(sql)
start = int(cur.fetchmany(1)[0][0])

sql = "delete from others_news"
cur.execute(sql)

newsList = []
date_pattern = '发布日期：([\s\S]*?) '

for i in range(start, start+100):
	url = "http://ai.ailab.cn/article-"+ str(i) +".html"
	res = requests.get(url)
	if len(res.text)==0:
		start = i
		break

	soup = BeautifulSoup(res.text, 'html.parser')

	text = soup.select('.article-content > p')
	text.pop()
	article = "\n".join(map(lambda x: str(x), text))
	article = article.replace('style="text-indent:2em;"', '').replace("'","")

	text = soup.select('.h1')[0].get_text()
	title = text.split(' ')[0].replace("'","\'")


	date = "".join(re.findall(date_pattern, text))

	news = {"title": title.strip(), "date": date, "article": article,"link":url}
	if news['article']:
		newsList.append(news)


newsList = sorted(newsList,key=sort_seed,reverse=True)

for news in newsList:
	sql = insert_table_sql.format(news_title=str(news['title']), news_content=str(news['article']), news_date=str(news['date']), news_link=str(news['link']))
	cur.execute(sql)
sql = "update others_global set global_extra = '"+str(start)+"' where  global_account = 'administer_yf'"
cur.execute(sql)
conn.commit()
cur.close()
conn.close()

