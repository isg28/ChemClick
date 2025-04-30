from django.urls import path
from .views import CreateUserView, LoginView, UserManagementView, UserListView, DeleteAllUsersView

urlpatterns = [
    path('create/', CreateUserView.as_view(), name='create-account'),
    path('login/', LoginView.as_view(), name='login'),
    path('', UserListView.as_view(), name='user-list'),  
    path('delete-all/', DeleteAllUsersView.as_view(), name='delete-all-users'),
    path('<str:user_id>/', UserManagementView.as_view(), name='delete-user'),
]
