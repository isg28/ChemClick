from django.db import models
import mongoengine as me
from datetime import datetime
from lessons.models import LessonDetails 

class TeacherLessonProgress(me.Document):
    STATUS_CHOICES = ('completed', 'in-progress', 'not-started', 'locked')

    teacher_id = me.StringField(required=True)  
    lesson_id = me.StringField(required=True)
    correct_answers = me.IntField(default=0) 
    incorrect_answers = me.IntField(default=0)
    total_attempts = me.IntField(default=0)
    mastery_level = me.FloatField(default=0.0)
    progress = me.FloatField(default=0.0)
    goal_level = me.IntField(default=0)
    completion_timestamp = me.DateTimeField(null=True)
    status = me.StringField(choices=STATUS_CHOICES, default="not-started") 
    is_late = me.BooleanField(default=False)  

    def mark_completed(self):
        if self.progress == 100 and not self.completion_timestamp:
            self.completion_timestamp = datetime.utcnow()
        self.update_status()
        self.save()

    def update_status(self):
        lesson = LessonDetails.objects(lesson_id=self.lesson_id).first()

        if lesson and lesson.status == "locked":
            self.status = "locked"
        elif self.progress == 100:
            self.status = "completed"
            if not self.completion_timestamp:
                self.completion_timestamp = datetime.utcnow()
        elif self.progress >= 0:
            self.status = "in-progress"
        else:
            self.status = "not-started"
            
        if lesson and lesson.due_date and datetime.utcnow().date() > lesson.due_date:
            if self.status in ["not-started", "in-progress"] and not self.is_late:
                self.is_late = True 

        self.save()
        
    def __str__(self):
        return f"Lesson: {self.lesson_id}, User: {self.teacher_id}, Total Attempts: {self.total_attempts}, Status: {self.get_status()}"
