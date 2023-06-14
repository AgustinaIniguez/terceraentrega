const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");



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
                if (produ.id === product.id) { // si detecto dos productos con el mismo id se lo sumo en la variable cantidad
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

        Swal.fire({
            title: '¡Producto agregado!',
            text: 'El artículo se ha agregado al carrito.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'my-custom-button-class'
            },
        });

        console.log(carrito);
        cantidadContador();
        guardar();
    });

});



// Funcionalidad de búsqueda



searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredProducts = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm)
    );

    shopContent.innerHTML = "";

    filteredProducts.forEach((producto) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio} $</p>`;
        shopContent.append(content);

        let comprar = document.createElement("button");
        comprar.innerText = "comprar";
        comprar.className = "comprar";
        content.append(comprar);

        comprar.addEventListener("click", () => {
            const repetido = carrito.some((repeatProduct) => repeatProduct.id === producto.id);

            if (repetido) {
                carrito.map((produ) => {
                    if (produ.id === producto.id) {
                        produ.cantidad++;
                    }
                });
            } else {
                carrito.push({
                    id: producto.id,
                    img: producto.img,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: producto.cantidad,
                });
            }


            console.log(carrito);
            cantidadContador();
            guardar();
        });
    });
});




const guardar = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

