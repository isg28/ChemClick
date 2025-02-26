from django.db import models
import mongoengine as me

class TeacherLessonProgress(me.Document):
    teacher_id = me.StringField(required=True)  
    lesson_id = me.StringField(required=True)
    correct_answers = me.IntField(default=0) 
    incorrect_answers = me.IntField(default=0)
    total_attempts = me.IntField(default=0)
    mastery_level = me.FloatField(default=0.0)
    progress = me.FloatField(default=0.0)
    goal_level = me.IntField(default=0)

    def __str__(self):
        return f"Lesson: {self.lesson_id}, User: {self.teacher_id}, Total Attempts: {self.total_attempts}"

class TeacherLessonDetails(me.Document):
    STATUS_CHOICES = ('completed', 'in-progress', 'not-started', 'locked')

    lesson_id = me.StringField(max_length=50, unique=True)
    name = me.StringField(max_length=50)
    status = me.StringField(choices=STATUS_CHOICES, default='locked')
    due_date = me.DateField(null=True)
    goal_level = me.IntField(default=0)
