# _*_ encoding:utf-8 _*_
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from .models import UserProfile,TelVerifyRecord



class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserProfile
        # 指定序列化器的模型字段
        fields = (
            'id',
            'user_nickname',
            'user_img',
            'user_score',
        )


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        # 指定序列化器需要作用的模型
        model = UserProfile
        # 指定序列化器的模型字段
        fields = (
            'user_account',
            'user_password',
            'user_nickname',
            'user_img',
        )


class TelVerifyRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelVerifyRecord
        fields = (
            'code',
        )
