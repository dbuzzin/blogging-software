
const likeBtn       = document.querySelector("#likeBtn"),
      likeNum       = document.querySelector("#likeNum"),
      dislikeNum    = document.querySelector("#dislikeNum");

let   isUserPost, isLiked, isDisliked;

function getPostData() {
    return fetch(`/posts/${postID}/getData`)
        .then(res => res.json());
}

handleLikes();

function update() {
    return getPostData()
        .then(post => {
            isUserPost  = userName === post.author;
            post.likes.forEach(like => isLiked = like === userID);
            post.dislikes.forEach(dislike => isDisliked = dislike === userID);
        })
}

function handleLikes() {
    return update().then(data => {
        if(isLiked) likeBtn.textContent = likeBtn.textContent.replace(/(like)/i, "$1d!");
        if(isDisliked) dislikeBtn.textContent = dislikeBtn.textContent.replace(/(like)/i, "$1d!");

        if(isUserPost || isLiked || isDisliked) {
            likeBtn.disabled = true;
            dislikeBtn.disabled = true;
        }
    });
}

const like = () => {
    if(!isUserPost) {
        return fetch(`/posts/${postID}/like`, {method: "PUT"})
            .then(getPostData()
                .then(post => {
                    handleLikes();
                    likeNum.textContent = post.likes.length;
                })
            );
    } else {
        console.log("You can't like your own post!");
    }
}

const dislike = () => {
    if(!isUserPost) {
        return fetch(`/posts/${postID}/dislike`, {method: "PUT"})
            .then(getPostData()
                .then(post => {
                    handleLikes();
                    dislikeNum.textContent = post.dislikes.length;
                })
            );
    } else {
        console.log("You can't dislike your own post!");
    }
}


if(loggedIn) {
    likeBtn.addEventListener("click", like);
    dislikeBtn.addEventListener("click", dislike);
}


