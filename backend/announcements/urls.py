from django.urls import path
from .views import AnnouncementView

urlpatterns = [
    path('', AnnouncementView.as_view(), name='announcement-view'),
    path('<str:id>/', AnnouncementView.as_view(), name='announcement-detail'),
]
