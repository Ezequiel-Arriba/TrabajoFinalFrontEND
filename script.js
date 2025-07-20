console.log("OK")

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

/* funcion para oedenar los objetos */

function compararProductosPorIdAscendente(a, b) {
    if (a.id < b.id) {
        return 1;
    }
    if (a.id > b.id) {
        return -1;
    }
    return 0;
}

productos.sort(compararProductosPorIdAscendente);

// Array para almacenar los productos del carrito
let carrito = [];


/* funcion click en botón agregar al carrito */

function clickAgregarAlCarrito(event) {
    if (event.target.classList.contains("agregar-carrito")) {
        const idProducto = event.target.dataset.id;
        agregarAlCarrito(idProducto);
    }

}

/* Agregar los productos al HTML */

agregarProduto();

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
                <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
            </div>
            `
        );

    }

    /* delegamos el evento del boton agregar al carrito */
    divProductos.addEventListener("click", clickAgregarAlCarrito);
}

function agregarAlCarrito(idProducto) {

}
