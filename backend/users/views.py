from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from lessons.models import LessonProgress
from .serializers import UserSerializer
from django.contrib.auth.hashers import check_password
from .models import User
# Create your views here.

class CreateUserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Account created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        student_id = request.data.get('student_id')
        password = request.data.get('password')
        
        try:
            user = User.objects.get(student_id=student_id)
            if check_password(password, user.password):
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class UserManagementView(APIView):
    def delete(self, request, user_id=None):
        """
        Deletes a user ONLY AFTER clearing their lesson progress.
        If user_id is provided, delete only that user. Otherwise, delete all users.
        """
        try:
            if user_id:
                user = User.objects.get(student_id=user_id)
                user.delete()
                return Response({
                    "message": f"User {user_id} and their progress have been deleted."
                }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DeleteAllUsersView(APIView):
    def delete(self, request):
        try:
            LessonProgress.objects.all().delete()
            deleted_count = User.objects.all().delete()

            if isinstance(deleted_count, tuple) and deleted_count[0] == 0:
                return Response({"message": "No users found."}, status=status.HTTP_404_NOT_FOUND)

            if isinstance(deleted_count, int) and deleted_count == 0:
                return Response({"message": "No users found."}, status=status.HTTP_404_NOT_FOUND)


            return Response({"message": "All users and their progress have been deleted."}, status=status.HTTP_200_OK)

        except Exception as e:
            print("ERROR during delete-all:", str(e))
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class UserListView(APIView):
    def get(self, request):
        try:
            users = User.objects.only('student_id') 
            user_list = [{"student_id": user.student_id} for user in users] 
            
            return Response(user_list, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
