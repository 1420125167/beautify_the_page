# _*_ encoding:utf-8 _*_
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from .models import News,Global,AnswerQuestion,ResourceDownload,TermSearch,ApiSearch
from courses.models import Lesson



class NewsDetailSerializer(serializers.ModelSerializer):
    news_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        # 指定序列化器需要作用的模型
        model = News
        # 指定序列化器的模型字段
        fields = (
            'news_title',
            'news_img',
            'news_content',
            'news_date',
        )


class NewsSerializer(serializers.ModelSerializer):
    news_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        # 指定序列化器需要作用的模型
        model = News
        # 指定序列化器的模型字段
        fields = (
            'id',
            'news_title',
            'news_content',
            'news_date',
            'news_link',
        )


class AnswerQuestionDetailSerializer(serializers.ModelSerializer):
    answer_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        # 指定序列化器需要作用的模型
        model = AnswerQuestion
        # 指定序列化器的模型字段
        fields = (
            'id',
            'answer_title',
            'answer_img',
            'answer_content',
            'answer_date',
        )


class AnswerQuestionListSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = AnswerQuestion
        # 指定序列化器的模型字段
        fields = (
            'id',
            'answer_title',
            'answer_img',
            'answer_content',
        )


class GlobalSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = Global
        # 指定序列化器的模型字段
        fields = (
            'id',
            'global_account',
            'global_password',
            'global_download_cost',
            'global_extra',
        )


class TermSearchSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = TermSearch
        # 指定序列化器的模型字段
        fields = (
            'id',
            'term_name',
            'term_intro',
            'term_img',
        )


class ApiSearchSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = ApiSearch
        # 指定序列化器的模型字段
        fields = (
            'id',
            'api_name',
            'api_intro',
            'api_code',
        )


class HeaderSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = Lesson
        # 指定序列化器的模型字段
        fields = (
            'id',
            'lesson_name',
        )


class DownloadSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = ResourceDownload
        # 指定序列化器的模型字段
        fields = (
            'id',
            'resource_name',
            'resource_type',
            'resource_link'
        )