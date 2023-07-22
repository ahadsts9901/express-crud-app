function createPost(event) {
    event.preventDefault()
    let postTitle = document.querySelector("#title").value;
    let postText = document.querySelector("#text").value;

    // baseUrl/api/v1/post
    axios.post(`/api/v1/post`, {
        title: postTitle,
        text: postText
    })
        .then(function (response) {
            console.log(response.data);
            getAllPost();
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector(".result").innerHTML = "error in post submission"
        })
}

function getAllPost() {
    // baseUrl/api/v1/post
    axios.get(`/api/v1/posts`)
        .then(function (response) {
            const posts = response.data;
            const postContainer = document.querySelector(".result");

            postContainer.innerHTML = "";

            posts.forEach(function (post) {
                const postElement = document.createElement("div");
                // postElement.classList.add("post");

                const titleElement = document.createElement("h2");
                titleElement.textContent = post.title;

                const textElement = document.createElement("p");
                textElement.textContent = post.text;

                // Append title and text elements to the post element
                postElement.appendChild(titleElement);
                postElement.appendChild(textElement);

                // Append the post element to the container
                postContainer.appendChild(postElement);
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            // You can display an error message if needed.
        });
}
