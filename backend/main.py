from flask import Flask, request, jsonify, g
import sqlite3

DATABASE = "case_database.db"

app = Flask(__name__)


# Database helper functions

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(exception):
    db = g.pop("db", None)
    if db is not None:
        db.close()

def init_db():
    """Create the cases table if it doesn't exist."""
    db = get_db()
    db.execute("""
        CREATE TABLE IF NOT EXISTS cases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT,
            due_date TEXT
        )
    """)
    db.commit()

# Helper function for reliability
def check_if_case_exists():
    db = get_db()
    cursor = db.execute("SELECT 1 FROM cases WHERE title = ? LIMIT 1", (title,))
    return cursor.fetchone() is not None

# API entry points

@app.route("/api/create_case", methods=["POST"])
def create_case():
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    status = data.get("status")
    due_date = data.get("due_date")

    db = get_db()

    db.execute(
        "INSERT INTO cases (title, description, status, due_date) VALUES (?, ?, ?, ?)",
        (title, description, status, due_date)
    )
    db.commit()

    return {"message": "Case created successfully"}, 201

# Maybe this should pass in the title instead?
@app.route("/api/update_status", methods=["POST"])
def update_status():
    data = request.json
    id = data.get("id")
    new_status = data.get("status")

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "UPDATE cases SET status = ? WHERE id = ?",
        (new_status, id)
    )
    db.commit()

    return {"message": "Case updated successfully"}, 201

@app.route("/")
def index():
    return "Backend is running"

if __name__ == "__main__":
    with app.app_context():
        init_db()  # make sure the DB/table exists
    app.run(port=8000, debug=True)