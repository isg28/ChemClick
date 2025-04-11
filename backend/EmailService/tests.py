import unittest
from unittest.mock import patch, MagicMock
import EmailService.send_email as send_email


class TestEmailNotifier(unittest.TestCase):

    @patch('EmailService.send_email.collection')
    def test_get_students_with_completed_progress(self, mock_collection):
        mock_collection.find.return_value = [
            {'user_id': 's123', 'lesson_id': 'l456', 'progress': 100, 'email_sent': False}
        ]
        result = send_email.get_students_with_completed_progress()
        self.assertEqual(result, [('s123', 'l456')])
        print("\ntest_get_students_with_completed_progress PASSED:", result)

    @patch('EmailService.send_email.smtplib.SMTP')
    def test_send_email_success(self, mock_smtp):
        mock_server = MagicMock()
        mock_smtp.return_value.__enter__.return_value = mock_server
        send_email.send_email("test@email.com", "s123", "l456")
        mock_server.sendmail.assert_called_once()
        print("\ntest_send_email_success PASSED")

    @patch('EmailService.send_email.get_students_with_completed_progress')
    @patch('EmailService.send_email.send_email')
    @patch('EmailService.send_email.collection')
    def test_main_function(self, mock_collection, mock_send_email, mock_get_students):
        mock_get_students.return_value = [('s123', 'l456')]
        mock_collection.update_many.return_value = None
        send_email.main()
        mock_send_email.assert_called_once_with(send_email.matt_email, 's123', 'l456')
        mock_collection.update_many.assert_called_once()
        print("\ntest_main_function PASSED")


if __name__ == "__main__":
    with patch('EmailService.send_email.schedule.every'), \
         patch('EmailService.send_email.schedule.run_pending'), \
         patch('EmailService.send_email.time.sleep'), \
         patch('EmailService.send_email.while', create=True):  # Prevent while loop
        unittest.main()
