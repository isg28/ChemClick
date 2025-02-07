# lessons/urls.py
from django.urls import path
from .views import LessonProgressView, LessonDetailView, LessonListView

urlpatterns = [
   path('', LessonListView.as_view(), name='lesson-list'),  
   path('<int:pk>/', LessonDetailView.as_view(), name='lesson-detail'), 
   path('<str:lesson_id>/', LessonDetailView.as_view(), name='lesson-detail'),  
   path('progress/<str:user_id>/', LessonProgressView.as_view(), name='lesson-progress-all'),
   path('progress/<str:user_id>/<str:lesson_id>/', LessonProgressView.as_view(), name='lesson-progress'), 
   path('progress', LessonProgressView.as_view(), name='lesson-progress'),  

]
