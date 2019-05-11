
const likeBtn       = document.querySelector("#likeBtn"),
      likeNum       = document.querySelector("#likeNum"),
      dislikeNum    = document.querySelector("#dislikeNum");

function updateLikes() {
    console.log(`/posts/${postID}/like`);
    return fetch(`/posts/${postID}/like`, {method: "PUT"});
}

function updateDislikes() {
    return fetch(`/posts/${postID}/dislike`, {method: "PUT"});
}

function getData() {
    return fetch(`/posts/${postID}/getData`)
        .then(res => res.json());
}

likeBtn.addEventListener("click", function() {
    updateLikes()
        .then(getData()
            .then(data => likeNum.textContent = data.likes)
        );
});

dislikeBtn.addEventListener("click", function() {
    updateDislikes()
        .then(getData()
            .then(data => dislikeNum.textContent = data.dislikes)
        );
});