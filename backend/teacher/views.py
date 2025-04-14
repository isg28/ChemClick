from rest_framework.views import APIView  
from rest_framework.response import Response  
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework import status # type: ignore
from .serializer import TeacherUserSerializer 
from django.contrib.auth.hashers import check_password,make_password
from django.contrib.auth.hashers import make_password
from .models import TeacherUser
# Create your views here.

@method_decorator(csrf_exempt, name='dispatch')
class TeacherLoginView(View):
    def post(self, request):
        data = json.loads(request.body)
        teacher_id = data.get('teacher_id')
        password = data.get('password')

        try:
            teacheruser = TeacherUser.objects.get(teacher_id=teacher_id)
            if check_password(password, teacheruser.password):
                return JsonResponse({'message': 'Login successful', 'teacher_id': teacher_id}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        except TeacherUser.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class TeacherCheckView(View):
    def get(self, request, teacher_id):
        try:
            teacher = TeacherUser.objects.get(teacher_id=teacher_id)
            return JsonResponse({'exists': True}, status=200)
        except TeacherUser.DoesNotExist:
            return JsonResponse({'exists': False}, status=404)