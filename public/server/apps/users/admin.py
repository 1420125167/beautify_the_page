from django.contrib import admin

# Register your models here.
from .models import UserProfile,TelVerifyRecord
from courses.models import Lesson,Chapter,CourseBlock,CourseResource
from operations.models import UserComment,UserHistory,UserMessage,UserNotebook
from others.models import News,Global,TermSearch,ApiSearch


class UserProfileAdmin(admin.ModelAdmin):
    pass


admin.site.register(UserProfile,UserProfileAdmin)
admin.site.register(TelVerifyRecord,UserProfileAdmin)
admin.site.register(Lesson,UserProfileAdmin)
admin.site.register(Chapter,UserProfileAdmin)
admin.site.register(CourseBlock,UserProfileAdmin)
admin.site.register(CourseResource,UserProfileAdmin)
admin.site.register(UserComment,UserProfileAdmin)
admin.site.register(UserHistory,UserProfileAdmin)
admin.site.register(UserMessage,UserProfileAdmin)
admin.site.register(UserNotebook,UserProfileAdmin)
admin.site.register(News,UserProfileAdmin)
admin.site.register(Global,UserProfileAdmin)
admin.site.register(TermSearch,UserProfileAdmin)
admin.site.register(ApiSearch,UserProfileAdmin)