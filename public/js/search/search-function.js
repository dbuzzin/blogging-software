import TEMPLATE from "./result-template.js";

const template              = document.createElement("div");
      template.innerHTML    = TEMPLATE

const resultsWrapper    = document.querySelector("#searchResults"),
      postTitle         = template.querySelector(".result__post-title");

function getResults(url = "") {
    return fetch(url).then(res => res.text());
};

getResults("/posts/search")
    .then(results => {

        console.log(results);

        resultsWrapper.appendChild(template);
    });