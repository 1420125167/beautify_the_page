# _*_ encoding:utf-8 _*_
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.models import UserProfile,TelVerifyRecord
from users.serializers import LoginSerializer,TelVerifyRecordSerializer,RegisterSerializer
from operations.models import UserMessage



# Create your views here.


# 登录响应函数
@csrf_exempt
@api_view(['POST'])
def LoginView(request):
    if request.method == 'POST':
        user_account = request.data['account']
        user_password = request.data['password']
        userinfo = UserProfile.objects.filter(user_account=user_account,user_password=user_password).first()
        user_serializer = LoginSerializer(userinfo)
        if userinfo:
            user_id = userinfo.id
            has_not_read = UserMessage.objects.filter(user_id=user_id).count()
            login_res = {
                "success":True,
                "data":user_serializer.data,
                "hasnotread":has_not_read,
                "login":True
            }
            return Response(login_res)
        else:
            login_res = {
                "success":True,
                "data":user_serializer.data,
                "login":False
            }
            return Response(login_res)
    else:
        login_res = {
            "success":False,
            "data":{},
            "login":False
        }

#注册响应函数1
@csrf_exempt
@api_view(['GET'])
def RegisterStep1View(request):
    if request.method == 'GET':
        user_account = request.GET['phone']
        user_info = UserProfile.objects.filter(user_account=user_account).first()
        if user_info:
            register_res = {
                "success":True,
                "data":{"register":False}
            }
            return Response(register_res)
        else:
            register_res = {
                "success":True,
                "data":{"register":True}
            }
            return Response(register_res)
    else:
        register_res = {
            "success":False,
            "data":{}
        }
        return Response(register_res)


#注册响应函数2
@csrf_exempt
@api_view(['GET'])
def RegisterStep2View(request):
    if request.method == 'GET':
        user_account = request.GET['phone']
        verify_info = TelVerifyRecord.objects.filter(user_account=user_account).first()
        verify_serializer = TelVerifyRecordSerializer(verify_info)
        register_res = {
            "success":True,
            "data":"6666"
        }
        return Response(register_res)
    else:
        register_res = {
            "success":False,
            "data":{}
        }
        return Response(register_res)


#注册响应函数3
@csrf_exempt
@api_view(['POST'])
def RegisterStep3View(request):
    if request.method == 'POST':
        user_serializer = RegisterSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            register_res = {
                "success":True
            }
            return Response(register_res)
        else:
            register_res = {
                "success":False
            }
            return Response(register_res)


# 修改密码响应函数
@csrf_exempt
@api_view(['GET','POST'])
def ModifyPasswordView(request):
    if request.method == 'POST':
        user_account = request.data['account']
        user_info = UserProfile.objects.filter(user_account=user_account).first()
        if user_info:
            user_info.user_password = request.data['password']
            user_info.save()
            modify_res = {
                "success":True,
                "modify":True
            }
            return Response(modify_res)
        else:
            modify_res = {
                "success":True,
                "modify":False
            }
            return Response(modify_res)
    elif request.method == 'GET':
        modify_res = {
            "success":True,
            "data":"6666"
        }
        return Response(modify_res)
    else:
        modify_res = {
            "success": False,
            "modify": False
        }
        return Response(modify_res)


# 修改头像响应函数
@csrf_exempt
@api_view(['POST'])
def ModifyUserImgView(request):
    if request.method == 'POST':
        user_id = request.data['userid']
        user_info = UserProfile.objects.filter(id=user_id).first()
        user_info.user_img = request.data['img']
        user_info.save()
        modify_res = {
            "success":True
        }
        return Response(modify_res)
    else:
        modify_res = {
            "success":False
        }
        return Response(modify_res)


#积分修改响应函数
@csrf_exempt
@api_view(['POST'])
def ChangeScoreView(request):
    if request.method == 'POST':
        user_id = request.data['userid']
        user_score = request.data['score']
        user_info = UserProfile.objects.filter(id=user_id).first()
        user_info.user_score = user_score
        user_info.save()
        change_res = {
            "success": True
        }
        return Response(change_res)
    else:
        change_res = {
            "success": False
        }
        return Response(change_res)
