let mostRecentTimestamp = Date.now();
let url = window.location.href;
let failures = 0;

function fetchUploadsAndTimestamps(timestamp) {
    // failures++;
    // if(failures > 2) {
    //     clearTimeout
    // }
    fetch("/latest", {
        method: "POST",
        body: JSON.stringify({ "after": mostRecentTimestamp }),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
        .then(response => response.json()) // parameter; parses response
        .then(serverResponse => {
            console.log(serverResponse)
        }) // actual js obj that server sent back 
        .then(setTimeout())
        .then(bigBoi => {
            failures = 0;
            mostRecentTimestamp = bigBoi.timestamp;
            for(let imagePath of arrayOfImagePaths) {
                const imageNode = document.createElement("img");
                imageNode.src = `${imagePath}`;
                document.getElementById("images-container").insertBefore(imageNode, document.getElementById("images-container")).firstChild()
            }
        })
};

setTimeout(fetchUploadsAndTimestamps, 5000);
           // ^^^ dont need () b/c when 5 secs over, it autocalls fetch....