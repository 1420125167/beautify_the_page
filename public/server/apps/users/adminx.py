# _*_ encoding:utf-8 _*_

import xadmin
from xadmin import views

from .models import UserProfile,TelVerifyRecord
from courses.models import Lesson,Chapter,CourseBlock,CourseResource,CourseLink
from operations.models import UserComment,UserHistory,UserMessage,UserNotebook,UserProblem
from others.models import News,Global,AnswerQuestion,ResourceDownload,TermSearch,ApiSearch


#主题修改
class BaseSetting(object):
    enable_themes = True
    use_bootswatch = True

xadmin.site.register(views.BaseAdminView,BaseSetting)


#全局配置
class GlobalSetting(object):
    site_title = 'AI Web'
    site_footer = '山东科技大学'
    menu_style = 'accordion'

xadmin.site.register(views.CommAdminView,GlobalSetting)


class UserProfileAdmin(object):
    list_display = ['user_account','user_password','user_nickname','user_score']
    search_fields = ['user_account','user_password','user_nickname']
    list_filter = ['user_account', 'user_password','user_nickname', 'user_score']

xadmin.site.register(UserProfile,UserProfileAdmin)


class TelVerifyRecordAdmin(object):
    list_display = ['code','user_account','send_type','send_time']
    search_fields = ['code','user_account','send_type']
    list_filter = ['code','user_account','send_type','send_time']

xadmin.site.register(TelVerifyRecord,TelVerifyRecordAdmin)


class LessonAdmin(object):
    list_display = ['lesson_name','lesson_intro','lesson_img','lesson_chapter','chapter_num','lesson_date']
    search_fields = ['lesson_name']
    list_filter = ['lesson_name','lesson_intro','lesson_chapter','lesson_date','chapter_num']

xadmin.site.register(Lesson,LessonAdmin)


class ChapterAdmin(object):
    list_display = ['chapter_num','lesson_id','chapter_name','chapter_intro','chapter_date']
    search_fields = ['chapter_num','lesson_id','chapter_name']
    list_filter = ['chapter_num','lesson_id','chapter_name','chapter_date']

xadmin.site.register(Chapter,ChapterAdmin)


class CourseBlockAdmin(object):
    list_display = ['block_num','lesson_id','chapter_id','block_intro','block_word','block_video','block_img','block_code','block_experiment']
    search_fields = ['block_num','lesson_id','chapter_id','chapter_id']
    list_filter = ['block_num', 'lesson_id__lesson_name', 'chapter_id__chapter_num', 'chapter_id__chapter_name']

xadmin.site.register(CourseBlock,CourseBlockAdmin)


class CourseResourceAdmin(object):
    list_display = ['lesson_id','data_name','data_path','data_is_free']
    search_fields = ['lesson_id','data_name']
    list_filter = ['lesson_id__lesson_name','data_name','data_is_free']

xadmin.site.register(CourseResource,CourseResourceAdmin)


class CourseLinkAdmin(object):
    list_display = ['lesson_id','link_name','link_path']
    search_fields = ['lesson_id','link_name']
    list_filter = ['lesson_id__lesson_name','link_name']

xadmin.site.register(CourseLink,CourseLinkAdmin)


class UserHistoryAdmin(object):
    list_display = ['user_id','lesson_id','chapter_id','history_date']
    search_fields = ['user_id','lesson_id','chapter_id']
    list_filter = ['user_id','lesson_id__lesson_name','chapter_id__chapter_num','chapter_id__chapter_name','history_date']

xadmin.site.register(UserHistory,UserHistoryAdmin)


class UserMessageAdmin(object):
    list_display = ['user_id','message_title','message_content','message_hasread','message_date']
    search_fields = ['user_id','message_title']
    list_filter = ['user_id','message_title','message_content','message_hasread','message_date']

xadmin.site.register(UserMessage,UserMessageAdmin)


class UserCommentAdmin(object):
    list_display = ['user_id','comment_to','comment_content','comment_date','comment_agree']
    search_fields = ['user_id']
    list_filter = ['user_id','comment_to','comment_content','comment_date','comment_agree']

xadmin.site.register(UserComment,UserCommentAdmin)


class UserProblemAdmin(object):
    list_display = ['user_id','problem_title','problem_content','problem_img1','problem_img2','problem_img3','comment_num','problem_date']
    search_fields = ['user_id','problem_title']
    list_filter = ['user_id','problem_title','comment_num']

xadmin.site.register(UserProblem,UserProblemAdmin)


class UserNotebookAdmin(object):
    list_display = ['user_id','lesson_id','notebook_content','notebook_date']
    search_fields = ['user_id','lesson_id']
    list_filter = ['user_id','lesson_id__lesson_name','notebook_content','notebook_date']

xadmin.site.register(UserNotebook,UserNotebookAdmin)


class NewsAdmin(object):
    list_display = ['news_title','news_content','news_img','news_date','news_link','news_extra']
    search_fields = ['news_title','news_content']
    list_filter = ['news_title','news_content','news_date']

xadmin.site.register(News,NewsAdmin)


class GlobalAdmin(object):
    list_display = ['global_account','global_password','global_download_cost','global_extra']
    search_fields = ['global_account','global_password']
    list_filter = ['global_account','global_password','global_download_cost']

xadmin.site.register(Global,GlobalAdmin)


class AnswerQuestionAdmin(object):
    list_display = ['answer_title','answer_img','answer_content','answer_date']
    search_fields = ['answer_title','answer_content']
    list_filter = ['answer_title','answer_content','answer_date']

xadmin.site.register(AnswerQuestion,AnswerQuestionAdmin)


class ResourceDownloadAdmin(object):
    list_display = ['resource_name','resource_type','resource_link']
    search_fields = ['resource_name','resource_type']
    list_filter = ['resource_name','resource_type']

xadmin.site.register(ResourceDownload,ResourceDownloadAdmin)


class TermSearchAdmin(object):
    list_display = ['term_name','term_intro','term_img']
    search_fields = ['term_name']
    list_filter = ['term_name','term_intro']

xadmin.site.register(TermSearch,TermSearchAdmin)


class ApiSearchAdmin(object):
    list_display = ['api_name','api_intro','api_code']
    search_fields = ['api_name']
    list_filter = ['api_name','api_intro']

xadmin.site.register(ApiSearch,ApiSearchAdmin)

