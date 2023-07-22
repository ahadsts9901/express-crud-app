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
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Added'
              })
            renderPost();
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector(".result").innerHTML = "error in post submission"
        })
}

function renderPost() {
    // baseUrl/api/v1/post
    axios.get(`/api/v1/posts`)
        .then(function (response) {
            let posts = response.data;
            let postContainer = document.querySelector(".result");
            postContainer.innerHTML = "";

            // Loop through the posts and create elements for each post
            posts.forEach(function (post) {
                let postElement = document.createElement("div");
                postElement.className += " post"

                let titleElement = document.createElement("h2");
                titleElement.textContent = post.title;
                postElement.appendChild(titleElement);

                let textElement = document.createElement("p");
                textElement.textContent = post.text;
                postElement.appendChild(textElement);
                postElement.dataset.postId = post.id;

                let row =  document.createElement("div")
                row.className += " space-around"

                let regards = document.createElement("p")
                regards.className += " regards"
                regards.textContent = "Regards! Muhammad Ahad"
                row.appendChild(regards)

                let edit = document.createElement("i")
                edit.className += " regards bi bi-pencil-fill"
                // edit.addEventListener("click", edit)
                row.appendChild(edit)

                let del = document.createElement("i")
                del.className += " regards bi bi-trash-fill"
                del.addEventListener("click", function(event) {
                    event.preventDefault();
                    let postId = this.parentNode.parentNode.dataset.postId;
                    deletePost(postId);
                });
                
                row.appendChild(del)

                postElement.appendChild(row)
                postContainer.appendChild(postElement);
            });
        })
        .catch(function (error) {
            console.log(error.data);
        });
}

// delete post function

function deletePost(postId) {
    // baseUrl/api/v1/post/:postId
    axios.delete(`/api/v1/post/${postId}`)
        .then(function (response) {
            console.log(response.data);
            // If the post was deleted successfully, re-render the posts
            renderPost();
        })
        .catch(function (error) {
            console.log(error.data);
        });
}

// refresh page

document.addEventListener("readystatechange", function() {
    if (document.readyState === "complete") {
        renderPost();
    }
});
