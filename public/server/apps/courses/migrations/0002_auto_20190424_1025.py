# Generated by Django 2.2 on 2019-04-24 02:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapter',
            name='chapter_date',
            field=models.DateTimeField(default=datetime.datetime(2019, 4, 24, 10, 25, 44, 679512), verbose_name='发布时间'),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='lesson_date',
            field=models.DateTimeField(default=datetime.datetime(2019, 4, 24, 10, 25, 44, 679512), verbose_name='发布时间'),
        ),
    ]
