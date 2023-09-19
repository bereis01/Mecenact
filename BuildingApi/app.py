import sqlite3

# Parameters.
db_path = 'db/mecenact.db'

# Function to convert images to the appropriate format (BLOB).
def image_conversion(file_path):
    with open(file_path, 'rb') as image:
        image_converted = image.read()
    return image_converted

# Function to convert images from the appropriate format (BLOB).
def image_retrieval(file_path, blob_data):
    with open(file_path, 'rb') as image:
        image.write(blob_data)

# Database interface.
def create_user(username, password):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Inserts a new entry in the users table with the given information.
    data = (username, password, 0)
    cursor.execute("""
                    INSERT INTO users VALUES (?, ?, ?)
                    """, data)
    # Commit changes and finalizes the connection with the database.
    connection.commit()
    connection.close()
    
def remove_user(username):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    connection.execute("PRAGMA foreign_keys = 1")
    cursor = connection.cursor()
    # Remove the entries of the table users with the given username. 
    # Assumes usernames are unique.
    data = (username, )
    cursor.execute("""
                    DELETE FROM users WHERE username = ?
                    """, data)
    # Commit changes and finalizes the connection with the database.
    connection.commit()
    connection.close()
    
def all_users():
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries all the users from users table.
    query = cursor.execute("""
                            SELECT * FROM users
                            """)
    result = query.fetchall()
    # Finalizes the connection with the database.
    connection.close()
    return result

def return_user(username):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries the user with the given username from users table.
    data = (username, )
    query = cursor.execute("""
                            SELECT * FROM users WHERE username = ?
                            """, data)
    result = query.fetchall()
    # Finalizes the connection with the database.
    connection.close()
    return result

def create_post(author, title, image, body):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Retrieves the post count to generate post id.
    data = (author, )
    query = cursor.execute("""
                           SELECT post_count FROM users WHERE username = ?
                           """, data)
    post_id = query.fetchone()[0]
    # Inserts a new entry in the posts table with the given information.
    data = (author, post_id, title, image, body)
    cursor.execute("""
                    INSERT INTO posts VALUES (?, ?, ?, ?, ?)
                    """, data)
    # Updates the user's post count.
    data = (post_id + 1, author)
    cursor.execute("""
                   UPDATE users SET post_count = ? WHERE username = ?
                   """, data)
    # Commit changes and finalizes the connection with the database.
    connection.commit()
    connection.close()
    # Returns the tuple (author, post_id).
    return (author, post_id)

def remove_post(author, post_id):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    connection.execute("PRAGMA foreign_keys = 1")
    cursor = connection.cursor()
    # Remove the entries of the table posts with the given author and id. 
    # Assumes the pair author, id is unique.
    data = (author, post_id)
    cursor.execute("""
                   DELETE FROM posts WHERE author = ? AND id = ?
                   """, data)
    # Commit changes and finalizes the connection with the database.
    connection.commit()
    connection.close()

def all_posts():
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries all the posts from posts table.
    query = cursor.execute("""
                            SELECT * FROM posts
                            """)
    result = query.fetchall()
    # Finalizes the connection with the database.
    connection.close()
    return result

def return_post(author, post_id):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries the posts with the given information from posts table.
    data = (author, post_id)
    query = cursor.execute("""
                            SELECT * FROM posts WHERE author = ? AND id = ?
                            """, data)
    result = query.fetchall()
    # Finalizes the connection with the database.
    connection.close()
    return result

def posts_from_user(author):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries the posts with the given information from posts table.
    data = (author, )
    query = cursor.execute("""
                            SELECT * FROM posts WHERE author = ?
                            """, data)
    result = query.fetchall()
    # Finalizes the connection with the database.
    connection.close()
    return result

def assign_tags(tags, author, post_id):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Creates all the entries for each tag and 
    # inserts them in the tags table with the given information.
    data = [(i, author, post_id) for i in tags]
    cursor.executemany("""
                        INSERT INTO tags VALUES (?, ?, ?)
                        """, data)
    # Commit changes and finalizes the connection with the database.
    connection.commit()
    connection.close()

def remove_tags(tags, author, post_id):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Removes all the entries for tags table that match the given information.
    data = [(i, author, post_id) for i in tags]
    cursor.executemany("""
                        DELETE FROM tags WHERE tag = ? AND author = ? AND post_id = ?
                        """, data)
    # Commit changes and finalizes the connection with the database.
    connection.commit()
    connection.close()

def all_tags():
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries all the tags from tags table.
    query = cursor.execute("""
                            SELECT DISTINCT tag FROM tags
                            """)
    result = query.fetchall()
    # Finalizes the connection with the database.
    connection.close()
    return result

def tags_from_post(author, post_id):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries all the tags from a given post.
    data = (author, post_id)
    query = cursor.execute("""
                            SELECT tag FROM tags WHERE author = ? AND post_id = ?
                            """, data)
    result = query.fetchall()
    # Finalizes the connection with the database.
    connection.close()
    return result

def search_tag(tag):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries all the tags from a given post.
    data = (tag, )
    query = cursor.execute("""SELECT * FROM posts WHERE (author, id) IN (SELECT author, post_id FROM tags WHERE tag = ?)
                            """, data)
    result = query.fetchall()
    # Finalizes the connection with the database.
    connection.close()
    return result


from flask import Flask, request, jsonify

app = Flask(__name__)

@app.get("/posts/<name>")
def get_posts_user(name):
    result = posts_from_user(name)
    return jsonify(result)

@app.get("/tags/<tag>")
def get_posts_tags(tag):
    result = search_tag(tag)
    return jsonify(result)

@app.post("/posts")
def add_posts():
    if request.is_json:
        post = request.get_json()
        create_post (post[0], post[1], post[2], post[3])
        return jsonify(post), 201
    return {"error": "Request must be JSON"}, 415
