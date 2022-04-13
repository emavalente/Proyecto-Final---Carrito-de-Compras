let listaCarrito = [];

const contenedor = document.getElementById('contProductos');
const modal = document.getElementById('contenidoCarrito');


//Recorro el array y por cada objeto pinto la card dentro del main html.
listaProductos.forEach(producto => {
    //Creo el elemento div para la card.
    const div = document.createElement('div');
    // Le asigno una clase 'product'
    div.classList.add('product');
    // inserto codigo html dentro de ese elemento div.
    div.innerHTML = `
    <div class="prod-image">
        <img src="${producto.imagen}" alt="imagen de ${producto.nombre}">
    </div>
    <div class="prod-details">
        <span>Popular</span>
        <h1>${producto.nombre}</h1>
        <p>${producto.tipo}</p>
        <p>${producto.desc}</p>
        <h4><i class="fas fa-dollar-sign">${producto.precio}</i></h4>
        <div>
            <button class="btn-agregar">Favorito</button>
            <button id="agregar${producto.id}" class="btn-agregar">Agregar al Carrito</button>
        </div>
    </div>
    `

    // asigno el div que cree como hijo del elemento 'contenedor' (contProducts)
    contenedor.appendChild(div);

    const btnAgregar = document.getElementById(`agregar${producto.id}`);
    console.log(btnAgregar);
    btnAgregar.addEventListener('click', () => {
        agregarAlCarrito(producto.id) // OJO ACA: Si paso la funcion sola sin la funcion flecha me da ERROR!. en CODER dan ejemplo de poner solo la llamada a la funcion
    });
});




// Creo una función agregarAlCarrito que busca el producto por su id y lo agrega al array del carrito.
const agregarAlCarrito = (id) => {
    const item = listaProductos.find((producto) => producto.id === id);
    listaCarrito.push(item);
    mostrarEnCarrito()
    console.log(listaCarrito);
};


const mostrarEnCarrito = () => {
    listaCarrito.forEach((producto) => {
        const div = document.createElement('div');
        div.className = ('item-carrito');
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: <i class="fas fa-dollar-sign">${producto.precio}</i></p>
            <p>Cantidad: <span id="cantidad"></span></p>
            <button class="btn-eliminar"><i class="far fa-minus-square"></i></button>
        `
        contenidoCarrito.appendChild(div);
    });
};

const btnModal = document.getElementById('btn-carrito');
const ventanaModal = document.getElementById('modal');

btnModal.addEventListener('click', () => {
    ventanaModal.classList.toggle('modal-show');
});