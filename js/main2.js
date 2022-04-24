// DECLARACION DE VARIABLES.

let listaCarrito = [];
let contador = 0;
let subTotal = 0;
let nubeCarrito;
let nubeRecuperada;

const contenedor = document.getElementById('contProductos');
const modal = document.getElementById('contenidoCarrito');

// MOSTRAR PRODUCTOS EN PANTALLA: Recorro el array y por cada objeto pinto la card dentro del main html.
listaProductos.forEach((producto) => {
    let {
        id,
        imagen,
        nombre,
        tipo,
        precio,
        desc
    } = producto;
    //Creo el elemento div para la card.
    const div = document.createElement('div');
    // Le asigno una clase 'product'
    div.classList.add('product');
    // inserto codigo html dentro de ese elemento div.
    div.innerHTML = `
    <div class="prod-image">
        <img src="${imagen}" alt="imagen de ${nombre}">
    </div>
    <div class="prod-details">
        <span>Popular</span>
        <h1>${nombre}</h1>
        <p>${tipo}</p>
        <p>${desc}</p>
        <h4><i class="fas fa-dollar-sign">${precio}</i></h4>
        <div>
            <button id="agregar${id}" class="btn-agregar">Agregar al Carrito</button>
        </div>
    </div>
    `
    // Asigno el div que cree como hijo del elemento 'contenedor' (contProducts).
    contenedor.appendChild(div);

    // Creo un evento para cada boton Agregar al Carrito.
    const btnAgregar = document.getElementById(`agregar${id}`);
    btnAgregar.addEventListener('click', () => {
        // Llamo a la función agregarAlCarrito.
        agregarAlCarrito(id)
    });
});


// RECUPERAR DATOS DE STORAGE. Si storage tiene algo
if (localStorage.getItem('carrito') !== null) {
    recuperarCarrito();
    mostrarEnCarrito();
    contadorCarrito();
    calcularSubTotal();
};


// ACCIONES DEL MODAL CARRITO:

//Muestra y oculta el modal Carrito.
const btnModal = document.getElementById('btn-carrito');
const ventanaModal = document.getElementById('modal');

btnModal.addEventListener('click', () => {
    ventanaModal.classList.toggle('modal-show'); // toggle intercambia entre clases.
});

//Vaciar el modal Carrito.
const btnVaciar = document.getElementById('btn-vaciar');
btnVaciar.addEventListener('click', vaciarCarrito);