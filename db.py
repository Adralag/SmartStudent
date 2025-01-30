import mysql.connector

def connect_db():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",  # Change this
            password="your_password",  # Change this
            database="SmartStudent"
        )
        if connection.is_connected():
            print("Connected to SmartStudent database!")
        return connection
    except mysql.connector.Error as e:
        print("Database connection error:", e)
        return None
