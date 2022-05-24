# _*_ encoding:utf-8 _*_
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from operations.models import UserHistory,UserMessage,UserProblem,UserComment,UserNotebook
from operations.serializers import UserHistorySerializer,UserMessageSerializer,UserProblemSerializer,UserCommentSerializer,\
    PublishSerializer,MyProblemSerializer,PublisherSerializer,SearchInfoSerializer,UserNotebookSerializer,SubmitCommentSerializer,SendMessageSerializer,\
    SubmitNotebookSerializer
from users.models import UserProfile
from courses.models import Chapter
from courses.serializers import ChapterSerializer
from others.models import News,AnswerQuestion
from others.serializers import NewsDetailSerializer,AnswerQuestionDetailSerializer



# Create your views here.


#浏览历史响应函数（进度百分比）
@csrf_exempt
@api_view(['GET'])
def UserHistoryView(request):
    if request.method == 'GET':
        user_id = request.GET['userid']
        historyinfo = UserHistory.objects.filter(user_id=user_id)
        history_serializer = UserHistorySerializer(historyinfo,many=True)
        history_res = {
            "success":True,
            "data":history_serializer.data
        }
        return Response(history_res)
    else:
        history_res = {
            "success":False,
        }
        return Response(history_res)


#消息列表响应函数
@csrf_exempt
@api_view(['GET'])
def UserMessageView(request):
    if request.method == 'GET':
        user_id = request.GET['userid']
        UserMessage.objects.filter(user_id=user_id).update(message_hasread=True)
        message_info = UserMessage.objects.filter(user_id=user_id)
        message_serializer = UserMessageSerializer(message_info,many=True)
        message_res = {
            "success": True,
            "data": message_serializer.data
        }
        return Response(message_res)
    else:
        message_res = {
            "success":False,
            "data":{}
        }
        return Response(message_res)


#消息删除响应函数
@csrf_exempt
@api_view(['GET'])
def MessageDeleteView(request):
    if request.method == 'GET':
        message_id = request.GET['msgid']
        user_id = request.GET['userid']
        message_info = UserMessage.objects.filter(id=message_id).first()
        message_info.delete()
        message_remain = UserMessage.objects.filter(user_id=user_id)
        message_serializer = UserMessageSerializer(message_remain, many=True)
        message_res = {
            "success": True,
            "data": message_serializer.data
        }
        return Response(message_res)
    else:
        message_res = {
            "success": False,
            "data":{}
        }
        return Response(message_res)


#问题列表响应函数
@csrf_exempt
@api_view(['GET'])
def ProblemListView(request):
    if request.method == 'GET':
        problem_info = UserProblem.objects.all()
        problem_serializer = UserProblemSerializer(problem_info,many=True)
        problem_res = {
            "success":True,
            "data":problem_serializer.data
        }
        return Response(problem_res)
    else:
        problem_res = {
            "success":False,
            "data":{}
        }
        return Response(problem_res)


#问题详情响应函数
@csrf_exempt
@api_view(['GET'])
def ProblemDetailView(request):
    if request.method == 'GET':
        problem_id = request.GET['id']
        problem_info = UserProblem.objects.filter(id=problem_id).first()
        comment_info = UserComment.objects.filter(comment_to=problem_id)
        problem_serializer = UserProblemSerializer(problem_info)
        comment_serializer = UserCommentSerializer(comment_info,many=True)
        publisher_serializer = PublisherSerializer(problem_info)
        problemdetail_res = {
            "success":True,
            "data":{
                "publisher":publisher_serializer.data,
                "comment":comment_serializer.data,
                "problem":problem_serializer.data
            }
        }
        return Response(problemdetail_res)
    else:
        problemdetail_res = {
            "success":False,
            "data":{}
        }
        return Response(problemdetail_res)


#删除问题响应函数
@csrf_exempt
@api_view(['GET'])
def DeleteProblemView(request):
    if request.method == 'GET':
        problem_id = request.GET['problemid']
        problem_info = UserProblem.objects.filter(id=problem_id).first()
        problem_info.delete()
        delete_res = {
            "success":True
        }
        return Response(delete_res)
    else:
        delete_res = {
            "success":False
        }
        return Response(delete_res)


