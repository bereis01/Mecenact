import sqlite3

# Parameters.
db_path = 'BuildingApi/db/mecenact.db'

# Function to convert images to the appropriate format (BLOB).
def image_conversion(file_path):
    with open(file_path, 'rb') as image:
        image_converted = image.read()
    return image_converted

# Function to convert images from the appropriate format (BLOB).
def image_retrieval(file_path, blob_data):
    with open(file_path, 'wb') as image:
        image.write(blob_data)

# Database interface.
def create_user(username, password):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Inserts a new entry in the users table with the given information.
    data = (username, password, 0)
    try:
        cursor.execute("""
                        INSERT INTO users VALUES (?, ?, ?)
                        """, data)
    except sqlite3.Error:
        return -1
    finally:
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
    try:
        cursor.execute("""
                        DELETE FROM users WHERE username = ?
                        """, data)
    except sqlite3.Error:
        return -1
    finally:
        # Commit changes and finalizes the connection with the database.
        connection.commit()
        connection.close()
    
def all_users():
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries all the users from users table.
    try:
        query = cursor.execute("""
                                SELECT * FROM users
                                """)
        result = query.fetchall()
        return result
    except sqlite3.Error:
        return -1
    finally:
        # Finalizes the connection with the database.
        connection.close()

def return_user(username):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries the user with the given username from users table.
    data = (username, )
    try:
        query = cursor.execute("""
                                SELECT * FROM users WHERE username = ?
                                """, data)
        result = query.fetchall()
        return result
    except sqlite3.Error:
        return -1
    finally:
        # Finalizes the connection with the database.
        connection.close()

def create_post(author, title, image, body):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Retrieves the post count to generate post id.
    data = (author, )
    try:
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
        # Returns the tuple (author, post_id).
        return (author, post_id)
    except sqlite3.Error:
        return -1
    finally:
        # Commit changes and finalizes the connection with the database.
        connection.commit()
        connection.close()

def remove_post(author, post_id):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    connection.execute("PRAGMA foreign_keys = 1")
    cursor = connection.cursor()
    # Remove the entries of the table posts with the given author and id. 
    # Assumes the pair author, id is unique.
    data = (author, post_id)
    try:
        cursor.execute("""
                    DELETE FROM posts WHERE author = ? AND id = ?
                    """, data)
    except sqlite3.Error:
        return -1
    finally:
        # Commit changes and finalizes the connection with the database.
        connection.commit()
        connection.close()

def all_posts():
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries all the posts from posts table.
    try:
        query = cursor.execute("""
                                SELECT * FROM posts
                                """)
        result = query.fetchall()
        return result
    except sqlite3.Error:
        return -1
    finally:
        # Finalizes the connection with the database.
        connection.close()

def return_post(author, post_id):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries the posts with the given information from posts table.
    data = (author, post_id)
    try:
        query = cursor.execute("""
                                SELECT * FROM posts WHERE author = ? AND id = ?
                                """, data)
        result = query.fetchall()
        return result
    except sqlite3.Error:
        return -1
    finally:
        # Finalizes the connection with the database.
        connection.close()

def posts_from_user(author):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries the posts with the given information from posts table.
    data = (author, )
    try:
        query = cursor.execute("""
                                SELECT * FROM posts WHERE author = ?
                                """, data)
        result = query.fetchall()
        return result
    except sqlite3.Error:
        return -1
    finally:
        # Finalizes the connection with the database.
        connection.close()

def assign_tags(tags, author, post_id):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Creates all the entries for each tag and 
    # inserts them in the tags table with the given information.
    data = [(i, author, post_id) for i in tags]
    try:
        cursor.executemany("""
                            INSERT INTO tags VALUES (?, ?, ?)
                            """, data)
    except sqlite3.Error:
        return -1
    finally:
        # Commit changes and finalizes the connection with the database.
        connection.commit()
        connection.close()

def remove_tags(tags, author, post_id):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Removes all the entries for tags table that match the given information.
    data = [(i, author, post_id) for i in tags]
    try:
        cursor.executemany("""
                            DELETE FROM tags WHERE tag = ? AND author = ? AND post_id = ?
                            """, data)
    except sqlite3.Error:
        return -1
    finally:
        # Commit changes and finalizes the connection with the database.
        connection.commit()
        connection.close()

def all_tags():
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries all the tags from tags table.
    try:
        query = cursor.execute("""
                                SELECT DISTINCT tag FROM tags
                                """)
        result = query.fetchall()
        return result
    except sqlite3.Error:
        return -1
    finally:
        # Finalizes the connection with the database.
        connection.close()

def tags_from_post(author, post_id):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries all the tags from a given post.
    data = (author, post_id)
    try:
        query = cursor.execute("""
                                SELECT tag FROM tags WHERE author = ? AND post_id = ?
                                """, data)
        result = query.fetchall()
        return result
    except sqlite3.Error:
        return -1
    finally:
        # Finalizes the connection with the database.
        connection.close()

def search_tags(tags):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries all the posts that have the given tag(s).
    solution = []
    has_all = []
    try:
        for i in range (len(tags)):
            data = (tags[i], )
            query = cursor.execute("""
                                SELECT * FROM posts WHERE (author, id) IN (SELECT author, post_id FROM tags WHERE tag = ?)
                                    """, data)
            result = query.fetchall()
            if (i == 0):
                solution = result
            has_all = [value for value in result if value in solution]
            solution = has_all
        return solution
    except sqlite3.Error:
        return -1
    finally:
        # Finalizes the connection with the database.
        connection.close()

def return_password(name):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Queries the password from a given username.
    data = (name, )
    try:
        query = cursor.execute("""
                            SELECT password FROM users WHERE (username = ?)
                                """, data)
        result = query.fetchall()
        return result
    except sqlite3.Error:
        return -1
    finally:
        # Finalizes the connection with the database.
        connection.close()

def change_username(old_name, new_name):
    # Instantiates the connection and the cursor to the database.
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    # Updates the username of a given user on all tables.
    data = (new_name, old_name)
    try:
        cursor.execute("""
                    UPDATE users SET username = ? WHERE username = ?
                    """, data)
        cursor.execute("""
                    UPDATE posts SET author = ? WHERE author = ?
                    """, data)
        cursor.execute("""
                    UPDATE tags SET author = ? WHERE author = ?
                    """, data)
    except sqlite3.Error:
        return -1
    finally:
        # Commit changes and finalizes the connection with the database.
        connection.commit()
        connection.close()