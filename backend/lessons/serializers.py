# lessons/serializers.py
from rest_framework import serializers
from .models import LessonProgress
from .models import LessonDetails
from datetime import datetime



class LessonProgressSerializer(serializers.Serializer):
    user_id = serializers.CharField(max_length=40)
    lesson_id = serializers.CharField(max_length=40)
    correct_answers = serializers.IntegerField(default=0)
    incorrect_answers = serializers.IntegerField(default=0)
    total_attempts = serializers.IntegerField(default=0)
    mastery_level = serializers.FloatField(default=0.0)
    progress = serializers.FloatField(default=0.0)
    goal_level = serializers.IntegerField(default=0) 

    def create(self, validated_data):
        lesson_progress = LessonProgress(
            user_id=validated_data['user_id'],
            lesson_id=validated_data['lesson_id'],
            correct_answers=validated_data.get('correct_answers', 0),
            incorrect_answers=validated_data.get('incorrect_answers', 0),
            total_attempts=validated_data.get('total_attempts', 0),
            mastery_level=validated_data.get('mastery_level', 0.0),
            progress=validated_data.get('progress', 0.0),
            goal_level=validated_data.get('goal_level', 0),  
        )
        lesson_progress.save()
        return lesson_progress

    def update(self, instance, validated_data):
        instance.correct_answers = validated_data.get('correct_answers', instance.correct_answers)
        instance.incorrect_answers = validated_data.get('incorrect_answers', instance.incorrect_answers) 
        instance.total_attempts = validated_data.get('total_attempts', instance.total_attempts)  
        instance.mastery_level = validated_data.get('mastery_level', instance.mastery_level)
        instance.progress = validated_data.get('progress', instance.progress)
        instance.goal_level = validated_data.get('goal_level', instance.goal_level) 
        instance.save()
        return instance
    
    def validate_total_attempts(self, value):
        return value if value is not None else 0

class LessonDetailsSerializer(serializers.Serializer):
    lesson_id = serializers.CharField(max_length=50)
    name = serializers.CharField(max_length=100)  
    status = serializers.ChoiceField(choices=['completed', 'in-progress', 'not-started', 'locked'], required=False)
    due_date = serializers.DateField(required=False, allow_null=True)  
    goal_level = serializers.IntegerField(default=0)

    def get_due_date(self, obj):
        if isinstance(obj.due_date, datetime):
            return obj.due_date.date()
        return obj.due_date

    def to_internal_value(self, data):
        if 'due_date' in data and data['due_date']:
            if isinstance(data['due_date'], str):  
                data['due_date'] = datetime.strptime(data['due_date'], "%Y-%m-%d").date()
            elif isinstance(data['due_date'], datetime.date): 
                pass
            else:
                raise serializers.ValidationError({"due_date": "Invalid date format"})
        return super().to_internal_value(data)
    
    def create(self, validated_data):
        return LessonDetails(**validated_data).save()

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
