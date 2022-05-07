# _*_ encoding:utf-8 _*_
from django.db import models

from datetime import datetime
from django.utils import timezone

from users.models import UserProfile
from courses.models import Lesson,Chapter
# Create your models here.

#浏览历史
class UserHistory(models.Model):
    user_id = models.ForeignKey(UserProfile,on_delete=models.CASCADE,verbose_name=u'用户号')
    lesson_id = models.ForeignKey(Lesson,on_delete=models.CASCADE,verbose_name=u'课程号')
    chapter_id = models.ForeignKey(Chapter,on_delete=models.CASCADE,verbose_name=u'章节号')
    history_date = models.DateTimeField(default=timezone.now,verbose_name=u'浏览时间')

    class Meta:
        verbose_name = u'浏览历史'
        verbose_name_plural = verbose_name
        ordering = ('user_id','history_date',)


#用户消息
class UserMessage(models.Model):
    user_id = models.ForeignKey(UserProfile,on_delete=models.CASCADE,verbose_name=u'用户号')
    message_title = models.CharField(max_length=50,verbose_name=u'消息标题')
    message_content = models.CharField(max_length=500,verbose_name=u'消息内容')
    message_hasread = models.BooleanField(default=False,verbose_name="是否已读")
    message_date = models.DateTimeField(default=timezone.now, verbose_name=u'发送时间')

    class Meta:
        verbose_name = u'用户消息'
        verbose_name_plural = verbose_name
        ordering = ('user_id','message_date',)

    def __str__(self):
        return self.message_title


#用户提问
class UserProblem(models.Model):
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, verbose_name=u'用户号')
    problem_title = models.CharField(max_length=50, verbose_name=u'问题标题')
    problem_content = models.CharField(max_length=500, verbose_name=u'问题描述')
    problem_img1 = models.TextField(verbose_name=u'问题图片1', null=True, blank=True)
    problem_img2 = models.TextField(verbose_name=u'问题图片2', null=True, blank=True)
    problem_img3 = models.TextField(verbose_name=u'问题图片3', null=True, blank=True)
    comment_num = models.IntegerField(verbose_name="评论数", default=0)
    problem_date = models.DateTimeField(default=timezone.now, verbose_name=u'发布时间')

    class Meta:
        verbose_name = u'用户提问'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.problem_title


#用户评论
class UserComment(models.Model):
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, verbose_name=u'用户号')
    comment_to = models.ForeignKey(UserProblem,on_delete=models.CASCADE, verbose_name=u'评论问题')
    comment_content = models.CharField(max_length=500,verbose_name=u'评论内容')
    comment_date = models.DateTimeField(default=timezone.now, verbose_name=u'发布时间')
    comment_agree = models.IntegerField(verbose_name=u'点赞数',default=0)

    class Meta:
        verbose_name = u'用户评论'
        verbose_name_plural = verbose_name


#用户笔记
class UserNotebook(models.Model):
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, verbose_name=u'用户号')
    lesson_id = models.ForeignKey(Lesson, on_delete=models.CASCADE, verbose_name=u'课程号')
    notebook_content = models.TextField(verbose_name=u'笔记内容', null=True, blank=True)
    notebook_date = models.DateTimeField(default=timezone.now, verbose_name=u'发布时间')

    class Meta:
        verbose_name = u'用户笔记'
        verbose_name_plural = verbose_name