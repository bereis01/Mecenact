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

async function getTaggedPosts(tags) {
    if (typeof(tags) == 'string') {
        const res = await fetch(endpoint(`/posts/tags/${tags}`));
        const json = await res.json();
        return json;
    }
    else {
        const str = tags.map(x => String(x)).join(',');
        const res = await fetch(endpoint(`/posts/tags/${str}`));
        const json = await res.json();
        return json;

    }
}

async function getAllTags() {
    const res = await fetch(endpoint(`/tags`));
    const json = await res.json();
    return json.map(x => x[0]);
}

async function getFilteredPosts(tags_t, tags_f) {
    let str = '/posts/tags/';
    if (typeof tags_t === 'string') str = str.concat(tags_t)
    else {
        str = str.concat(tags_t.join(','));
    }
    if (tags_f) {
        if (typeof tags_f === 'string') str = str.concat("/", tags_f);
        else {
            str = str.concat("/", tags_f.join(','));
        }
    }

    const res = await fetch(endpoint(str));
    const json = await res.json();
    return json;
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
    getAllTags,
    getFilteredPosts,
    getTagsFromPost,
    createNewUser
}