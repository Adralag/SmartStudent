from flask import Flask, request, render_template, redirect, url_for, flash
import mysql.connector
import os

def get_db_connection():
    db = mysql.connector.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        user=os.getenv('DB_USER', 'root'),
        password=os.getenv('DB_PASSWORD', ''),
        database=os.getenv('DB_NAME', 'smartstudent')
    )
    return db
from werkzeug.security import generate_password_hash

app = Flask(__name__)
import os

app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')  # For session security

# Route for the Registration Form
@app.route('/register', methods=['GET', 'POST'])
def register():

    if request.method == 'POST':
        fullname = request.form['fullname']
        email = request.form['email']
        ID = request.form['ID']
        course = request.form['course']
        password = request.form['password']
        terms = request.form.get('terms')

        # Check if Terms & Conditions are agreed
        if not terms:
            return redirect(register.html)

        # Hash the password before storing
        hashed_password = generate_password_hash(password)

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
            return redirect(url_for('login'))

        except mysql.connector.Error as err:
            flash(f"Database error: {err}", "error")
        
        finally:
            if cursor is not None:
                cursor.close()
            if db is not None:
                db.close()

    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
