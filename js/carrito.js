const pintarCarrito = ()=> {

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class = "modal-header-tittle">Carrito</h1>
        `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", ()=> {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);


    carrito.forEach((product) => {
        let carritoContent = document.createElement("div"); // Primero recorro el carrito con forEach
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = ` 
            <img src = "${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <span class ="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class = "sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio}</p>
        `;

        modalContainer.append(carritoContent);
        
        let restar = carritoContent.querySelector(".restar"); // De esta variable capturame la clase restar

        restar.addEventListener("click", ()=>{
            if(product.cantidad){
                product.cantidad --;
            }
            guardar ();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");

        sumar.addEventListener("click", ()=> {
            product.cantidad ++;
            guardar();
            pintarCarrito();
        }) 
        
        
        
        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);

    });

    const total = carrito.reduce ((acc, el)=> acc + el.precio * el.cantidad,0); // el acumulador contiene el precio y la cantidad del producto

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total de su compra: ${total} $`;
    modalContainer.append(totalBuying);


    
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = ()=> {
    const foundId = carrito.find((element)=> element.id);// Buscame dentro de todos los elementos que hay en el carrito, un elemento con este id

    carrito = carrito.filter((carritoId)=> {
        return carritoId !== foundId; // Retorna todos los elementos que son distintos al id anterior 
    });

    cantidadContador();
    guardar();
    pintarCarrito ();

};


const cantidadContador = ()=> {
    cantidadCarrito.style.display= "block";
    
    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

cantidadContador();