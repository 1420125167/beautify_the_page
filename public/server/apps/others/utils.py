# encoding:utf-8
import requests #python实现的简单易用的HTTP库
from bs4 import BeautifulSoup
import re
import sys
import io
import pymysql #python3中用于连接MySQL服务器的一个库
insert_table_sql = """\
INSERT INTO others_news(news_title,news_content,news_date,news_link)
 VALUES('{news_title}','{news_content}','{news_date}','{news_link}')
"""

#改变标准输出的默认编码 解决中文编码错误的问题
sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')

# 打开数据库连接
conn = pymysql.connect(
    host = '127.0.0.1',
    user = 'root',
    passwd= '',
    db = 'aiwebapi_db',
    charset = 'utf8'
)

# 实例化一个游标对象
cur = conn.cursor()

def sort_seed(news):
	return news['date']

#找到最新的文章id用于合成url
sql = "select global_extra from others_global where global_account = 'administer_yf'"
cur.execute(sql)
#start_id = int(cur.fetchone()[0][0])
start_id = 91486

#删除过去的新闻
sql = "delete from others_news"
cur.execute(sql)

newsList = []
date_pattern = '发布日期：([\s\S]*?) ' #/s匹配任意空白字符  /S匹配任意非空白字符 *匹配多次 ？非贪婪

#爬取新的新闻
for i in range(start_id, start_id+100):
	url = "http://ai.ailab.cn/article-"+ str(i) +".html"
	res = requests.get(url)#获得该url请求下的所有资源
	if len(res.text)==0:#如果该url下不存在html文本 即无新闻
		start = i
		break

	#将html文本用html解析的方式生成soup对象
	soup = BeautifulSoup(res.text, 'html.parser')

	#爬取新闻的内容
	text = soup.select('.article-content > p')#article-content类下所有p标签 返回list
	text.pop()
	article = "\n".join(map(lambda x: str(x), text)) #转换成字符串 lambda表达式=匿名函数 map()是python内置的高阶函数 接受一个函数和一个list 把函数作用于list的每个元素上 得到一个新的list
	#article = article.replace('style="text-indent:2em;"', '').replace("'","").replace('<p>',"").replace("</p>",'').replace()

	#爬取新闻的标题
	text = soup.select('.h1')[0].get_text()#取出h1标签下的第一个块中的内容
	title = text.split(' ')[0].replace("'","\'")#以空格分割 并将'替换成/'

	#爬取新闻的发布日期
	date = "".join(re.findall(date_pattern, text))

	news = {"title": title.strip(), "date": date, "article": article,"link":url}#strip移出字符串首位的空格或换行
	if news['article']:
		newsList.append(news)

#按日期倒序排序
newsList = sorted(newsList,key=sort_seed,reverse=True)

#将爬取的新闻存入数据库
for news in newsList:
	sql = insert_table_sql.format(news_title=str(news['title']), news_content=str(news['article']), news_date=str(news['date']), news_link=str(news['link']))
	cur.execute(sql)
sql = "update others_global set global_extra = '"+str(start)+"' where  global_account = 'administer_yf'"
cur.execute(sql)
conn.commit()
cur.close()
conn.close()