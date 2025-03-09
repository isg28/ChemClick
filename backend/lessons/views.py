# lessons/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import LessonProgress
from .serializers import LessonProgressSerializer
from .models import LessonDetails
from .serializers import LessonDetailsSerializer
from users.models import User

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
                updated_progress = serializer.save()
                updated_progress.update_status()
                return Response(LessonProgressSerializer(updated_progress).data, status=status.HTTP_200_OK)
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
        
class StudentProgressSummaryView(APIView):
    def get(self, request, lesson_id):
        try:
            total_students = User.objects.count()  
            progress_students = set(progress.user_id for progress in LessonProgress.objects.filter(lesson_id=lesson_id))
            not_started_count = total_students - len(progress_students)
            
            not_started_but_clicked = LessonProgress.objects.filter(lesson_id=lesson_id, status="not-started").count()
            in_progress = LessonProgress.objects.filter(lesson_id=lesson_id, status="in-progress").count()
            completed = LessonProgress.objects.filter(lesson_id=lesson_id, status="completed").count()

            return Response({
                "not_started": not_started_count + not_started_but_clicked, 
                "in_progress": in_progress,
                "completed": completed
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class StudentStatisticsView(APIView):
    def get(self, request, lesson_id):
        """
        Retrieve all students' progress for a given lesson ID.
        """
        try:
            student_progress = LessonProgress.objects.filter(lesson_id=lesson_id)
            all_students = User.objects.all()
            
            progress_data = {}
            
            # Helper function to format status
            def format_status(status):
                if status == 'completed':
                    return 'Completed'
                elif status == 'in-progress':
                    return 'In Progress'
                elif status == 'not_started':
                    return 'Not Started'
                return status  # Fallback for unexpected values
            
            for progress in student_progress:
                progress_data[progress.user_id] = {
                    "user_id": progress.user_id,
                    "lesson_id": progress.lesson_id,
                    "correct_answers": progress.correct_answers,
                    "incorrect_answers": progress.incorrect_answers,
                    "total_attempts": progress.total_attempts,
                    "mastery_level": progress.mastery_level,
                    "progress": progress.progress,
                    "goal_level": progress.goal_level,
                    "email_sent": progress.email_sent,
                    "completion_timestamp": progress.completion_timestamp,
                    "status": format_status(progress.status),
                    "is_late": progress.is_late
                }
            
            for student in all_students:
                if student.student_id not in progress_data:
                    progress_data[student.student_id] = {
                        "user_id": student.student_id,
                        "lesson_id": lesson_id,
                        "correct_answers": 0,
                        "incorrect_answers": 0,
                        "total_attempts": 0,
                        "mastery_level": 0.0,
                        "progress": 0.0,
                        "goal_level": 0,
                        "email_sent": False,
                        "completion_timestamp": None,
                        "status": "Not Started",
                        "is_late": False
                    }
            
            supplemented_progress = list(progress_data.values())
            
            serializer = LessonProgressSerializer(supplemented_progress, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )