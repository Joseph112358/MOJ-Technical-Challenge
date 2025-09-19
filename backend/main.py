from flask import Flask, request, jsonify


app = Flask(__name__)

@app.route("/api/create_case", methods=["POST"])
def create_case():
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    status = data.get("status")
    due_date = data.get("due_date")

    print(data)

@app.route("/")
def index():
    return "Backend is running"

if __name__ == "__main__":
    app.run(port=8000, debug=True)