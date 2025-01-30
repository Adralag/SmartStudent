from flask import Flask, request, jsonify
from mysql.connector import pooling

dbconfig = {
    "database": "your_database_name",
    "user": "your_username",
    "password": "your_password",
    "host": "your_host"
}

connection_pool = pooling.MySQLConnectionPool(pool_name="mypool",
                                              pool_size=5,
                                              **dbconfig)

app = Flask(__name__)

# Route to add a student
@app.route('/add_student', methods=['POST'])
def add_student():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    connection = connection_pool.get_connection()
    cursor = connection.cursor()
    try:
        student_id = data.get('student_id')
        course_of_study = data.get('course_of_study')
        password_hash = data.get('password_hash')
        if not all([name, email, student_id, course_of_study, password_hash]):
            return jsonify({"error": "Missing data"}), 400

        query = "INSERT INTO users (name, email, student_id, course_of_study, password_hash) VALUES (%s, %s, %s, %s, %s)"
        values = (name, email, student_id, course_of_study, password_hash)

        cursor.execute(query, values)
        connection.commit()
    finally:
        cursor.close()
        connection.close()
    return jsonify({"message": "Student added successfully!"})

# Route to get student details
@app.route('/get_student/<student_id>', methods=['GET'])
def get_student(student_id):
    """
    Get student details by student_id.

    Args:
        student_id (str): The ID of the student to retrieve.

    Returns:
        Response: JSON response containing student details or an error message.
    """
    connection = connection_pool.get_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        query = "SELECT name, email, student_id, course_of_study FROM users WHERE student_id = %s"
        cursor.execute(query, (student_id,))
        student = cursor.fetchone()
    finally:
        cursor.close()
        connection.close()
    if student:
        return jsonify(student), 200
    else:
        return jsonify({"error": "Student not found"}), 404

import os
debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() in ['true', '1', 't']
app.run(debug=debug_mode)
app.run(debug=debug_mode)