from rest_framework import serializers
from .models import User

class UserSerializer(serializers.Serializer):
    student_id = serializers.CharField(max_length=40)
    school_email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User(
            student_id=validated_data['student_id'],
            school_email=validated_data['school_email']
        )
        user.set_password(validated_data['password']) 
        user.save()  
        return user
