(function() {

    const input     = document.querySelector(".tag-input"),
          hidden    = document.querySelector("#hiddenTag");
          form      = document.querySelector("#newPost");

    let tagArr      = [];

    init();

    input.addEventListener("keypress", function(e) {
        if(e.which === 13) {
            if(e.repeat) return;
            e.preventDefault();
            createTag();
            isEmpty();
        }
    });

    input.addEventListener("blur", createTag)

    function createTag() {

        let val = input.value;
        
        if(val !== "") {

            tagArr.push(val);

            input.value = "";
            hidden.value = tagArr;

            isEmpty();

            let tag = document.createElement("span");
                tag.innerHTML = `<span>${val}</span><span class="tag-cross">&#10006;</span>`;
                tag.classList.add("tagged");

                input.parentNode.insertBefore(tag, input);

                tag.querySelector(".tag-cross").addEventListener("click", function() {

                    let index = tagArr.indexOf(this.parentNode.firstChild.textContent)

                    if(index > -1) {
                        tagArr.length > 1 ? tagArr.splice(index, 1) : tagArr.pop(), isEmpty();
                        this.parentNode.remove();
                    }
                });

        }
    }

    function isEmpty() {
        if(tagArr.length === 0) {
            hidden.removeAttribute("name");
            hidden.removeAttribute("value");
        } else {
            hidden.setAttribute("name", "post[tags]")
        }
    }

    function init() {
        tagArr = hidden.value;
        isEmpty();
    }
    
})();



