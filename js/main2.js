const listaProductos = [{
        id: 1,
        imagen: "./img/productos/chica/drives/jaminabox_18/jaminabox_18_frente_claro.png",
        nombre: "Jaminabox-18",
        tipo: "Overdrive",
        precio: 17500,
        desc: "Es un pedal de overdrive...",
        cantidad: 0
    },
    {
        id: 2,
        imagen: "./img/productos/chica/drives/tsunami_9/tsunami_9_frente.png",
        nombre: "Tsunami-9",
        tipo: "Overdrive",
        precio: 15500,
        desc: "Es un pedal de overdrive...",
        cantidad: 0
    },
    {
        id: 3,
        imagen: "./img/productos/chica/drives/dragon_71/the_dragon_71_frente.png",
        nombre: "Dragon-71",
        tipo: "Distorsión",
        precio: 17500,
        desc: "Es un pedal de distorsion...",
        cantidad: 0
    },
    {
        id: 6,
        imagen: "./img/productos/chica/modulaciones/spirit_92/spirit_92_frente.png",
        nombre: "Spirit-92",
        tipo: "Chorus",
        precio: 16800,
        desc: "Es un pedal de chorus...",
        cantidad: 0
    },
    {
        id: 7,
        imagen: "./img/productos/chica/modulaciones/pulstar_43/pulstar_43_frente.png",
        nombre: "Pulstar-43",
        tipo: "Trémolo",
        precio: 15500,
        desc: "Es un pedal de trémolo...",
        cantidad: 0
    },
    {
        id: 8,
        imagen: "./img/productos/chica/modulaciones/cosmos_vibe/cosmos_vibe_13-_frente.png",
        nombre: "Cosmovibe-13",
        tipo: "Modulación",
        precio: 21000,
        desc: "Es un pedal de modulación mixto...",
        cantidad: 0
    },
    {
        id: 9,
        imagen: "./img/productos/chica/modulaciones/spiral_48/spiral_48_frente.png",
        nombre: "Spiral-48",
        tipo: "Phaser",
        precio: 16700,
        desc: "Es un pedal de phaser...",
        cantidad: 0
    },
    {
        id: 10,
        imagen: "./img/productos/chica/modulaciones/voices_2/voices_2_frente.png",
        nombre: "Voices-2",
        tipo: "Auto-Wha",
        precio: 15800,
        desc: "Es un pedal de filtro...",
        cantidad: 0
    },
];

// DECLARACION DE VARIABLES.

let listaCarrito = [];
let contador = 0;
let subTotal = 0;
let nubeCarrito;
let nubeRecuperada;

//DECLARACION DE FUNCIONES.

// Creo una función agregarAlCarrito que busca el producto por su id y lo agrega al array del carrito.
const agregarAlCarrito = (id) => {
    // Recorre el array y trae el elemento que tenga un id que coincida con el id del producto seleccionado.
    let item = listaProductos.find((producto) => producto.id === id);
    console.log(item);
    // Busco en el carrito si existe un elemento de id igual al que saque de listaProductos.
    let itemCarrito = listaCarrito.find((producto) => producto.id === item.id);
    console.log(itemCarrito);
    // Si el elemento existe en el carrito, solo cambia su cantidad y sino agrega uno nuevo.
    if (itemCarrito) {
        itemCarrito.cantidad++;
        actualizarCarrito();
    } else {
        // Agrega el item nuevo al array del carrito y sumo 1 a la cantidad del producto.
        listaCarrito.push(item);
        // Busco el producto que se agrego en la listaCarrito y pongo su cantidad en 1.
        itemCarrito = listaCarrito.find((producto) => producto.id === id);
        itemCarrito.cantidad = 1;
        // Muestro el item en el modal.
        mostrarEnCarrito();
    };
    // Muestro la cantidad de productos.
    contadorCarrito();
    calcularSubTotal();
    guardarCarrito()
};


// Creo una función que cuenta la cantidad de items agregados al carrito.
const contadorCarrito = () => {
    const contadorItems = document.getElementById('contador');
    //Recorro el array del carrito y sumo todas las cantidades.
    contador = listaCarrito.reduce((acc, el) => acc + el.cantidad, 0);
    contadorItems.innerText = contador;
};


