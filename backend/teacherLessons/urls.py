from django.urls import path
from .views import TeacherLessonProgressView

urlpatterns = [
    path('progress/<str:teacher_id>/', TeacherLessonProgressView.as_view(), name='teacher-lesson-progress'),
    path("progress/<str:teacher_id>/<str:lesson_id>/", TeacherLessonProgressView.as_view(), name="teacher-lesson-progress"),
    path('progress/', TeacherLessonProgressView.as_view(), name='teacher-lesson-progress'),
]
