console.log("OK")

/* array de productos*/
const productos = [
    {
        id: "01",
        imagen: "img/botellaMcLaren.png",
        nombre: "Botella Termica McLaren F1 official",
        precio: 30000
    }
    ,
    {
        id: "02",
        imagen: "img/camistaMandaCorta.png",
        nombre: "Camiseta Manga Corta McLaren F1 official",
        precio: 50000
    }
    ,
    {
        id: "03",
        imagen: "img/hoddie.png",
        nombre: "Hoddie McLaren F1 official Negre",
        precio: 90000
    }
    ,
    {
        id: "04",
        imagen: "img/imanDeHeladeraMcLaren.webp",
        nombre: "Imán de Heladera McLaren F1 official",
        precio: 7500
    }
    ,
    {
        id: "05",
        imagen: "img/legoMclaren.webp",
        nombre: "LEGO McLaren F1 official",
        precio: 180000
    }
    ,
    {
        id: "06",
        imagen: "img/llaveroMcLaren.png",
        nombre: "Llavero McLaren F1 official",
        precio: 5000
    }
    ,
    {
        id: "07",
        imagen: "img/tazaMcLarec.png",
        nombre: "Taza McLaren F1 official",
        precio: 20000
    }
    ,
    {
        id: "08",
        imagen: "img/pinbadge Mclaren.webp",
        nombre: "Pin Badge McLaren F1 official",
        precio: 7500
    }
    ,
    {
        id: "09",
        imagen: "img/goraMcLaren.png",
        nombre: "Gora McLaren F1 official",
        precio: 50000
    }
]

/* funcion para ordenar los objetos en pro */

function compararProductosPorIdAscendente(a, b) {
    if (a.id < b.id) {
        return 1;
    }
    if (a.id > b.id) {
        return -1;
    }
    return 0;
}


// Ordenamos los productos por ID de forma ascendente

productos.sort(compararProductosPorIdAscendente);

// Array para almacenar los productos del carrito
let carrito = [];

//funcion para agregar al carrito
function agregarAlCarrito(idProducto) {

    // Verificar si el producto ya está en el carrito
    let productoEnCarrito = null;
    for (let i=-0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        productoEnCarrito.cantidad++;
    }
    else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        let productoOriginal = null;
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === idProducto) {
                productoOriginal = productos[i];
                break;
            }
        }
        carrito.push({ ...productoOriginal, cantidad: 1 });
    }
    actualizarCarritoHTML();
}

/* funcion click en botón agregar al carrito */

function clickAgregarAlCarrito(event) {
    if (event.target.classList.contains("agregar-carrito")) {
        const idProducto = event.target.dataset.id;
        agregarAlCarrito(idProducto);
    }

}


/* Agregar los productos al HTML */

function agregarProduto() {
    const divProductos = document.querySelector(".productos");

    if (!divProductos) {
        console.error("No se encontró el elemento con la clase 'productos'");
        return;
    }

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        divProductos.insertAdjacentHTML("afterbegin",
            `
            <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="producto-contenido">
                        <h3>${producto.nombre}</h3>
                        <p> ID: ${producto.id}</p>
                        <p> Precio: $${producto.precio}</p>
                    </div>
                <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito </button>
            </div>
            `
        );

    }

    /* delegamos el evento del boton agregar al carrito */
    divProductos.addEventListener("click", clickAgregarAlCarrito);
}

// Maneja el evento de clic en los botones de cantidad y eliminar del carrito.
function manejarClicCarrito(evento) {
    const target = evento.target;

    if (target.classList.contains("btn-cantidad") || target.classList.contains("btn-eliminar")) {
        const productoId = target.dataset.id;
        const accion = target.dataset.action;

        if (accion === "eliminar") {
            eliminarProductoDelCarrito(productoId);
        } else if (accion === "restar") {
            restarCantidadProducto(productoId);
        } else if (accion === "sumar") {
            sumarCantidadProducto(productoId);
        }
    }
}

// Actualiza el contenido HTML del carrito de compras basado en el array 'carrito'.
function actualizarCarritoHTML() {
    const carritoCompras = document.querySelector(".carrito");

    if (!carritoCompras) {
        console.error("Error: No se encontró el contenedor con la clase 'CarritoCompras'. Asegúrate de que exista en tu HTML.");
        return;
    }

    // Limpiar el contenido actual del carrito y recrear la estructura base
    carritoCompras.innerHTML = `
        <h2>Tu Carrito de Compras</h2>
        <ul class="lista-carrito"></ul>
        <p class="total-carrito"></p>
        <p class="cantidad-carrito"></p>
    `;
    
    const listaCarrito = carritoCompras.querySelector(".lista-carrito");
    let totalPagar = 0;
    let cantidadProductosUnicos = 0;

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        for (let i = 0; i < carrito.length; i++) {
            const item = carrito[i];
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.nombre} - $${item.precio} x ${item.cantidad}</span>
                <div>
                    <button class="btn-cantidad" data-id="${item.id}" data-action="restar">-</button>
                    <button class="btn-cantidad" data-id="${item.id}" data-action="sumar">+</button>
                    <button class="btn-eliminar" data-id="${item.id}" data-action="eliminar">x</button>
                </div>
            `;
            listaCarrito.appendChild(li);
            totalPagar += item.precio * item.cantidad;
            cantidadProductosUnicos++;
        }
    }

    // Mostrar el total a pagar y la cantidad de productos
    carritoCompras.querySelector(".total-carrito").textContent = `Total a pagar: $${totalPagar}`;
    carritoCompras.querySelector(".cantidad-carrito").textContent = `Productos en carrito: ${cantidadProductosUnicos}`;

    // Configurar el Event Listener para los botones de cantidad y eliminar
    const nuevoListaCarrito = carritoCompras.querySelector(".lista-carrito");
    nuevoListaCarrito.addEventListener("click", manejarClicCarrito);
}

// Suma una unidad a la cantidad de un producto en el carrito.
function sumarCantidadProducto(idProducto) {
    let productoEnCarrito = null;

    
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        actualizarCarritoHTML(); 
    }
}

// Resta una unidad a la cantidad de un producto en el carrito.
function restarCantidadProducto(idProducto) {
    let productoEnCarrito = null;
    
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad--;
        if (productoEnCarrito.cantidad <= 0) {
            eliminarProductoDelCarrito(idProducto); 
        } else {
            actualizarCarritoHTML(); 
        }
    }
}

// Elimina completamente un producto del carrito.
function eliminarProductoDelCarrito(idProducto) {
    
    const nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].id !== idProducto) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    carrito = nuevoCarrito;
    actualizarCarritoHTML();
}



agregarProduto(); 
actualizarCarritoHTML(); 