// Creo una Funcion para mostrar los items que existen en el array del carrito dentro del modal.
const mostrarEnCarrito = () => {
    // Borro el modal para evitar duplicados.
    modal.innerHTML = ``;
    // Recorro el array listaCarrito y pinto cada elemento.
    listaCarrito.forEach((producto) => {
        let {
            id,
            imagen,
            nombre,
            precio,
            cantidad
        } = producto;
        const div = document.createElement('div');
        div.className = ('item-carrito');
        div.setAttribute("id", `item${id}`); // setAttribute(type, value) me permite asignarle un atributo.
        div.innerHTML = `
                    <div class="img-item">
                        <img src="${imagen}">
                    </div>
                    <div class="desc-item">
                        <p>${nombre}</p>
                        <p>Precio: <i class="fas fa-dollar-sign">${precio}</i></p>
                        <p>Cantidad: <span id="cantidad">${cantidad}</span></p>
                    </div>
                    <div class="btn-item">
                        <button id= "btn-eliminar${id}" class="btn-eliminar"><i class="far fa-minus-square"></i></button>
                    </div>
                `;

        modal.appendChild(div);


        // Le asigno un evento al boton eliminar de cada elemento.
        const btneliminar = document.getElementById(`btn-eliminar${id}`);
        btneliminar.addEventListener('click', () => {
            eliminarDelCarrito(id);
            calcularSubTotal();
        });
    });
};


// Creo una función eliminarDelCarrito que busca el producto por su id y lo elimina del array del carrito.
const eliminarDelCarrito = (id) => {
    let item = listaCarrito.find((producto) => producto.id === id);
    let indiceDeItem = listaCarrito.indexOf(item);
    // Si el producto tiene una cantidad mayor a 1 solo se resta -1 en su cantidad.
    if (item.cantidad > 1) {
        // resto -1 a la cantidad.
        item.cantidad -= 1;
        actualizarCarrito();
    } else {
        // reinicio la cantidad a 0 y elimino el item total indicado en el array del carrito.
        item.cantidad = 0;
        listaCarrito.splice(indiceDeItem, 1);
        const itemHtml = document.getElementById(`item${id}`);
        itemHtml.remove();
        actualizarCarrito();
    };
    // Muestro la cantidad de productos.
    contadorCarrito();
    guardarCarrito();
};


// Creo una función que actualiza el carrito de ser necesario.
const actualizarCarrito = () => {
    modal.innerHTML = ``;
    listaCarrito.forEach((producto) => {
        mostrarEnCarrito()
    });
};


// Creo una función que calcula el costo total del carrito. FALTA ESTO!
const calcularSubTotal = () => {
    subTotal = listaCarrito.reduce((acc, el) => acc + (el.cantidad * el.precio), 0);
    console.log(subTotal);
    const totalModal = document.getElementById('subtotal-compra');
    totalModal.innerText = subTotal;
};


// Creo una función para vaciar el carrito.
const vaciarCarrito = () => {
    // Condiciono el estado del array listaCarrito.
    if (listaCarrito.length > 0) {
        // Reinicio el array del carrito.
        listaCarrito = [];
        // Actualizo el modal del carrito.
        actualizarCarrito();
        // Reinicio el contador del carrito.
        contadorCarrito();
        // Reinicio el subTotal
        calcularSubTotal();
        // Limpio el localStorage.
        localStorage.clear();
        //Muestro mensaje de listo.
        Swal.fire({
            title: 'Vaciaste el Carrito',
            text: 'Todos tus productos se han quitado',
            icon: 'success',
            backdrop: true,
            allowOutsideClick: false,
            confirmButtonText: 'OK'
        })
        console.log(listaCarrito);
    } else {
        // Muestro mensaje de advertencia.
        Swal.fire({
            title: 'Atención',
            text: 'El carrito no contiene productos',
            icon: 'warning',
            showConfirmButton: false,
            timer: '3000'
        })
    }
};


// GUARDAR Y RECUPERAR DATOS DEL STORAGE
// Creo una funcion que guarda el carrito en Storage.
const guardarCarrito = () => {
    nubeCarrito = JSON.stringify(listaCarrito);
    localStorage.setItem('carrito', nubeCarrito);
};


// Creo una función que recupera los datos del Storage.
const recuperarCarrito = () => {
    nubeRecuperada = localStorage.getItem('carrito');
    console.log(nubeRecuperada);
    listaCarrito = JSON.parse(nubeRecuperada);
};



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



// MOSTRAR PRODUCTOS EN PANTALLA: Recorro el array y por cada objeto pinto la card dentro del main html.
const contenedor = document.getElementById('contProductos');
const modal = document.getElementById('contenidoCarrito');

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

// RECUPERAR DATOS DE STORAGE. Si storage tiene algo
if (localStorage.getItem('carrito') !== null) {
    recuperarCarrito();
    mostrarEnCarrito();
    contadorCarrito();
    calcularSubTotal();
};