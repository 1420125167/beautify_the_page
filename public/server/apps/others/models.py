# _*_ encoding:utf-8 _*_
from django.db import models

from datetime import datetime
from django.utils import timezone

# Create your models here.

#新闻资讯
class News(models.Model):
    news_title = models.CharField(max_length=50,verbose_name=u'新闻标题')
    news_content = models.TextField(verbose_name=u'新闻内容')
    news_img = models.TextField(verbose_name=u'新闻图片', null=True, blank=True)
    news_date = models.DateTimeField(default=timezone.now,verbose_name=u'日期')
    news_link = models.CharField(max_length=400, verbose_name=u'新闻链接',null=True,blank=True)
    news_extra = models.CharField(max_length=100, verbose_name=u'其他',null=True,blank=True)

    class Meta:
        verbose_name = u'新闻资讯'
        verbose_name_plural = verbose_name
        ordering = ('news_date',)

    def __str__(self):
        return self.news_title


#全局数据
class Global(models.Model):
    global_account = models.CharField(primary_key=True,max_length=24,verbose_name=u'管理员账号')
    global_password = models.CharField(max_length=32,verbose_name=u'管理员密码')
    global_download_cost = models.IntegerField(verbose_name=u'下载资料所需积分')
    global_extra = models.CharField(max_length=100,verbose_name=u'其他',null=True,blank=True)

    class Meta:
        verbose_name = u'全局数据'
        verbose_name_plural = verbose_name


#官方答疑
class AnswerQuestion(models.Model):
    answer_title = models.CharField(max_length=50,verbose_name=u'答疑标题')
    answer_img = models.TextField(verbose_name=u'答疑图片', null=True, blank=True)
    answer_content = models.TextField(verbose_name=u'答疑内容')
    answer_date = models.DateTimeField(default=timezone.now, verbose_name=u'发布时间')

    class Meta:
        verbose_name = u'官方答疑'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.answer_title


#资源下载
class ResourceDownload(models.Model):
    resource_name = models.CharField(max_length=20,verbose_name=u'资源名')
    resource_type = models.IntegerField(verbose_name=u'资源类型')
    resource_link = models.CharField(max_length=400,verbose_name=u'下载链接')

    class Meta:
        verbose_name = u'资源下载'
        verbose_name_plural = verbose_name
        ordering = ('resource_type',)

    def __str__(self):
        return self.resource_name


#术语检索
class TermSearch(models.Model):
    term_name = models.CharField(unique=True, max_length=20, verbose_name=u'术语名')
    term_intro = models.TextField(verbose_name=u'术语解释')
    term_img = models.CharField(max_length=300, verbose_name=u'解释图', null=True, blank=True)

    class Meta:
        verbose_name = u'术语检索'
        verbose_name_plural = verbose_name
        ordering = ('term_name',)

    def __str__(self):
        return self.term_name


#api检索
class ApiSearch(models.Model):
    api_name = models.CharField(unique=True, max_length=20, verbose_name=u'api函数/定义名')
    api_intro = models.TextField(verbose_name=u'api解释')
    api_code = models.CharField(max_length=1000, verbose_name=u'实现代码')

    class Meta:
        verbose_name = u'api检索'
        verbose_name_plural = verbose_name
        ordering = ('api_name',)

    def __str__(self):
        return self.api_name
