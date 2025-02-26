from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TeacherLessonProgress
from .serializer import TeacherLessonProgressSerializer

class TeacherLessonProgressView(APIView):
    def get(self, request, teacher_id=None, lesson_id=None):
        if teacher_id and lesson_id:
            progress = TeacherLessonProgress.objects.filter(teacher_id=teacher_id, lesson_id=lesson_id).first()
            if progress:
                serializer = TeacherLessonProgressSerializer(progress)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"message": "Progress not found"}, status=status.HTTP_404_NOT_FOUND)

        elif teacher_id:
            progress = TeacherLessonProgress.objects.filter(teacher_id=teacher_id)
            if progress:
                serializer = TeacherLessonProgressSerializer(progress, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"message": "No progress found for teacher"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Teacher ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = TeacherLessonProgressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, teacher_id, lesson_id):
        progress = TeacherLessonProgress.objects.filter(teacher_id=teacher_id, lesson_id=lesson_id).first()
        if progress:
            serializer = TeacherLessonProgressSerializer(progress, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Progress not found"}, status=status.HTTP_404_NOT_FOUND)
