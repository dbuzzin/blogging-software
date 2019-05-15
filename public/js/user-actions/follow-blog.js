const followBtn = document.querySelector("#followBlog");

followBtn.addEventListener("click", function() {
    fetch(this.href, {
        method      : "PUT",
    })
});