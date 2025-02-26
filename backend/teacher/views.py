import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework import status # type: ignore
#from .serializer import TeacherUserSerializer 
from django.contrib.auth.hashers import check_password,make_password
#from django.contrib.auth.hashers import make_password
from .models import TeacherUser
# Create your views here.

#class CreateUserView(APIView):
#    def post(self, request):
#        serializer = UserSerializer(data=request.data)
#        if serializer.is_valid():
#            serializer.save()
#            return Response({'message': 'Account created successfully'}, status=status.HTTP_201_CREATED)
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#teacher = TeacherUser.objects.create(
#    teacher_id="87654321",
#   password= make_password( "securepassword1"),  # Hashing the password
#)

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