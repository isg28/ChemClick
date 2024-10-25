import mongoengine as me
from django.contrib.auth.hashers import make_password 

class User(me.Document):
    student_id = me.StringField(required=True, unique=True)
    school_email = me.EmailField(required=True, unique=True)
    password = me.StringField(required=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)   #  Django's make_password  -> used to hash the password

    def __str__(self):
        return self.student_id
