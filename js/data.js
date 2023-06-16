

let productosN = document.querySelector("#productos-data");

fetch("data.json")
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data);

        data.map((item) => {
            const content = document.createElement("div");
            content.innerHTML = `
            <h1>${item.id}</h1>
            <img src="${item.img}"></img>
            <h3>${item.p}</h3>
            `;
            productosN.append(content);
        });
    });