from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Announcement
from .serializers import AnnouncementSerializer

# Create your views here.

class AnnouncementView(APIView):
    def get(self, request, *args, **kwargs):

        announcements = Announcement.objects.all().order_by('-date')
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = AnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            announcement = serializer.save()
            return Response(AnnouncementSerializer(announcement).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, id, *args, **kwargs):
        try:
            announcement = Announcement.objects.get(id=id)
        except Announcement.DoesNotExist:
            return Response({"error": "Announcement not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = AnnouncementSerializer(announcement, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None, *args, **kwargs):
        if id:
            try:
                announcement = Announcement.objects.get(id=id)
            except Announcement.DoesNotExist:
                return Response({"error": "Announcement not found"}, status=status.HTTP_404_NOT_FOUND)
            announcement.delete()
            return Response({"message": "Announcement deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        Announcement.objects.all().delete()
        return Response({"message": "All announcements deleted successfully"}, status=status.HTTP_204_NO_CONTENT)