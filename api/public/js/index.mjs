import {fetchPosts, fetchTopics} from './api_client.mjs'

$(document).ready(function () {

  $('.menu-toggle').on('click', function () {
    $('.topnav').toggleClass('showing');
    $('.topnav ul').toggleClass('showing');
  });

  getAndSetPosts();
  getAndSetSidebarTopics();
})

ClassicEditor.create(document.querySelector('#body'), {
  toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    ]
  }
})
  .catch(error => {
    console.log(error);
  });

// api-client
async function getAndSetPosts() {
  const posts = await fetchPosts();
  console.log("posts: " + posts);


  posts.forEach(post => {
    const date = new Date(post.createdAt);

    $('.main-content').prepend(
      `
      <div class="post clearfix">
          <img src="${post.image} " alt="poorthings" class="post-image">
          <div class="post-preview">
            <h2><a href="single.html?postId=${post._id}">${post.title}</a></h2>
            <i class="far fa-user"></i>
            <span>${post.username}</span>
            &nbsp;
            <i class="fa-regular fa-calendar"></i>
            <span>${date.toLocaleString()}</span>
            <div class="preview-text">
              <p>
              ${post.desc}
              </p>
            </div>
            <a href="single.html?postId=${post._id}" class="btn read-more">Read more...</a>
          </div>
        </div>
      `
    )
  });
}

async function getAndSetSidebarTopics() {
  const topics = await fetchTopics();

  topics.forEach(topic => {
    $('#sidebar-topics-table').append(
      `
      <li><a href="#">${topic.topic}</a></li>
      `
    );
  });
}