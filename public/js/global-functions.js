const popupMenus    = document.querySelectorAll(".popup"),
      notifs        = document.querySelector("#notifMenu");

for(let elem of popupMenus) {
    elem.addEventListener("click", () => {
        let popup = elem.querySelector(".popBox");
            popup.classList.toggle("hid");
            popup.style.left = "0";
            popup.style.top = `${elem.offsetHeight + 10}px`;
    });
}







