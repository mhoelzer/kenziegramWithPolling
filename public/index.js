let mostRecentTimestamp = Date.now();
let url = window.location.href;
let failures = 0;
let interval = 5000;

function fetchUploadsAndTimestamps(timestamp) {
    // failures++;
    // if(failures > 2) {
    //     clearTimeout
    // }
    fetch("/latest", {
        method: "POST",
        body: JSON.stringify({ "after": mostRecentTimestamp }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json()) // parameter; parses response
        .then(serverResponse => {
            console.log(serverResponse)

            
        }) // actual js obj that server sent back 
        .then(setTimeout(interval))
        // .then(bigBoi => {
        //     failures = 0;
        //     mostRecentTimestamp = bigBoi.timestamp;
        //     const arrayOfImagePaths = bigBoi.images.reverse();
        //     for(let imagePath of arrayOfImagePaths) {
        //         const imageHere = document.createElement("img");
        //         imageHere.src = `${imagePath}`;
        //         document.getElementById("photos").insertBefore(imageHere, document.getElementById("photos")).firstChild()
        //     }
        // })
};

setTimeout(fetchUploadsAndTimestamps, interval);
           // ^^^ dont need () b/c when 5 secs over, it autocalls fetch....