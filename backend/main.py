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

@app.route("/")
def index():
    return "Backend is running"

if __name__ == "__main__":
    with app.app_context():
        init_db()  # make sure the DB/table exists
    app.run(port=8000, debug=True)