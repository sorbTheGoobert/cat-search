const API_KEY = "live_gGrDplAIcUe11VmSJ9pQnIh2puASApK01sXqwPdYfRu9tUgOOpAswhhoBA2sY87D" //idk where to put this (it said me to put somewhere safe but idk where)
let limit = 1;
let firstTime = true;

async function getData() {
    try {
        const url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1&api_key=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        return response.json();
    }
    catch (error) {
        console.log(error);
    }
}

function getContent() {
    if(
        document.getElementById("amount").value == undefined ||
        document.getElementById("amount").value == null ||
        document.getElementById("amount").value <= 0
    ){
        limit = 1;
    }else{
        limit = document.getElementById("amount").value;
    }
    while (document.getElementById("container").firstChild) {
        document.getElementById("container").removeChild(document.getElementById("container").firstChild);
    }
    getData()
        .then((result) => {
            // all the cat details are included in return data
            const returnData = [];
            result.forEach(element => {
                // the container
                const div = document.createElement("div");
                div.style.padding = "20px";
                div.style.borderRadius = "15px";
                div.style.backgroundColor = "wheat";
                div.style.width = "640px";
                div.style.display = "flex";
                div.style.flexWrap = "wrap";
                div.style.flexWrap = "wrap";
                div.style.flexDirection = "column";
                div.style.justifyContent = "space-around";
                div.style.alignContent = "center";
                div.style.gap = "20px"
                // the image
                const image = new Image(element.width, element.height);
                const ratio = element.width / element.height;
                image.style.width = "600px";
                image.style.height = `${600 / ratio}px`;
                image.style.borderRadius = "15px";
                console.log(element.width);
                console.log(element.height);
                image.src = element.url;
                div.appendChild(image);
                // text            
                const text = document.createElement("span");
                text.innerHTML = `This is a ${element["breeds"][0]["name"]}. ${element["breeds"][0]["name"]}s weight is around  ${element["breeds"][0]["weight"]["metric"]} kg and they live around ${element["breeds"][0]["life_span"]} years. ${element["breeds"][0]["name"]}s originated from ${element["breeds"][0]["orgin"]}. ${element["breeds"][0]["description"]}`;
                text.style.textAlign = "justify";
                text.style.color = "white";
                text.style.fontSize = "24px";
                div.appendChild(text)
                // push cotainer
                returnData.push(div);
            });
            return returnData;
        }
        )
        .then((data) => {
            data.forEach(element => {
                document.getElementById("container").appendChild(element);
            }
            )
        }
        )
        .catch((error) => console.log(`Error: ${error}`))
}

window.onload = getContent();