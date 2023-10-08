function endpoint(s) {
    return 'http://localhost:5000' + s;
};

async function getLogin(name, password) {
    const res = await fetch(endpoint(`/user/${name}/login/${password}`));
    const json = await res.json();
    if (!res.ok) {
        throw json.error
    }
    return json;
}

async function getAllPosts() {
    const res = await fetch(endpoint('/posts'));
    const json = await res.json();
    if (!res.ok) {
        throw res;
    }
    return json;
}

async function getUserPosts(name) {
    const res = await fetch(endpoint(`/posts/user/${name}`))
    const json = await res.json();
    if (!res.ok) {
        throw res;
    }
    return json;
}

function getTaggedPosts(tags) {
    if (typeof(tags) == 'string') {
        return fetch(endpoint(`/posts/tags/${tags}`)).then(res => res.json());
    }
    else {
        const str = tags.map(x => String(x)).join(',');
        return fetch(endpoint(`/posts/tags/${str}`)).then(res => res.json());
    }
}

function getFilteredPosts(tags_t, tags_f) {
    let str = '/posts/tags/';
    if (typeof tags_t === 'string') str += tags_t
    else {
        str += tags_t.map(x => String(x)).join(',') + '/';
    }
    if (typeof tags_f === 'string') str += tags_f;
    else {
        str += tags_f.map(x => String(x)).join(',');
    }

    return fetch(endpoint(str)).then(res => res.json());
}

function getTagsFromPost(author, post_id) {
    return fetch(endpoint(`/tags/${author}/${post_id}`)).then(res => res.json());
}

async function createNewUser(name, pass) {
    const json = [name, pass];
    const res = await fetch(new Request(endpoint('/user'), {
        headers: new Headers({'content-type': 'application/json'}),
        method: ['POST'],
        body: JSON.stringify(json),
        
    }))
    if (!res.ok) throw res;
    return await res.json();


}

export {
    endpoint,
    getLogin,
    getUserPosts,
    getAllPosts,
    getTaggedPosts,
    getFilteredPosts,
    getTagsFromPost,
    createNewUser
}