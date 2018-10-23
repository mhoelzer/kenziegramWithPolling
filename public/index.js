let mostRecentTimestamp = Date.now();
let url = window.location.href;
let failures = 0;
let interval = 5000;

function fetchUploadsAndTimestamps(timestamp) {
    failures++;
    if(failures > 2) {
        clearTimeout(setTimeout());
        alert("ERROR ERROR YOU'RE A FAILURE");
        return;
    }
    fetch("/latest", {
        method: "POST",
        body: JSON.stringify({ "after": mostRecentTimestamp }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json()) // parameter; parses response; the return is implicit
        .then(serverResponse => {
            console.log(serverResponse)
            return serverResponse // do returns to not get undefiend and give stuff to the other .thens
        }) // actual js obj that server sent back 
        .then(objectThing => {
            failures = 0;
            mostRecentTimestamp = objectThing.timestamp;
            const arrayOfImagePaths = objectThing.images.reverse();
            for(let imagePath of arrayOfImagePaths) {
                const imageHere = document.createElement("img");
                imageHere.src = `${imagePath}`;
                document.getElementById("photos").insertBefore(imageHere, document.getElementById("photos").firstChild)
            }
            setTimeout(fetchUploadsAndTimestamps, interval) // this goes inside so it gets done in the right order with the rest of the .then info here 
        })
};

setTimeout(fetchUploadsAndTimestamps, interval);
           // ^^^ dont need () b/c when 5 secs over, it autocalls fetch....