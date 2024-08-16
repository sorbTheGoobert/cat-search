const API_KEY = "live_gGrDplAIcUe11VmSJ9pQnIh2puASApK01sXqwPdYfRu9tUgOOpAswhhoBA2sY87D" //idk where to put this (it said me to put somewhere safe but idk where)
let limit = 1;
let firstTime = true;
let searchType = "default";

function changeSearchType() {
    if (searchType === "default") {
        document.getElementById("defaultSearch").classList.add("invisible");
    } else if (searchType === "breed") {
        document.getElementById("breedSearch").classList.add("invisible");
    }
    searchType = document.getElementById("searchType").value;
    if (searchType === "default") {
        document.getElementById("defaultSearch").classList.remove("invisible");
    } else if (searchType === "breed") {
        document.getElementById("breedSearch").classList.remove("invisible");
    }
    console.log(searchType);
}

async function getData(type) {
    try {
        let url;
        if (type === "default") {
            url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1&api_key=${API_KEY}`;
        } else if (type === "breed") {
            url = `https://api.thecatapi.com/v1/breeds`
        }
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        response = response.json();
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

function getContent() {
    while (document.getElementById("container").firstChild) {
        document.getElementById("container").removeChild(document.getElementById("container").firstChild);
    }
    if (searchType === "default") {
        if (
            document.getElementById("amount").value == undefined ||
            document.getElementById("amount").value == null ||
            document.getElementById("amount").value <= 0
        ) {
            return null;
        } else if (document.getElementById("amount").value > 100) {
            limit = 100;
        } else {
            limit = document.getElementById("amount").value;
        }
        getData(searchType)
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
    } else if (searchType === "breed") {
        if (document.getElementById("breed").value.toLowerCase() === "niko") {
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
            const image = new Image(225, 225);
            image.style.width = "600px";
            image.style.height = `600px`;
            image.style.borderRadius = "15px";
            image.src = `./assets/niko.jpeg`;
            div.appendChild(image);
            // text            
            const text = document.createElement("span");
            text.innerHTML = `This is Niko. They uhh, probably are a cat, even thought they say their not. They are 8? years old and was the chosen messiah to save a dying world. Which somehow breaks the fourth wall we, us the player is essentially a god that can talk to a game character, leading their way. Func fact: she like pancake :)`;
            text.style.textAlign = "justify";
            text.style.color = "white";
            text.style.fontSize = "24px";
            div.appendChild(text)
            // push cotainer
            document.getElementById("container").appendChild(div);
        } else if (document.getElementById("breed").value.toLowerCase() === "mewo") {
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
            const image = new Image(56, 56);
            image.style.width = "600px";
            image.style.height = `600px`;
            image.style.borderRadius = "15px";
            image.src = `./assets/mewer.jpeg`;
            div.appendChild(image);
            // text            
            const text = document.createElement("span");
            text.innerHTML = `This is Mewo. Mewo's cute. Mewo live with omori, who omor. I love mewo :). definetly not gonna lose him because of plot :)`;
            text.style.textAlign = "justify";
            text.style.color = "white";
            text.style.fontSize = "24px";
            div.appendChild(text)
            // push cotainer
            document.getElementById("container").appendChild(div);
        }
        getData(searchType)
            .then((result) => {
                result = result.filter((element) => {
                    return element["name"].includes(document.getElementById("breed").value)
                });
                // all the cat details are included in return data
                const returnData = [];
                result.forEach((element) => {
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
                    image.src = `https://cdn2.thecatapi.com/images/${element["reference_image_id"]}.jpg`;
                    div.appendChild(image);
                    // text            
                    const text = document.createElement("span");
                    text.innerHTML = `This is a ${element["name"]}. ${element["name"]}s weight is around  ${element["weight"]["metric"]} kg and they live around ${element["life_span"]} years. ${element["name"]}s originated from ${element["orgin"]}. ${element["description"]}`;
                    text.style.textAlign = "justify";
                    text.style.color = "white";
                    text.style.fontSize = "24px";
                    div.appendChild(text)
                    // push cotainer
                    returnData.push(div);
                })
                return returnData;
            }
            )
            .then((data) => {
                data.forEach((element) => {
                    document.getElementById("container").appendChild(element);
                })
            }
            )
            .catch((error) => console.log(`Error: ${error}`))
    }
}