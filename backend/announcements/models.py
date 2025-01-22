import mongoengine as me
from mongoengine.queryset.visitor import Q
from datetime import datetime;

class Announcement(me.Document):
    author = me.StringField(max_length=100)
    date = me.DateTimeField(default=datetime.utcnow) 
    message = me.StringField(max_length=500)
    post_number = me.IntField()

    def save(self, *args, **kwargs):
        if not self.post_number:
            last_announcement = Announcement.objects.order_by('-post_number').first()
            self.post_number = (last_announcement.post_number + 1) if last_announcement else 1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Post #{self.post_number}: {self.author} - {self.date}"
