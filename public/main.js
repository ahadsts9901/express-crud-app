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
            Swal.fire({
                icon: 'success',
                title: 'Post Deleted',
                timer: 1500,
                showConfirmButton: false
            });
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
    Swal.fire({
        title: 'Enter Password',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonColor: "#212121",
        confirmButtonText: 'Delete',
        confirmButtonColor: "#212121",
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
            if (password === '48597555') {
                // If the password is correct, send the DELETE request
                return axios.delete(`/api/v1/post/${postId}`)
                    .then(response => {
                        console.log(response.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Post Deleted',
                            timer: 1500,
                            showConfirmButton: false
                        });
                        // If the post was deleted successfully, re-render the posts
                        renderPost();
                    })
                    .catch(error => {
                        console.log(error.data);
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to delete post',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    });
            } else {
                // If the password is incorrect, display an error message
                return Swal.fire({
                    icon: 'error',
                    title: 'Invalid Password',
                    text: 'Please enter correct password',
                    showConfirmButton: false
                });
            }
        }
    });
}


// refresh page

document.addEventListener("readystatechange", function() {
    if (document.readyState === "complete") {
        renderPost();
    }
});
