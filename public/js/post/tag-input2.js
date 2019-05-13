(function() {

    const input     = document.querySelector(".tag-input"),
          hidden    = document.querySelector("#hiddenTag");
          form      = document.querySelector("#newPost");

    let tagArr      = hidden.value !== "" ? hidden.value.split(",") : [];

    let openEdit    = true;

    class Tag {
        constructor(name) {
            this.name = name;
            this.span;
            this.init();
        }
        init() {    
 
            this.create(this.span);
            this.draw(this.span);
            
            return this;
        }
        create(tag) {

                tagArr.indexOf(this.name) === -1 ? tagArr.push(this.name) : this;

                input.value = "";
                hidden.value = tagArr;
                
                tag = document.createElement("span");
                tag.innerHTML = `<span>${this.name}</span><span class="tag-cross">&#10006;</span>`;
                tag.classList.add("tagged");

                return this.span = tag;
            
        }
        draw(tag) {

            input.parentNode.insertBefore(tag, input);

            return this;

        }
    }

    initss();

    input.addEventListener("blur", function() {
        newTag(this.value);
        isEmpty();
        return this;
    });

    input.addEventListener("keypress", function(e) {
        if(e.which === 13) {
            if(e.repeat) return;
            e.preventDefault();
            newTag(this.value);
            isEmpty();
            return this;
        }
    });

    document.addEventListener("click", function(e) {
        if(e.target.classList.contains("tag-cross")) {
            let index = tagArr.indexOf(e.target.parentNode.firstChild.textContent)

            if(index > -1) {
                tagArr.splice(index, 1);
                e.target.parentNode.remove();
                hidden.value = tagArr.join(",");
                isEmpty();
            }
        }
        return this;
    });

    function newTag(tag) {
        if(input.value !== "") new Tag(tag);
        return this;
    }

    function isEmpty() {
        if(tagArr.length === 0) {
            hidden.removeAttribute("name");
            hidden.removeAttribute("value");
        } else {
            hidden.setAttribute("name", "post[tags]")
        }
        return this;
    }

    function initss() {
        isEmpty();
        if(tagArr.length !== 0 && openEdit) {
            tagArr.forEach(tag => {
                new Tag(tag);
                isEmpty();
            });
            openEdit = false;
        }
        return this;        
    }

})();



