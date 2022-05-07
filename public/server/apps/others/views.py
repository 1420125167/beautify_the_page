# _*_ encoding:utf-8 _*_
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

from others.models import News, AnswerQuestion,ResourceDownload
from others.serializers import NewsDetailSerializer, AnswerQuestionDetailSerializer, AnswerQuestionListSerializer,HeaderSerializer,DownloadSerializer
from courses.models import Lesson
from operations.models import UserMessage


# Create your views here.


#新闻响应函数
@csrf_exempt
@api_view(['GET'])
def NewsDetailView(request):
    if request.method == 'GET':
        news_id = request.GET['id']
        newsinfo = News.objects.filter(id=news_id).first()
        news_serializer = NewsDetailSerializer(newsinfo)
        news_res = {
            "success":True,
            "data":news_serializer.data
        }
        return Response(news_res)
    else:
        news_res = {
            "success": False,
            "data": {}
        }
        return Response(news_res)


#官方答疑详情响应函数
@csrf_exempt
@api_view(['GET'])
def AnswerQuestionDetailView(request):
    if request.method == 'GET':
        answer_id = request.GET['id']
        answer_info = AnswerQuestion.objects.filter(id=answer_id).first()
        answer_serializer = AnswerQuestionDetailSerializer(answer_info)
        answer_res = {
            "success":True,
            "data":answer_serializer.data
        }
        return Response(answer_res)
    else:
        answer_res = {
            "success":False,
            "data":{}
        }
        return Response(answer_res)


#官方答疑列表响应函数
@csrf_exempt
@api_view(['GET'])
def AnswerQuestionListView(request):
    if request.method == 'GET':
        answer_info = AnswerQuestion.objects.all()
        answer_serializer = AnswerQuestionListSerializer(answer_info,many=True)
        answer_res = {
            "success":True,
            "data":answer_serializer.data
        }
        return Response(answer_res)
    else:
        answer_res = {
            "success":False,
            "data":{}
        }
        return Response(answer_res)


#导航栏响应函数
@csrf_exempt
@api_view(['GET'])
def HeaderView(request):
    if request.method == 'GET':
        lesson_info = Lesson.objects.all()
        lesson_serializer = HeaderSerializer(lesson_info,many=True)
        user_id = request.GET['userid']
        head_res = {
            "success":True,
            "data":{
                "messageNum":UserMessage.objects.filter(user_id=user_id,message_hasread=0).count(),
                "class":lesson_serializer.data
            }
        }
        return Response(head_res)
    else:
        head_res = {
            "success":False,
            "data":{}
        }
        return Response(head_res)


#资源下载列表响应函数
@csrf_exempt
@api_view(['GET'])
def DownloadlistView(request):
    if request.method == 'GET':
        download_info_1 = ResourceDownload.objects.filter(resource_type=1)
        download_info_2 = ResourceDownload.objects.filter(resource_type=2)
        download_info_3 = ResourceDownload.objects.filter(resource_type=3)
        download_serializer_1 = DownloadSerializer(download_info_1, many=True)
        download_serializer_2 = DownloadSerializer(download_info_2, many=True)
        download_serializer_3 = DownloadSerializer(download_info_3, many=True)
        download_res = {
            "success":True,
            "data":{
                "resource1":download_serializer_1.data,
                "resource2": download_serializer_2.data,
                "resource3": download_serializer_3.data
            }
        }
        return Response(download_res)
    else:
        download_res = {
            "success":False,
            "data":{}
        }
        return Response(download_res)