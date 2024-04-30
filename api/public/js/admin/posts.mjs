import { fetchTopics, postPosts, fetchPostsForUser, deletePost } from "../api_client.mjs"

//delete post
window.delPost = async (id) => {
    await deletePost(id);

    if (!alert(`Post with id ${id} deleted!`)) { window.location.reload(); }

    return false;
}

$(document).ready(async function () {
    // Post create topic select
    const topicSelect = $('#topic-select');

    if (topicSelect != null) {
        const topics = await fetchTopics();

        topics.forEach(topic => {
            topicSelect.append(
                `
            <option value="${topic.topic}"><span>${topic.topic}..</span></option>
            `
            )
        });
    }

    // post manage table
    const postsTable = $('#posts-table');

    if (postsTable != null) {
        const posts = await fetchPostsForUser();

        posts.forEach(post => {
            postsTable.prepend(
                `
                <tr>
                    <td>${post._id}</td>
                    <td>${post.title}</td>
                    <td>${post.username}</td>
                    <!-- <td><a href="#" class="edit">edit..</a></td> -->
                    <td><a href="#" class="delete" onclick="delPost('${post._id}')">delete..</a></td>
                </tr>
                `
            );
        });
    }
});

// post form
const form = document.querySelector("#post-create-form");

async function createPost() {
    const formData = new FormData(form);

    try {
        const newPost = await postPosts(
            formData.get("title"),
            formData.get("desc"),
            formData.get("topic"),
            formData.get("image")
        );
        alert(`Post created!`);
    } catch (err) {
        alert(`Could not create post: ${err}`);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    createPost();
});