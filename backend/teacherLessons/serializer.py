from rest_framework import serializers
from .models import TeacherLessonProgress

class TeacherLessonProgressSerializer(serializers.Serializer):
    teacher_id = serializers.CharField(max_length=40)
    lesson_id = serializers.CharField(max_length=40)
    correct_answers = serializers.IntegerField(default=0)
    incorrect_answers = serializers.IntegerField(default=0)
    total_attempts = serializers.IntegerField(default=0)
    mastery_level = serializers.FloatField(default=0.0)
    progress = serializers.FloatField(default=0.0)
    goal_level = serializers.IntegerField(default=0)

    def create(self, validated_data):
        return TeacherLessonProgress(**validated_data).save()

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
