from rest_framework import serializers
from .models import Announcement

class AnnouncementSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)  # MongoDB `_id` field
    author = serializers.CharField(max_length=100)
    date = serializers.DateTimeField(read_only=True)
    message = serializers.CharField(max_length=500)
    post_number = serializers.IntegerField(read_only=True)

    def create(self, validated_data):
        announcement = Announcement(
            author=validated_data.get('author'),
            message=validated_data.get('message')
        )
        announcement.save()  
        return announcement 
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
