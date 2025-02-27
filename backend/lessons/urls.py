# lessons/urls.py
from django.urls import path
from .views import LessonProgressView, LessonDetailView, LessonListView, StudentProgressSummaryView

urlpatterns = [
   path('', LessonListView.as_view(), name='lesson-list'),  
   
   path('progress/', LessonProgressView.as_view(), name='lesson-progress'),  
   path('studentProgress/<str:lesson_id>/', StudentProgressSummaryView.as_view(), name='student-progress'), 

   path('progress/<str:user_id>/', LessonProgressView.as_view(), name='lesson-progress-user'),
   path('progress/<str:user_id>/<str:lesson_id>/', LessonProgressView.as_view(), name='lesson-progress-detail'),  

   path('<str:lesson_id>/', LessonDetailView.as_view(), name='lesson-detail'), 
]
