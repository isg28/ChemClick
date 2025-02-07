# lessons/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import LessonProgress
from .serializers import LessonProgressSerializer
from .models import LessonDetails
from .serializers import LessonDetailsSerializer


class LessonProgressView(APIView):
    def get(self, request, user_id=None, lesson_id=None):
        if user_id and lesson_id:
            progress = LessonProgress.objects.filter(user_id=user_id, lesson_id=lesson_id).first()
            if progress:
                serializer = LessonProgressSerializer(progress)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"message": "Progress not found"}, status=status.HTTP_404_NOT_FOUND)
        
        elif user_id:
            progress = LessonProgress.objects.filter(user_id=user_id)
            if progress:
                serializer = LessonProgressSerializer(progress, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"message": "No progress found for user"}, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = LessonProgressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, user_id, lesson_id):
        progress = LessonProgress.objects.filter(user_id=user_id, lesson_id=lesson_id).first()
        if progress:
            serializer = LessonProgressSerializer(progress, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Progress not found"}, status=status.HTTP_404_NOT_FOUND)

class LessonListView(APIView):
    def get(self, request):
        lessons = LessonDetails.objects.all()
        serializer = LessonDetailsSerializer(lessons, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LessonDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LessonDetailView(APIView):
    def get(self, request, lesson_id):
        try:
            lesson = LessonDetails.objects.get(lesson_id=lesson_id)
            serializer = LessonDetailsSerializer(lesson)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except LessonDetails.DoesNotExist:
            return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, lesson_id):
        try:
            lesson = LessonDetails.objects.get(lesson_id=lesson_id)
        except LessonDetails.DoesNotExist:
            return Response({"error": "Lesson not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = LessonDetailsSerializer(lesson, data=request.data, partial=True)  
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request):
        serializer = LessonDetailsSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Avoid duplicate creation
                existing_lesson = LessonDetails.objects.get(lesson_id=serializer.validated_data["lesson_id"])
                return Response({"error": "Lesson already exists"}, status=status.HTTP_400_BAD_REQUEST)
            except LessonDetails.DoesNotExist:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                        
    def delete(self, request, pk):
        try:
            lesson = LessonDetails.objects.get(pk=pk)
            lesson.delete()
            return Response({'message': 'Lesson deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except LessonDetails.DoesNotExist:
            return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)