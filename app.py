from flask import Flask, request, render_template, redirect, url_for, flash
import os
import mysql.connector
from werkzeug.security import generate_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for flash messages

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        user=os.getenv('DB_USER', 'root'),
        password=os.getenv('DB_PASSWORD', ''),
        database=os.getenv('DB_NAME', 'smartstudent')
    )

# Route for the Registration Form
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        fullname = request.form.get('fullname')
        email = request.form.get('email')
        course = request.form.get('course')
        password = request.form.get('password')
        terms = request.form.get('terms')

        # Check if terms and conditions are accepted
        if not terms:
            flash("You must agree to the terms and conditions.", "error")
            return redirect(url_for('register'))

        # Hash the password before storing
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        try:
            db = get_db_connection()
            cursor = db.cursor()

            # Insert into the database
            cursor.execute(
                "INSERT INTO users (name, email, course_of_study, password_hash) VALUES (%s, %s, %s, %s)",
                (fullname, email, course, hashed_password)
            )
            db.commit()

            flash("Registration successful!", "success")
            return redirect('/login.html')


        except mysql.connector.Error as err:
            flash(f"Database error: {err}", "error")

        finally:
            if cursor:
                cursor.close()
            if db:
                db.close()

    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
