import db.db_api as db
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.get("/posts/<name>")
def get_posts_user(name):
    result = db.posts_from_user(name)
    return jsonify(result)

@app.get("/tags/<tag>")
def get_posts_tags(tag):
    result = db.posts_from_tag([tag])
    return jsonify(result)

@app.post("/posts")
def add_posts():
    if request.is_json:
        post = request.get_json()
        db.create_post (post[0], post[1], post[2], post[3])
        return jsonify(post), 201
    return {"error": "Request must be JSON"}, 415