#删除评论响应函数
@csrf_exempt
@api_view(['GET'])
def DeleteCommentView(request):
    if request.method == 'GET':
        problem_id = request.GET['problemid']
        comment_id = request.GET['commentid']
        comment_info = UserComment.objects.filter(id=comment_id).first()
        comment_info.delete()
        problem_info = UserProblem.objects.filter(id=problem_id).first()
        problem_info.comment_num -= 1
        problem_info.save()
        delete_res = {
            "success":True
        }
        return Response(delete_res)
    else:
        delete_res = {
            "success":False
        }
        return Response(delete_res)


#点赞评论响应函数
@csrf_exempt
@api_view(['GET'])
def PraiseCommentView(request):
    if request.method == 'GET':
        comment_id = request.GET['commentid']
        comment_info = UserComment.objects.filter(id=comment_id).first()
        comment_info.comment_agree += 1
        comment_info.save()
        praise_res = {
            "success": True,
        }
        return Response(praise_res)
    else:
        praise_res = {
            "success": False,
        }
        return Response(praise_res)


#发送消息响应函数
@csrf_exempt
@api_view(['POST'])
def SendMessageView(request):
    if request.method == 'POST':
        message_serializer = SendMessageSerializer(data=request.data)
        if message_serializer.is_valid():
            message_serializer.save()
            sendMsg_res = {
                "success": True,
                "data": {
                    "sendMsg": True
                }
            }
            return Response(sendMsg_res)
        else:
            sendMsg_res = {
                "success": True,
                "data": {
                    "sendMsg": False
                }
            }
            return Response(sendMsg_res)
    else:
        sendMsg_res = {
            "success": False,
            "data": {}
        }
        return Response(sendMsg_res)


#问题发布响应函数
@csrf_exempt
@api_view(['POST'])
def PublishView(request):
    if request.method == 'POST':
        problem_serializer = PublishSerializer(data=request.data)
        if problem_serializer.is_valid():
            problem_serializer.save()
            publish_res = {
                "success":True,
                "publish":True
            }
            return Response(publish_res)
        else:
            publish_res = {
                "success":True,
                "publish":False
            }
            return Response(publish_res)
    else:
        publish_res = {
            "success":False,
            "publish":False
        }
        return Response(publish_res)


#我的问题响应函数
@csrf_exempt
@api_view(['GET'])
def MyProblemView(request):
    if request.method == 'GET':
        user_id = request.GET['userid']
        myproblem_info = UserProblem.objects.filter(user_id=user_id)
        myproblem_serializer = MyProblemSerializer(myproblem_info,many=True)
        myproblem_res = {
            "success":True,
            "data":myproblem_serializer.data
        }
        return Response(myproblem_res)
    else:
        myproblem_res = {
            "success":False,
            "data":{}
        }
        return Response(myproblem_res)


#搜索下拉栏响应函数
@csrf_exempt
@api_view(['GET'])
def SearchInfoView(request):
    if request.method == 'GET':
        keyword = request.GET['searchinfo']
        chapter_num = Chapter.objects.filter(chapter_name__contains=keyword).count()
        problem_num = UserProblem.objects.filter(problem_title__contains=keyword).count()
        news_num = News.objects.filter(news_title__contains=keyword).count()
        question_num = AnswerQuestion.objects.filter(answer_title__contains=keyword).count()
        searchinfo_res = {
            "success":True,
            "data":[
                {
                    "msgNum":chapter_num,
                    "type":"课程",
                    "type_e":"class",
                    "keyword":keyword
                },
                {
                    "msgNum": problem_num,
                    "type": "问题",
                    "type_e": "problem",
                    "keyword": keyword
                },
                {
                    "msgNum": news_num,
                    "type": "新闻",
                    "type_e": "news",
                    "keyword": keyword
                },
                {
                    "msgNum": question_num,
                    "type": "官方答疑",
                    "type_e": "question",
                    "keyword": keyword
                }
            ]
        }
        return Response(searchinfo_res)
    else:
        searchinfo_res = {
            "success":False,
            "data":{}
        }
        return Response(searchinfo_res)



