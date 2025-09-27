import pytest
# TODO: Maybe create a constructor or something for app
# TODO: Find a way to mock or switch between prod and testing DB
from backend.main import app 

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_index(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.data.decode("utf-8") == "Backend is running"