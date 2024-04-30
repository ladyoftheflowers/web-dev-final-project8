import { fetchPostById } from "./api_client.mjs";

$(document).ready(async function () {
    // Topic manage table
    const postContainer = $('#post-container');
    const urlParameters = new URLSearchParams(window.location.search);
    const id = urlParameters.get("postId");

    if (postContainer != null && id != undefined) {
        const post = await fetchPostById(id);

        const title = post.title;
        const contentLines = post.desc.split(/\r?\n/);

        const content = `
        <h1 class="post-title">${title}</h1>
        <div class="post-content">
            ${
                contentLines.map(line => {
                    return(
                        `<p>${line}</p>`

                    );
                })
            }
        </div>
        `

        postContainer.html(content);
    }
});