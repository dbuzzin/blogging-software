const likeBtn       = document.querySelector("#likeBtn"),
      likeNum       = document.querySelector("#likeNum"),
      dislikeNum    = document.querySelector("#dislikeNum");


likeBtn.addEventListener("click", function() {
    updateLikes()
        .then(getPostData()
            .then(data => likeNum.textContent = data.likes)
        );
});

dislikeBtn.addEventListener("click", function() {
    updateDislikes()
        .then(getPostData()
            .then(data => dislikeNum.textContent = data.dislikes)
        );
});