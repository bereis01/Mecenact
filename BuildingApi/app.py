import db.db_api as db
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.get("/user/<name>/login/<password>")
def get_user(name, password):
    target = db.return_user(name)
    if(target == []):
        return "User not found\n"
    if (password == db.return_password(name)[0][0]):
        return get_posts_user(name)
    return "Wrong password\n"

@app.get("/posts/user/<name>")
def get_posts_user(name):
    result = db.posts_from_user(name)
    return jsonify(result)

@app.get("/posts/tags/<tags>")
def get_posts_tags(tags):
    tag_array = tags.split(",")
    result = db.search_tags(tag_array)
    return jsonify(result)

@app.get("/posts/tags/<tags_t>/<tags_f>")
def get_posts_tags_plus(tags_t, tags_f):
    tag_array_t = tags_t.split(",")
    tag_array_f = tags_f.split(",")
    result_t = db.search_tags(tag_array_t)
    result_f = db.search_tags(tag_array_f)
    result = []
    for element in result_t:
        if element not in result_f:
            result.append(element)
    return jsonify(result)

@app.get("/tags/<author>/<post_id>")
def get_tags(author, post_id):
    result = db.tags_from_post(author, post_id)
    return jsonify(result), 201

@app.post("/user")
def add_user():
    if request.is_json:
        new_user = request.get_json()
        db.create_user(new_user[0], new_user[1])
        return jsonify(new_user), 201
    return {"error": "Request must be JSON"}, 415

@app.post("/posts")
def add_posts():
    if request.is_json:
        post = request.get_json()
        db.create_post(post[0], post[1], post[2], post[3])
        return jsonify(post), 201
    return {"error": "Request must be JSON"}, 415

@app.put("/tags")
def update_tags():
    if request.is_json:
        info = request.get_json()
        tag_array = info[0].split(",")
        db.assign_tags(tag_array, info[1], info[2])
        return jsonify(tag_array)
    return {"error": "Request must be JSON"}, 415

@app.put("/user/<name>/<password>")
def update_user(name, password):
    if request.is_json:
        info = request.get_json()
        target = db.return_user(name)
        if(target == []):
            return "User not found\n"
        if (password == db.return_password(name)[0][0]):
            db.change_username(name, info[0])
            return jsonify(info[0])
        return "Wrong password\n"
    return {"error": "Request must be JSON"}, 415

@app.delete("/posts/<author>/<post_id>")
def delete_post(author, post_id):
    result = db.remove_post(author, post_id)
    return jsonify(result)

@app.delete("/user/<username>")
def delete_user(username):
    result = db.remove_user(username)
    return jsonify(result)

@app.delete("/tags/<tags>/<author>/<post_id>")
def delete_tags(tags, author, post_id):
    tag_array = tags.split(",")
    result = db.remove_tags(tag_array, author, post_id)
    return jsonify(result)
