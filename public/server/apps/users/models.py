# _*_ encoding:utf-8 _*_

from django.db import models

from datetime import datetime
from django.utils import timezone

# Create your models here.


#用户个人信息
class UserProfile(models.Model):
    user_account = models.CharField(max_length=11,verbose_name=u'账号',unique=True)
    user_password = models.CharField(max_length=32,verbose_name=u'密码')
    user_nickname = models.CharField(max_length=20,verbose_name=u'昵称',unique=True)
    user_score = models.IntegerField(verbose_name=u'积分',default=0)
    user_img = models.TextField(verbose_name=u'头像', null=True, blank=True)

    #Django内嵌类 用于给model定义元数据
    class Meta:
        verbose_name = u'用户信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.user_account


#手机验证码（注册or找回密码）
class TelVerifyRecord(models.Model):
    code = models.CharField(max_length=6,verbose_name=u'验证码')
    user_account = models.CharField(max_length=11,verbose_name=u'账号')
    send_type = models.CharField(max_length=10,choices=(('register',u'注册'),('forget',u'忘记密码')))
    send_time = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = u'手机验证码'
        verbose_name_plural = verbose_name
