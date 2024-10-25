from django.urls import path
from .views import CreateUserView, LoginView

urlpatterns = [
    path('create/', CreateUserView.as_view(), name='create-account'),
    path('login/', LoginView.as_view(), name='login'),
]
