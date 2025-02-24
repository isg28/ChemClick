from rest_framework import serializers
from .models import TeacherUser

class TeacherUserSerializer(serializers.Serializer):
    teacher_id = serializers.CharField(max_length=40)
    #teacher_email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        teacheruser = TeacherUser(
            teacher_id=validated_data['teacher_id'],
            #teacher_email=validated_data['teacher_email']
        )
        teacheruser.set_password(validated_data['password']) 
        teacheruser.save()  
        return teacheruser
