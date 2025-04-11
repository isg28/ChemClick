import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

import unittest
from rest_framework.test import APIClient
from mongoengine import connect, disconnect
import mongomock
from lessons.models import LessonProgress, LessonDetails
from users.models import User


class LessonTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        disconnect()
        connect('testdb', host='mongodb://localhost', uuidRepresentation='standard', mongo_client_class=mongomock.MongoClient)

    @classmethod
    def tearDownClass(cls):
        disconnect()

    def setUp(self):
        self.client = APIClient()
        LessonDetails.objects.delete()
        LessonProgress.objects.delete()
        User.objects.delete()

        self.lesson_data = {
            "lesson_id": "L001",
            "name": "Chemical Bonds",
            "status": "in-progress",
            "goal_level": 3
        }

        self.progress_data = {
            "user_id": "S001",
            "lesson_id": "L001",
            "correct_answers": 4,
            "incorrect_answers": 2,
            "total_attempts": 6,
            "mastery_level": 0.66,
            "progress": 80.0,
            "goal_level": 3
        }

        # Create mock user for progress
        User(student_id="S001", school_email="student@example.com", password="fake").save()

    def test_create_lesson(self):
        response = self.client.post("/lessons/", self.lesson_data, format="json")
        print("\nCREATE LESSON STATUS:", response.status_code)
        print("CREATE LESSON RESPONSE:", response.data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["lesson_id"], "L001")

    def test_create_lesson_progress(self):
        self.client.post("/lessons/", self.lesson_data, format="json")
        response = self.client.post("/lessons/progress/", self.progress_data, format="json")
        print("\nCREATE PROGRESS STATUS:", response.status_code)
        print("CREATE PROGRESS RESPONSE:", response.data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["user_id"], "S001")

    def test_get_progress_by_user(self):
        self.client.post("/lessons/", self.lesson_data, format="json")
        self.client.post("/lessons/progress/", self.progress_data, format="json")
        response = self.client.get("/lessons/progress/S001/")
        print("\nGET PROGRESS (USER) STATUS:", response.status_code)
        print("GET PROGRESS (USER) RESPONSE:", response.data)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(any(p["lesson_id"] == "L001" for p in response.data))

    def test_patch_progress(self):
        self.client.post("/lessons/", self.lesson_data, format="json")
        self.client.post("/lessons/progress/", self.progress_data, format="json")
        update_data = {"progress": 100.0}
        response = self.client.patch("/lessons/progress/S001/L001/", update_data, format="json")
        print("\nPATCH PROGRESS STATUS:", response.status_code)
        print("PATCH PROGRESS RESPONSE:", response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["progress"], 100.0)

    def test_get_lesson_detail(self):
        self.client.post("/lessons/", self.lesson_data, format="json")
        response = self.client.get("/lessons/L001/")
        print("\nGET LESSON STATUS:", response.status_code)
        print("GET LESSON RESPONSE:", response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "Chemical Bonds")
