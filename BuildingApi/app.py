import db.db_api as db
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app=app, 
            resources={r'/*':{"origins":'http://localhost:3000'}}
    )

@app.get("/user/<name>/login/<password>")
def get_user(name, password):
    target = db.return_user(name)
    if(target == []):
        return make_response({'error':"User not found\n"}, 404)
    if (password == db.return_password(name)[0][0]):
        return get_posts_user(name)
    return make_response({'error':"Wrong password\n"}, 403)

@app.get("/posts")
def all_posts():
    result = db.all_posts()
    return jsonify(result), 200

@app.get("/posts/user/<name>")
def get_posts_user(name):
    result = db.posts_from_user(name)
    return jsonify(result), 200

@app.get("/posts/tags/<tags>")
def get_posts_tags(tags):
    tag_array = tags.split(",")
    result = db.search_tags(tag_array)
    return jsonify(result), 200

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
    return jsonify(result), 200 

@app.get("/posts/<author>/<post_id>")
def get_post(author, post_id):
    result = db.return_post(author, post_id)
    return jsonify(result), 200 

@app.get("/tags/<author>/<post_id>")
def get_tags(author, post_id):
    result = db.tags_from_post(author, post_id)
    return jsonify(result), 200 

@app.get("/tags")
def all_tags():
    result = db.all_tags()
    return jsonify(result), 200

@app.get("/image/<author>/<post_id>")
def get_image(author, post_id):
    result = db.image_from_post(author, post_id)
    res = make_response(result[0][0], 200)
    res.content_type = 'image/' + result[0][1][1:]
    return res

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
        (author, post_id) = db.create_post(post[0], post[1], post[2])
        result = db.return_post(author, post_id)
        return jsonify(result), 201 
    return {"error": "Request must be JSON"}, 415 

@app.put("/tags/<author>/<post_id>")
def update_tags(author, post_id):
    if request.is_json:
        info = request.get_json()
        tag_array = info[0].split(",")
        db.assign_tags(tag_array, author, post_id)
        return jsonify(tag_array), 200 
    return {"error": "Request must be JSON"}, 415 

@app.put("/image/<author>/<post_id>")
def update_image(author, post_id):
    if request.is_json:
        info = request.get_json()
        db.assign_image(info[0], info[1], author, post_id)
        return jsonify(info[0]), 200 
    return {"error": "Request must be JSON"}, 415 

@app.put("/user/<name>/<password>")
def update_user(name, password):
    if request.is_json:
        info = request.get_json()
        target = db.return_user(name)
        if(target == []):
            return {'error':"User not found\n"}, 404
        if (password == db.return_password(name)[0][0]):
            db.change_username(name, info[0])
            return jsonify(info[0]), 200
        return {'error':"Wrong password\n"}, 403
    return {"error": "Request must be JSON"}, 415

@app.delete("/posts/<author>/<post_id>")
def delete_post(author, post_id):
    result = db.remove_post(author, post_id)
    return {'message':"Delete successful\n"}, 204

@app.delete("/user/<name>/<password>")
def delete_user(name, password):
    if (password == db.return_password(name)[0][0]):
        result = db.remove_user(name)
        return {'message':"Delete successful\n"}, 204
    return {'error':"Wrong password or user\n"}, 403

@app.delete("/tags/<tags>/<author>/<post_id>")
def delete_tags(tags, author, post_id):
    tag_array = tags.split(",")
    result = db.remove_tags(tag_array, author, post_id)
    return {'message':"Delete successful\n"}, 204

@app.delete("/image/<author>/<post_id>")
def delete_image(tags, author, post_id):
    result = db.remove_image(author, post_id)
    return {'message':"Delete successful\n"}, 204
