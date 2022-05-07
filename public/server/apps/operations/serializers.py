# _*_ encoding:utf-8 _*_
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from .models import UserHistory,UserMessage,UserComment,UserProblem,UserNotebook
from courses.models import Lesson

class UserHistorySerializer(serializers.ModelSerializer):
    lesson_name = serializers.CharField(source='lesson_id.lesson_name')
    chapter_name = serializers.CharField(source='chapter_id.chapter_name')
    lesson_img = serializers.CharField(source='lesson_id.lesson_img')
    chapter_sum = serializers.IntegerField(source='lesson_id.chapter_num')
    chapter_num = serializers.IntegerField(source='chapter_id.chapter_num')
    history_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserHistory
        # 指定序列化器的模型字段
        fields = (
            'lesson_id',
            'chapter_id',
            'lesson_name',
            'chapter_name',
            'lesson_img',
            'chapter_sum',
            'chapter_num',
            'history_date',
        )

class SubmitHistorySerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserHistory
        # 指定序列化器的模型字段
        fields = (
            'user_id',
            'lesson_id',
            'chapter_id',

        )


class UserMessageSerializer(serializers.ModelSerializer):
    message_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserMessage
        # 指定序列化器的模型字段
        fields = (
            'id',
            'message_title',
            'message_content',
            'message_date',
        )


class SendMessageSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserMessage
        # 指定序列化器的模型字段
        fields = (
            'user_id',
            'message_title',
            'message_content'
        )


class UserCommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user_id.user_nickname')
    user_img = serializers.CharField(source='user_id.user_img')
    comment_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserComment
        # 指定序列化器的模型字段
        fields = (
            'id',
            'user_name',
            'user_img',
            'comment_content',
            'comment_agree',
            'comment_date',
        )


class SubmitCommentSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserComment
        # 指定序列化器的模型字段
        fields = (
            'user_id',
            'comment_to',
            'comment_content',
        )


class UserProblemSerializer(serializers.ModelSerializer):
    problem_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserProblem
        # 指定序列化器的模型字段
        fields = (
            'id',
            'problem_title',
            'problem_content',
            'problem_img1',
            'problem_img2',
            'problem_img3',
            'comment_num',
            'problem_date',
        )


class MyProblemSerializer(serializers.ModelSerializer):
    problem_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    comment_num = serializers.IntegerField(default=UserComment.objects.filter(comment_to=1).count())
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserProblem
        # 指定序列化器的模型字段
        fields = (
            'id',
            'problem_title',
            'problem_content',
            'comment_num',
            'problem_date',
        )


class UserNotebookSerializer(serializers.ModelSerializer):
    lesson_name = serializers.CharField(source='lesson_id.lesson_name')
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserNotebook
        # 指定序列化器的模型字段
        fields = (
            'lesson_id',
            'lesson_name',
            'notebook_content',
        )


class SubmitNotebookSerializer(serializers.ModelSerializer):
    #lesson_name = serializers.CharField(source='lesson_id.lesson_name')
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserNotebook
        # 指定序列化器的模型字段
        fields = (
            'user_id',
            'lesson_id',
            'notebook_content',
        )


class PublishSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserProblem
        # 指定序列化器的模型字段
        fields = (
            'user_id',
            'problem_title',
            'problem_content',
            'problem_img1',
            'problem_img2',
            'problem_img3',
        )


class PublisherSerializer(serializers.ModelSerializer):
    user_nickname = serializers.CharField(source='user_id.user_nickname')
    user_img = serializers.CharField(source='user_id.user_img')
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserProblem
        # 指定序列化器的模型字段
        fields = (
            'user_nickname',
            'user_img',
        )


class SearchInfoSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserProblem
        # 指定序列化器的模型字段
        fields = (
            'id',
            'problem_title',
        )