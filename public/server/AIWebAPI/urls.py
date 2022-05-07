"""AIWebAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import xadmin

from users.views import LoginView,RegisterStep1View,RegisterStep2View,RegisterStep3View,ModifyPasswordView,ModifyUserImgView,ChangeScoreView
from others.views import NewsDetailView,AnswerQuestionDetailView,AnswerQuestionListView,HeaderView,DownloadlistView
from operations.views import UserHistoryView,UserMessageView,ProblemListView,ProblemDetailView,\
    PublishView,MyProblemView,SearchInfoView,SearchSubmitView,UserNotebookView,MessageDeleteView,SubmitCommentView,\
    DeleteProblemView,DeleteCommentView,PraiseCommentView,SendMessageView
from courses.views import HomeView,LessonDetailView,LeftMenuView

urlpatterns = [
    path('xadmin/', xadmin.site.urls),
    path('login/',LoginView),
    path('news/',NewsDetailView),
    path('my/',UserHistoryView),
    path('home/',HomeView),
    path('msg/',UserMessageView),
    path('msgdelete/',MessageDeleteView),
    path('problem/',ProblemListView),
    path('problemdetail/',ProblemDetailView),
    path('question/',AnswerQuestionDetailView),
    path('class/',LessonDetailView),
    path('leftmenu/',LeftMenuView),
    path('register1/',RegisterStep1View),
    path('register2/', RegisterStep2View),
    path('register3/', RegisterStep3View),
    path('publish/', PublishView),
    path('myproblem/', MyProblemView),
    path('searchinfo/', SearchInfoView),
    path('searchsubmit/', SearchSubmitView),
    path('notebook/', UserNotebookView),
    path('questionlist/', AnswerQuestionListView),
    path('submitcomment/', SubmitCommentView),
    path('modifypassword/', ModifyPasswordView),
    path('deleteproblem/', DeleteProblemView),
    path('deletecomment/', DeleteCommentView),
    path('praisecomment/', PraiseCommentView),
    path('sendmessage/', SendMessageView),
    path('modifyuserimg/', ModifyUserImgView),
    path('header/', HeaderView),
    path('changescore/', ChangeScoreView),
    path('resource/', DownloadlistView),
]
