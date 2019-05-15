(function() {

    const titleInput    = document.querySelector("#titleInput"),
          bodyInput     = document.querySelector("#bodyInput"),
          title         = document.querySelector("#previewTitle"),
          body          = document.querySelector("#previewBody"),
          time          = document.querySelector("#previewTime");

    let date = new Date;

    time.innerHTML = `${date.formatDate()} (This will update when posted)`;

    titleInput.addEventListener("keyup", function() {
        title.innerHTML = this.value.titleCase();
        initPreview();
    });

    bodyInput.addEventListener("keyup", function() {
        body.innerHTML = this.value;
        initPreview();
    });

    function initPreview() {
        if(titleInput.value === "") title.innerHTML = "Title Preview";
        if(bodyInput.value === "") body.innerHTML   = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                                   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                                   nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                                                   reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                                   Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                                                   deserunt mollit anim id est laborum.`;
    }

    initPreview();

})(); 


