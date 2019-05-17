(function() {

    const notifBtn  = document.querySelector("#notifMenu")
          notifList = document.querySelector("#notifList");

    let notifNum    = document.querySelector("#numOfNewNotif"),
        numNew      = 0,
        message     = "",
        list        = "",
        notifArr    = [];

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

                console.log(data);
                notifNum.classList.add("red");
                numNew += 1;
                notifNum.textContent  = numNew;

                addNotif(data);
                notifList.innerHTML = list;

                notifArr.push(data)

                openNotifs(notifArr);
            }));
    }
    
    startPolling();

    fetch("/requests/get-notification-data")
            .then(res => res.json())
                .then(data => {
                    console.log(data);

                    for(let notif of data) {
                        console.log(notif)

                        if(notif.new === true) {
                            numNew += 1;
                            notifNum.textContent  = numNew;
                            console.log(numNew);
                        }

                        if(numNew > 0) {
                            notifNum.classList.add("red");
                        } else {
                            notifNum.classList.remove("red");
                        }

                        
                        addNotif(notif);
                    }
                    if(list === "") {
                        list = "<li>You have no new notifications</li>";
                    }
                    notifList.innerHTML = list;
                    
                    openNotifs(data);
                })

                function addNotif(notif) {
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

                function openNotifs(d) {
                    notifBtn.addEventListener("click", () => {
                        fetch("/requests/handle-notifications", {
                            method  : "PUT",
                            headers : {"Content-Type": "Application/json"},
                            body    : JSON.stringify(d)
                        })
    
                        notifNum.classList.remove("red");
                        numNew  = 0;
                        notifNum.textContent  = numNew;
                    });
                }
                
    

})();

  