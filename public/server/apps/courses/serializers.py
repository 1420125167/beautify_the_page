# _*_ encoding:utf-8 _*_
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from .models import Lesson,Chapter,CourseBlock,CourseResource,CourseLink


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = Lesson
        # 指定序列化器的模型字段
        fields = (
            'id',
            'lesson_img',
            'lesson_name',
            'lesson_intro',
            'lesson_chapter',
        )


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = Chapter
        # 指定序列化器的模型字段
        fields = (
            'id',
            'chapter_num',
            'chapter_name',
            'chapter_intro',
        )


class CourseBlockSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = CourseBlock
        # 指定序列化器的模型字段
        fields = (
            'id',
            'block_num',
            'lesson_id',
            'chapter_id',
            'block_intro',
            'block_word',
            'block_video',
            'block_img',
            'block_code',
            'block_experiment',
        )


class CourseResourceSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = CourseResource
        # 指定序列化器的模型字段
        fields = (
            'id',
            'data_name',
            'data_path',
            'data_is_free',
        )


class CourseLinkSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = CourseLink
        # 指定序列化器的模型字段
        fields = (
            'id',
            'link_name',
            'link_path',
        )


class LeftMenuSerializer(serializers.ModelSerializer):
    class Meta:
        lesson_name = serializers.CharField(source='lesson_id.lesson_name')
        # 指定序列化器需要作用的模型
        model = Chapter
        # 指定序列化器的模型字段
        fields = (
            'lesson_id',
            'id',
            'chapter_name',
            'chapter_num',
        )
