import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

import unittest
from rest_framework.test import APIClient
from mongoengine import connect, disconnect
import mongomock
from teacherLessons.models import TeacherLessonProgress


class TeacherLessonProgressTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        disconnect()
        connect('testdb', host='mongodb://localhost', uuidRepresentation='standard', mongo_client_class=mongomock.MongoClient)

    @classmethod
    def tearDownClass(cls):
        disconnect()

    def setUp(self):
        self.client = APIClient()
        TeacherLessonProgress.objects.delete()
        self.base_url = "/teacherLessons/progress/"

        self.progress_data = {
            "teacher_id": "t123",
            "lesson_id": "l456",
            "correct_answers": 2,
            "incorrect_answers": 1,
            "total_attempts": 3,
            "mastery_level": 0.6,
            "progress": 75.0,
            "goal_level": 5
        }

    def test_create_teacher_progress(self):
        response = self.client.post(self.base_url, self.progress_data, format="json")

        print("\nCREATE STATUS:", response.status_code)
        print("CREATE RESPONSE:", response.data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["teacher_id"], "t123")

    def test_get_teacher_progress_by_teacher_id(self):
        self.client.post(self.base_url, self.progress_data, format="json")

        response = self.client.get(f"{self.base_url}t123/")

        print("\nGET (by teacher_id) STATUS:", response.status_code)
        print("GET (by teacher_id) RESPONSE:", response.data)

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, list)
        self.assertEqual(response.data[0]["lesson_id"], "l456")

    def test_get_teacher_progress_by_teacher_and_lesson(self):
        self.client.post(self.base_url, self.progress_data, format="json")

        response = self.client.get(f"{self.base_url}t123/l456/")

        print("\nGET (by teacher & lesson) STATUS:", response.status_code)
        print("GET (by teacher & lesson) RESPONSE:", response.data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["lesson_id"], "l456")

    def test_patch_teacher_progress(self):
        self.client.post(self.base_url, self.progress_data, format="json")

        update_data = {
            "progress": 100.0
        }

        response = self.client.patch(f"{self.base_url}t123/l456/", update_data, format="json")

        print("\nPATCH STATUS:", response.status_code)
        print("PATCH RESPONSE:", response.data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["progress"], 100.0)
        self.assertEqual(response.data["status"], "completed")

    def test_delete_teacher_progress(self):
        self.client.post(self.base_url, self.progress_data, format="json")

        response = self.client.delete(f"{self.base_url}t123/l456/")

        print("\nDELETE STATUS:", response.status_code)
        print("DELETE RESPONSE:", response.data)

        self.assertEqual(response.status_code, 200)
        self.assertIn("deleted", response.data["message"])
