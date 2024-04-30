import { fetchTopics, postTopic, deleteTopic } from "../api_client.mjs";

//delete topic
window.delTopic = async (id) => {
    await deleteTopic(id);

    if (!alert(`Topic with id ${id} deleted!`)) { window.location.reload(); }

    return false;
}

$(document).ready(async function () {
    // Topic manage table
    const topicsTable = $('#topics-table');

    if (topicsTable != null) {
        const topics = await fetchTopics();

        topics.forEach(topic => {
            topicsTable.append(
                `
                <tr>
                    <td>${topic._id}</td>
                    <td>${topic.topic}</td>
                    <!-- <td><a href="#" class="edit">edit..</a></td> -->
                    <td><a href="#" class="delete" onclick="delTopic('${topic._id}')">delete..</a></td>
                </tr>
                `
            )
        });
    }
});

const form = document.querySelector("#create-topic-form");

async function createTopic() {
    const formData = new FormData(form);

    try {
        const newTopic = await postTopic(
            formData.get("topic"),
        );
        alert(`Topic ${newTopic.topic} created!`);
    } catch (err) {
        alert(`Could not add topic: ${err}`);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    createTopic();
});