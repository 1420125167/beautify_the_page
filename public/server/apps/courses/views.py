# _*_ encoding:utf-8 _*_
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from courses.models import Lesson,Chapter,CourseBlock,CourseResource,CourseLink
from courses.serializers import LessonSerializer,ChapterSerializer,CourseBlockSerializer,LeftMenuSerializer,CourseLinkSerializer,CourseResourceSerializer
from operations.models import UserProblem,UserHistory
from operations.serializers import UserProblemSerializer,UserHistorySerializer,SubmitHistorySerializer
from others.models import News
from others.serializers import NewsSerializer


# Create your views here.


# 主页响应函数
@csrf_exempt
@api_view(['GET'])
def HomeView(request):
    if request.method == 'GET':
        lesson_info = Lesson.objects.all()
        lesson_serializer = LessonSerializer(lesson_info,many=True)
        news_info = News.objects.all()
        news_serializer = NewsSerializer(news_info,many=True)
        problem_info = UserProblem.objects.all()
        problem_serializer = UserProblemSerializer(problem_info,many=True)
        home_res = {
            "success":True,
            "data":{
                "news":news_serializer.data,
                "problem":problem_serializer.data,
                "class":lesson_serializer.data
            }
        }
        return Response(home_res)
    else:
        home_res = {
            "success":False,
            "data":{}
        }
        return Response(home_res)


#课程详情响应函数
@csrf_exempt
@api_view(['GET','POST'])
def LessonDetailView(request):
    if request.method == 'GET':
        lesson_id = request.GET['classid']
        chapter_id = request.GET['chapterid']
        chapter_info = Chapter.objects.filter(lesson_id=lesson_id,id=chapter_id).first()
        block_info = CourseBlock.objects.filter(lesson_id=lesson_id,chapter_id=chapter_id)
        link_info = CourseLink.objects.filter(lesson_id=lesson_id)
        source_info = CourseResource.objects.filter(lesson_id=lesson_id)
        chapter_serializer = ChapterSerializer(chapter_info)
        block_serializer = CourseBlockSerializer(block_info,many=True)
        link_serializer = CourseLinkSerializer(link_info,many=True)
        source_serilizer = CourseResourceSerializer(source_info,many=True)
        lessondetail_res = {
            "success":True,
            "data":{
                "chapter":chapter_serializer.data,
                "block":block_serializer.data,
                "link":link_serializer.data,
                "extraData":source_serilizer.data
            }
        }
        return Response(lessondetail_res)
    elif request.method == 'POST':
        user_id = request.data['user_id']
        lesson_id = request.data['lesson_id']
        historyinfo = UserHistory.objects.filter(user_id=user_id, lesson_id=lesson_id).first()
        if historyinfo:
            historyinfo.delete()
            history_serializer = SubmitHistorySerializer(data=request.data)
            if history_serializer.is_valid():
                history_serializer.save()
                history_res = {
                    "success": True
                }
                return Response(history_res)
            else:
                history_res = {
                    "success": False
                }
                return Response(history_res)
        else:
            history_serializer = SubmitHistorySerializer(data=request.data)
            if history_serializer.is_valid():
                history_serializer.save()
                history_res = {
                    "success": True
                }
                return Response(history_res)
            else:
                history_res = {
                    "success": False
                }
                return Response(history_res)
        return Response(history_res)
    else:
        lessondetail_res = {
            "success":False,
            "data":{}
        }
        return Response(lessondetail_res)


#左侧菜单响应函数1
@csrf_exempt
@api_view(['GET'])
def LeftMenuView(request):
    if request.method == 'GET':
        lesson_info = Lesson.objects.all()
        lesson_serializer = LessonSerializer(lesson_info,many=True)
        chapter_info = Chapter.objects.all()
        chapter_serializer = LeftMenuSerializer(chapter_info,many=True)
        left_res = {
            "success":True,
            "data":{
                "classlist":lesson_serializer.data,
                "chapterlist":chapter_serializer.data
            }
        }
        return Response(left_res)
    else:
        left_res = {
            "success":False,
            "data":{}
        }
        return Response(left_res)


