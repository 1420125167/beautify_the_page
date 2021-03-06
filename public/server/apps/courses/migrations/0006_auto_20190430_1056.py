# Generated by Django 2.2 on 2019-04-30 10:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_auto_20190429_0937'),
    ]

    operations = [
        migrations.AddField(
            model_name='courseblock',
            name='block_intro',
            field=models.CharField(default='kkw', max_length=300, verbose_name='模块简介'),
        ),
        migrations.AlterField(
            model_name='chapter',
            name='chapter_date',
            field=models.DateTimeField(default=datetime.datetime(2019, 4, 30, 10, 56, 23, 116994), verbose_name='发布时间'),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='lesson_date',
            field=models.DateTimeField(default=datetime.datetime(2019, 4, 30, 10, 56, 23, 116994), verbose_name='发布时间'),
        ),
    ]
