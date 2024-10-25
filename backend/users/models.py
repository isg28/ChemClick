import mongoengine as me
from django.contrib.auth.hashers import make_password, check_password

class User(me.Document):
    student_id = me.StringField(required=True, unique=True)
    school_email = me.EmailField(required=True, unique=True)
    password = me.StringField(required=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)   #  Django's make_password  -> used to hash the password

    def check_password(self, raw_password):
        return check_password(raw_password, self.password) # checks pw matches
    
    def __str__(self):
        return self.student_id
