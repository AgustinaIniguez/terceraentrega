const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
    let content = document.createElement("div"); // creo un elemento
    content.className = "card"; 
    content.innerHTML = ` 
    <img src = "${product.img}">
    <h3>${product.nombre}</h3>
    <p>${product.precio} $</p>
    `; // le asigno html

    shopContent.append(content); // lo pego en algun lado

    let comprar = document.createElement("button"); // creo un elemento
    comprar.innerText = "comprar"; // le asigno texto
    comprar.className = "comprar"; 

    content.append(comprar); // lo pego en algun lugar


    // Cuando el usuario haga click en el boton, en el carrito se van a ir agregando(push) los elementos
    comprar.addEventListener("click", () => {

        const repetido = carrito.some((repeatProduct) => repeatProduct.id === product.id); // Busco un producto repetido a traves del id


        if (repetido) {
            carrito.map((produ) => {
                if (produ.id === produ.id) { // si detecto dos productos con el mismo id se lo sumo en la variable cantidad
                    produ.cantidad++;
                }
            })
        } else {
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }
        console.log(carrito);
        cantidadContador ();
        guardar ();
    });

});



const guardar = ()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

