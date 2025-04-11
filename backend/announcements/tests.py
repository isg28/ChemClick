import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

import unittest
from rest_framework.test import APIClient
from announcements.models import Announcement
from mongoengine import connect, disconnect
import mongomock

class AnnouncementTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        disconnect()
        connect(
            'testdb',
            host='mongodb://localhost',
            uuidRepresentation='standard',
            mongo_client_class=mongomock.MongoClient
        )

    @classmethod
    def tearDownClass(cls):
        disconnect()

    def setUp(self):
        self.client = APIClient()
        Announcement.objects.delete()

    def test_create_announcement(self):
        data = {
            "author": "Mr. Brimberry",
            "message": "Test announcement from ChemClick."
        }
        response = self.client.post("/announcements/", data, format="json")
        print("\nCREATE ANNOUNCEMENT STATUS:", response.status_code)
        print("CREATE RESPONSE:", response.data)
        self.assertEqual(response.status_code, 201)
        self.assertTrue("post_number" in response.data)

    def test_get_announcements(self):
        Announcement(author="Admin", message="Initial post").save()
        response = self.client.get("/announcements/")
        print("\nGET ANNOUNCEMENTS STATUS:", response.status_code)
        print("GET RESPONSE:", response.data)
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.data), 1)

    def test_update_announcement(self):
        ann = Announcement(author="Admin", message="Old message")
        ann.save()
        updated = {"message": "Updated announcement text"}

        response = self.client.put(f"/announcements/{ann.id}/", updated, format="json")
        print("\nUPDATE ANNOUNCEMENT STATUS:", response.status_code)
        print("UPDATE RESPONSE:", response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["message"], "Updated announcement text")

    def test_delete_announcement(self):
        ann = Announcement(author="Admin", message="To delete")
        ann.save()

        response = self.client.delete(f"/announcements/{ann.id}/")
        print("\nDELETE ANNOUNCEMENT STATUS:", response.status_code)
        print("DELETE RESPONSE:", response.data)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Announcement.objects.count(), 0)

if __name__ == "__main__":
    unittest.main()
