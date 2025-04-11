import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

import unittest
from django.test import Client
from teacher.models import TeacherUser
from mongoengine import connect, disconnect
import mongomock
from django.contrib.auth.hashers import make_password


class TeacherLoginTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        disconnect()
        connect('testdb', host='mongodb://localhost', uuidRepresentation='standard', mongo_client_class=mongomock.MongoClient)

    @classmethod
    def tearDownClass(cls):
        disconnect()

    def setUp(self):
        self.client = Client()
        TeacherUser.objects.delete()

    def test_teacher_login_success(self):
        TeacherUser.objects.create(
            teacher_id="teach123",
            password=make_password("mypassword")
        )

        login_data = {
            "teacher_id": "teach123",
            "password": "mypassword"
        }

        response = self.client.post("/teacher/teacherlogin/", data=login_data, content_type="application/json")

        print("\nTEACHER LOGIN SUCCESS STATUS:", response.status_code)
        print("TEACHER LOGIN SUCCESS RESPONSE:", response.json())

        self.assertEqual(response.status_code, 200)
        self.assertIn("Login successful", response.json().get("message", ""))

    def test_teacher_login_invalid_credentials(self):
        TeacherUser.objects.create(
            teacher_id="teach456",
            password=make_password("rightpass")
        )

        login_data = {
            "teacher_id": "teach456",
            "password": "wrongpass"
        }

        response = self.client.post("/teacher/teacherlogin/", data=login_data, content_type="application/json")

        print("\nTEACHER LOGIN INVALID STATUS:", response.status_code)
        print("TEACHER LOGIN INVALID RESPONSE:", response.json())

        self.assertEqual(response.status_code, 401)
        self.assertIn("Invalid credentials", response.json().get("error", ""))

    def test_teacher_login_user_not_found(self):
        login_data = {
            "teacher_id": "nonexistent",
            "password": "nope"
        }

        response = self.client.post("/teacher/teacherlogin/", data=login_data, content_type="application/json")

        print("\nTEACHER LOGIN NOT FOUND STATUS:", response.status_code)
        print("TEACHER LOGIN NOT FOUND RESPONSE:", response.json())

        self.assertEqual(response.status_code, 404)
        self.assertIn("User not found", response.json().get("error", ""))
