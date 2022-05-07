# _*_ encoding:utf-8 _*_
from django.db import models

from datetime import datetime
from django.utils import timezone

# Create your models here.

#课程信息
class Lesson(models.Model):
    lesson_name = models.CharField(max_length=50,verbose_name=u'课程名')
    lesson_intro = models.CharField(max_length=300,verbose_name=u'课程简介')
    lesson_img = models.TextField(verbose_name=u'课程封面', null=True, blank=True)
    lesson_chapter = models.CharField(max_length=300,verbose_name=u'章节')
    chapter_num = models.IntegerField(verbose_name='章节数目',default=1)
    lesson_date = models.DateTimeField(default=timezone.now,verbose_name=u'发布时间')

    class Meta:
        verbose_name = '课程信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.lesson_name


#章节信息
class Chapter(models.Model):
    chapter_num = models.IntegerField(verbose_name=u'章节序号')
    lesson_id = models.ForeignKey(Lesson,on_delete=models.CASCADE,verbose_name=u'课程号')
    chapter_name = models.CharField(max_length=50,verbose_name=u'章节标题')
    chapter_intro = models.CharField(max_length=300,verbose_name=u'章节简介')
    chapter_date = models.DateTimeField(default=timezone.now,verbose_name=u'发布时间')
    #chapter_extra_data = models.CharField(max_length=500,verbose_name=u'其他内容')

    class Meta:
        verbose_name = u'章节信息'
        verbose_name_plural = verbose_name
        ordering = ('chapter_num',)

    def __str__(self):
        return self.chapter_name


#课程模块
class CourseBlock(models.Model):
    block_num = models.IntegerField(verbose_name=u'块序号')
    lesson_id = models.ForeignKey(Lesson,on_delete=models.CASCADE,verbose_name=u'课程号')
    chapter_id = models.ForeignKey(Chapter,on_delete=models.CASCADE,verbose_name=u'章节号')
    block_intro = models.CharField(max_length=300,verbose_name=u'模块简介',default='kkw')
    block_word = models.TextField(verbose_name=u'文字说明',null=True,blank=True) #blank表示是否允许存空字符串（针对表单） null表示是否允许为空（针对数据库）
    block_video = models.CharField(max_length=300,verbose_name=u'视频说明',null=True,blank=True)
    block_img = models.TextField(max_length=300, verbose_name=u'图片说明', null=True, blank=True)
    block_code = models.TextField(verbose_name=u'代码说明', null=True, blank=True)
    block_experiment = models.SmallIntegerField(verbose_name=u'代码版', null=True, blank=True,default=0)

    class Meta:
        verbose_name = u'课程模块'
        verbose_name_plural = verbose_name
        ordering = ('lesson_id','chapter_id','block_num',)


#课程资料
class CourseResource(models.Model):
    lesson_id = models.ForeignKey(Lesson,on_delete=models.CASCADE,verbose_name=u'课程号')
    data_name = models.CharField(max_length=50,verbose_name=u'资料名')
    data_path = models.CharField(max_length=500,verbose_name=u'资料下载路径')
    data_is_free = models.SmallIntegerField(verbose_name=u'是否免费',default=0)

    class Meta:
        verbose_name = u'课程资料'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.data_name


#课程相关链接
class CourseLink(models.Model):
    lesson_id = models.ForeignKey(Lesson,on_delete=models.CASCADE,verbose_name=u'课程号')
    link_name = models.CharField(max_length=100,verbose_name=u'链接名')
    link_path = models.CharField(max_length=500,verbose_name=u'链接地址')

    class Meta:
        verbose_name = u'课程相关链接'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.link_name
