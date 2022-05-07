# _*_ encoding:utf-8 _*_
from django.apps import AppConfig


class OperationsConfig(AppConfig):
    name = 'apps.operations'


class OperationConfig(AppConfig):
    name = 'operations'
    verbose_name = u'用户操作管理'