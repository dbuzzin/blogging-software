(function() {

    const notifBtn  = document.querySelector("#notifMenu")
          notifList = document.querySelector("#notifList");

    let notifNum    = document.querySelector("#numOfNewNotif");

    notificationData = {
        number  : 0,

    }

    function timeoutPromise(ms, promise) {
        return new Promise((resolve, reject) => {
            console.log("Polling Started...");
            const timeoutID = setTimeout(() => {
                console.log("Request Timeout")
                startPolling();
            }, ms);
            promise.then(res => {
                clearTimeout(timeoutID);
                resolve(res);
                startPolling();
            }, err => {
                clearTimeout(timeoutID);
                reject(err);
            });
        })
    };
    
    function startPolling() {
        return timeoutPromise((2 * 60 * 1000), fetch(`/requests/handle-notifications`)
        .then(res => res.json())
            .then(data => {
                notifNum.classList.add("red");
                ++parseInt(notifNum.textContent);
            }));
    }
    
    startPolling();


    notifBtn.addEventListener("click", () => {
        fetch("/requests/get-notification-data")
            .then(res => res.json())
                .then(data => {
                    let message = "";
                    let list    = "";

                    for(let notif of data) {
                        let time    = new Date(notif.origin.created.fulldate),
                            timeAgo = Math.round((new Date() - time) / 1000 / 60) + "m ago";
                        if(notif.isType === "Post") {
                            message = `There is a new ${notif.isType.toLowerCase()} in ${notif.origin.blogurl}`
                            
                            let item = `
                                <a href="${notif.url}">
                                    <li>
                                        <div>${message}</div>
                                        <div>${timeAgo}</div>
                                    </li>
                                </a>
                            `
                            list += item;
                        }
                    }
                    notifList.innerHTML = list;
                })
    })

})();

  