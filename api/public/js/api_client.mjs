const api_url = "http://localhost:5000/api";
const loggedInUserName = "alinalukina"

//POSTS 
export async function fetchPosts() {
    const response = await fetch(`${api_url}/posts`);
    const posts = await response.json();
    console.log(`Fetched posts: ${posts}`);

    return posts;
}

export async function fetchPostsForUser() {
    const response = await fetch(`${api_url}/posts?user=${loggedInUserName}`);
    const posts = await response.json();
    console.log(`Fetched posts: ${posts}`);

    return posts;
}

export async function fetchPostById(id) {
    const response = await fetch(`${api_url}/posts/${id}`)
    const post = await response.json();
    console.log(`Fetched post ${id}: ${post}`);

    return post;
}

export async function postPosts(title, desc, topic, image) {
    const request = JSON.stringify({
        "username": loggedInUserName,
        "title": title,
        "desc": desc,
        "topic": topic,
        "image": image,
    });

    try {
        const response = await fetch(`${api_url}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: request,
        });
        const post = await response.json();
        console.log(`Posted post: ${post}`);
        return post;
    } catch (err) {
        console.error(`Could not create post: ${err}`);
    }
}

export async function deletePost(id) {
    const request = JSON.stringify({
        "username": loggedInUserName,
    });
    try {
        await fetch(`${api_url}/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: request
        });
    } catch (err) {
        console.error(`Could not delete post ${id}`);
    }
}


// USERS
export async function fetchUsers() {
    const response = await fetch(`${api_url}/users`);
    const users = await response.json();
    console.log(users);

    return users;
} 

export async function postUser(username, email, password, admin) {
    const request = JSON.stringify({
        "username": username,
        "email": email,
        "password": password,
        "admin": admin,
    });

    try {
        const response = await fetch(`${api_url}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: request,
        });
        const user = await response.json();
        console.log(`Posted user: ${user}`);
        return user;
    } catch (err) {
        console.error(`Could not create user: ${err}`);
    }
}

export async function deleteUser(id) {
    const request = JSON.stringify({
        "username": loggedInUserName,
    });
    try {
        await fetch(`${api_url}/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: request
        });
    } catch (err) {
        console.error(`Could not delete user ${id}`);
    }
}

// TOPICS
export async function fetchTopics() {
    const response = await fetch(`${api_url}/topics`);
    const topics = await response.json();
    console.log(`Fetched topics: ${topics}`);

    return topics;
}

export async function postTopic(topic) {
    const request = JSON.stringify({
        "username": loggedInUserName,
        "topic": topic
    });

    try {
        const response = await fetch(`${api_url}/topics`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: request,
        });
        const topic = await response.json();
        console.log(`Posted topic: ${topic}`);
        return topic;
    } catch (err) {
        console.error(`Could not create topic: ${err}`);
    }
}

export async function deleteTopic(id) {
    const request = JSON.stringify({
        "username": loggedInUserName,
    });
    try {
        await fetch(`${api_url}/topics/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: request
        });
    } catch (err) {
        console.error(`Could not delete topic ${id}`);
    }
}