#搜索结果响应函数
@csrf_exempt
@api_view(['POST'])
def SearchSubmitView(request):
    if request.method == 'POST':
        keyword = request.data['keyword']
        type = request.data['type']
#         keyword = request.POST.getlist('keyword')
#         type = request.POST.getlist('type')
        if type == "class":
            chapter_info = Chapter.objects.filter(chapter_name__contains=keyword)
            chapter_serializer = ChapterSerializer(chapter_info, many=True)
            searchinfo_res = {
                "success": True,
                "data": chapter_serializer.data
            }
            return Response(searchinfo_res)
        elif type == "problem":
            problem_info = UserProblem.objects.filter(problem_title__contains=keyword)
            problem_serializer = UserProblemSerializer(problem_info, many=True)
            searchinfo_res = {
                "success": True,
                "data": problem_serializer.data
            }
            return Response(searchinfo_res)
        elif type == "news":
            news_info = News.objects.filter(news_title__contains=keyword)
            news_serializer = NewsDetailSerializer(news_info, many=True)
            searchinfo_res = {
                "success": True,
                "data": news_serializer.data
            }
            return Response(searchinfo_res)
        elif type == "question":
            ques_info = AnswerQuestion.objects.filter(answer_title__contains=keyword)
            ques_serializer = AnswerQuestionDetailSerializer(ques_info, many=True)
            searchinfo_res = {
                "success": True,
                "data": ques_serializer.data
            }
            return Response(searchinfo_res)
    else:
        searchinfo_res = {
            "success":False,
            "data":{}
        }
        return Response(searchinfo_res)


#笔记显示及提交响应函数
@csrf_exempt
@api_view(['GET','POST'])
def UserNotebookView(request):
    if request.method == 'GET':
        user_id = request.GET.get('userid')
        lesson_id = request.GET.get('classid')
        note_info = UserNotebook.objects.filter(user_id=user_id,lesson_id=lesson_id).first()
        note_serializer = UserNotebookSerializer(note_info)
        note_res = {
            "success":True,
            "data":note_serializer.data
        }
        return Response(note_res)
    elif request.method == 'POST':
#         user_id = request.data.get('userid')
#         lesson_id = request.data.get('lesson_id')
        user_id = request.POST.get('userid')
        lesson_id = request.POST.get('lesson_id')
        notebook_content = request.POST.get('notebook_content')
        note_serializer = SubmitNotebookSerializer(data=request.data)
        if note_serializer.is_valid():
            note_info = UserNotebook.objects.filter(user_id=user_id, lesson_id=lesson_id).first()
#             note_info.delete()
            note_serializer.save()
            note_res = {
                "success":True,
                "data":{
                    "note":True,
                    "test":note_serializer.data
                }
            }
            return Response(note_res)
        else:
            note_res = {
                "success":True,
                "data":{
                    "note":False
                }
            }
            return Response(note_res)
    else:
        note_res = {
            "success":False,
            "data":{}
        }
        return Response(note_res)


#评论提交响应函数
@csrf_exempt
@api_view(['POST'])
def SubmitCommentView(request):
    if request.method == 'POST':
        comment_to = request.data['comment_to']
        comment_serializer = SubmitCommentSerializer(data=request.data)
        if comment_serializer.is_valid():
            problem_info = UserProblem.objects.filter(id=comment_to).first()
            problem_info.comment_num += 1
            problem_info.save()
            comment_serializer.save()
            sub_res = {
                "success":True,
                "data":comment_serializer.data
            }
            return Response(sub_res)
        else:
            sub_res = {
                "success":True,
                "data":{}
            }
            return Response(sub_res)
    else:
        sub_res = {
            "success": False,
            "data": {}
        }
        return Response(sub_res)

