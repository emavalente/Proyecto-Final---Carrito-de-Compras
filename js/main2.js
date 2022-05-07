// DECLARACION DE VARIABLES.
let listaCarrito = [];
let contador = 0;
let subTotal = 0;
let nubeCarrito;
let nubeRecuperada;
let listaProductos = [];

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    console.log(loader);
    setTimeout(() => {
        loader.classList.toggle('loaderExit');
    }, 3000);

    // ACCIONES DEL MODAL CARRITO:
    const btnModal = document.getElementById('btn-carrito');
    const ventanaModal = document.getElementById('modal');

    //Mostrar y ocultar el modal Carrito.
    btnModal.addEventListener('click', () => {
        ventanaModal.classList.toggle('modal-show'); // toggle intercambia entre clases.
    });

    //Armado Inicial del Modal.
    const div = document.createElement('div');
    div.className = 'modalCarrito';
    div.innerHTML = `
    <div class="titulo-carrito">
        <h3>Lista de Productos</h3>
    </div>
    <hr>
    <div id="contenidoCarrito">
        <!-- Aqui se agrega la lista del carrito mediante javascript -->
    </div>
    <p class="precio-total">Subtotal: <i id="subtotal-compra" class="fas fa-dollar-sign">0</i></p>
    <div class="botonesModal">
        <button id="btn-vaciar" class="btn-agregar btn-modal">Vaciar Carrito</button>
        <button id="btn-comprar" class="btn-agregar btn-modal">Comprar</button>
    </div>
`;

    ventanaModal.appendChild(div);

    const modalCompra = document.createElement('div');
    modalCompra.className = 'modalCarrito carrito-show';
    modalCompra.innerHTML = `
    <div class="titulo-carrito">
        <h3>Compra a realizar</h3>
    </div>
    <hr>
    <h3> Seleccionar medio de pago:</h3>
    <div>
    <i class="fas fa-money-check-alt">Pago Virtual</i>
    <i class="fas fa-credit-card">Tarjeta de crédito</i>
    </div>
    <p class="precio-total">Precio total: <i id="total-compra" class="fas fa-dollar-sign">0</i></p>
    <div class="botonesModal">
        <button id="btn-volver" class="btn-agregar btn-modal">Volver</button>
        <button id="btn-fincompra" class="btn-agregar btn-modal">Finalizar Compra</button>
    </div>
    `;

    ventanaModal.appendChild(modalCompra);


    //Boton Vaciar Carrito.
    const btnVaciar = document.getElementById('btn-vaciar');
    btnVaciar.addEventListener('click', vaciarCarrito);


    //Boton Comprar.
    const btnComprar = document.getElementById('btn-comprar');
    btnComprar.addEventListener('click', () => {
        div.classList.toggle('carrito-show');
        modalCompra.classList.toggle('carrito-show');
    });

    //Boton Volver.
    const btnVolver = document.getElementById('btn-volver');
    btnVolver.addEventListener('click', () => {
        div.classList.toggle('carrito-show');
        modalCompra.classList.toggle('carrito-show');
    });



    // MOSTRAR PRODUCTOS EN PANTALLA: Utilizo fetch para llamar al archivo .json y por cada objeto pinto la card dentro del main html.
    const contenedor = document.getElementById('contProductos');
    const modal = document.getElementById('contenidoCarrito');

    fetch('./productos.json')
        .then(responce => responce.json())
        .then((data) => {
            console.log(data);
            listaProductos = data;
            data.forEach((producto) => {
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
        `;
                // Asigno el div que cree como hijo del elemento 'contenedor' (contProducts).
                contenedor.appendChild(div);

                // Creo un evento para cada boton Agregar al Carrito.
                const btnAgregar = document.getElementById(`agregar${id}`);
                btnAgregar.addEventListener('click', () => {
                    // Llamo a la función agregarAlCarrito.
                    agregarAlCarrito(id);
                });
            });
        });


    // RECUPERAR DATOS DE STORAGE. Si storage tiene algo
    if (localStorage.getItem('carrito') !== null) {
        recuperarCarrito();
        mostrarEnCarrito();
        contadorCarrito();
        calcularSubTotal();
    };
});