import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup() 

import unittest
from rest_framework.test import APIClient
from users.models import User
from mongoengine import connect, disconnect
import mongomock

class UserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        disconnect()
        connect('testdb', host='mongodb://localhost', uuidRepresentation='standard', mongo_client_class=mongomock.MongoClient)

    @classmethod
    def tearDownClass(cls):
        disconnect()

    def setUp(self):
        self.client = APIClient()
        User.objects.delete()

    def test_create_user(self):
        data = {
            "student_id": "test123",
            "school_email": "test@example.com",
            "password": "testpassword"
        }
        response = self.client.post("/users/create/", data, format="json")
        
        print("\nCREATE USER STATUS:", response.status_code)
        print("CREATE USER RESPONSE:", response.data)
        
        self.assertEqual(response.status_code, 201)
        self.assertTrue(User.objects(student_id="test123").first())

    def test_login_successful(self):
        user = User(student_id="login123", school_email="log@example.com")
        user.set_password("securepass")
        user.save()

        login_data = {
            "student_id": "login123",
            "password": "securepass"
        }
        response = self.client.post("/users/login/", login_data, format="json", SERVER_NAME="localhost")
        
        print("\nLOGIN SUCCESSFUL STATUS:", response.status_code)
        print("LOGIN SUCCESSFUL RESPONSE:", response.data)
    
        self.assertEqual(response.status_code, 200)
        self.assertIn("Login successful", response.data['message'])

    def test_login_failure(self):
        login_data = {
            "student_id": "unknown",
            "password": "nope"
        }
        response = self.client.post("/users/login/", login_data, format="json")
        
        print("\nLOGIN FAILURE STATUS:", response.status_code)
        print("LOGIN FAILURE RESPONSE:", response.data)
        
        self.assertEqual(response.status_code, 404)
