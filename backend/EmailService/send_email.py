import smtplib
import os
import pymongo
from pymongo import MongoClient
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

print("pymongo version:", pymongo.version)

# MongoDB connection
url = ('mongodb+srv://ChemClicks:xprVfEaoxMAidRe2@cluster0.hjo3g.mongodb.net/ChemClicks?retryWrites=true&w=majority') #change with os.getenv()
client = MongoClient(url)
db = client['ChemClicks']
collection = db['lesson_progress']

# Email configuration
matt_email = "example@email.com" #change with Matt's email when ready
sender_email = "chemclicks@gmail.com"
sender_password = "ltig qxgb vxzn scsh"  # Gmail SMTP password
smtp_server = "smtp.gmail.com"
smtp_port = 587

def send_email(matt_email, student_id, lesson_id):
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = matt_email
    msg['Subject'] = f"Student ID {student_id} - Assignment Completed"

    # Email body
    body = f"Dear Matt,\n\nStudent {student_id} has completed {lesson_id}.\n\nBest regards,\nChemClicks"
    msg.attach(MIMEText(body, 'plain'))

    # Send the email
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, matt_email, msg.as_string())
            print(f"Email sent successfully to {matt_email} for student {student_id} and lesson {lesson_id}")
    except Exception as e:
        print(f"Failed to send email to {matt_email} for student {student_id} and lesson {lesson_id}: {e}")

def get_students_with_completed_progress():
    # Query for students with 100% progress
    students = collection.find({"progress": 100, "email_sent": {"$ne": True}})
    student_data = [(student.get("user_id"), student.get("lesson_id")) for student in students if student.get("user_id") is not None and student.get("lesson_id") is not None]
    
    if student_data:
        return student_data
    else:
        print("No students found with 100% progress.")
        return []

# Fetch students and send emails
try:
    student_data = get_students_with_completed_progress()
    if student_data:
        for student_id, lesson_id in student_data:
            send_email(matt_email, student_id, lesson_id)
            collection.update_many(
                {"user_id": student_id, "lesson_id": lesson_id, "progress": 100},  
                {"$set": {"email_sent": True}} 
            )
    else:
        print("No students found with completed progress.")
finally:
    # Close the MongoDB client
    client.close()
