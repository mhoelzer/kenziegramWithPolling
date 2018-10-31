let mostRecentTimestamp = Date.now();
let url = window.location.href;
let failures = 0;
let interval = 5000;

function fetchUploadsAndTimestamps(timestamp) {
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
        .catch(fails => {
            failures++;
            if(failures === 1) {
                console.log(`failure #${failures}`);
                alert("1 error so far");
                setTimeout(fetchUploadsAndTimestamps, interval);
                // return
            } else if(failures === 2) {
                console.log(`failure #${failures}`);
                alert(`You know what they say: fool me once, strike one... but fool me twice... strike three" ~Michael Scott`);
                document.body.textContent = "ERROR ERROR YOU'RE A FAILURE";
                // return;
            }
        })
};

setTimeout(fetchUploadsAndTimestamps, interval);
           // ^^^ dont need () b/c when 5 secs over, it autocalls fetch....