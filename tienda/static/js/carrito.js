/* # Código encargado de gestionar la vista del carrito de compras */
document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-container');
    const totalAmount = document.getElementById('total-amount');
    const emptyMessage = document.getElementById('empty-message');
    
    mostrarCarrito();
    
    function mostrarCarrito() {
        const carrito = obtenerCarrito();
        carritoContainer.innerHTML = '';
        const total = calcularTotal(carrito);
        totalAmount.textContent = formatearPrecio(total);

        if (carrito.length === 0) {
            emptyMessage.innerHTML = `
                <svg aria-hidden="true" title="CartSupermarketIcon" class="state_container--grid__icon" width="70" height="54" viewBox="0 0 70 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.6621 54C17.984 51.3617 13.4035 47.5184 10.6712 42.918C5.87748 34.8467 6.53805 28.9594 9.00287 22.9701C11.4936 16.916 20.5976 13.3489 27.5967 14.4789C34.5957 15.6088 39.4948 22.6359 48.9338 23.6441C58.3728 24.6523 66.0459 29.4308 68.2482 36.2645C70.5602 43.4397 66.0334 49.4376 61.9632 52.3127C61.1241 52.9054 60.2808 53.4646 59.4213 53.9862L22.6621 54Z" fill="black" fill-opacity="0.04"></path><path d="M35.3005 48.9364C35.3005 49.7283 35.057 50.5025 34.601 51.161C34.1449 51.8195 33.4966 52.3327 32.7382 52.6358C31.9797 52.9389 31.1451 53.0182 30.34 52.8637C29.5348 52.7092 28.7952 52.3278 28.2147 51.7678C27.6342 51.2078 27.2389 50.4943 27.0788 49.7176C26.9186 48.9408 27.0008 48.1357 27.315 47.404C27.6291 46.6723 28.1611 46.047 28.8437 45.607C29.5263 45.167 30.3288 44.9321 31.1498 44.9321C32.2506 44.9321 33.3064 45.354 34.0848 46.1049C34.8632 46.8559 35.3005 47.8744 35.3005 48.9364Z" fill="white" stroke="#333333" stroke-width="1.5"></path><path d="M52.9226 48.9364C52.9226 49.7283 52.6791 50.5025 52.223 51.161C51.7669 51.8195 51.1187 52.3327 50.3602 52.6358C49.6018 52.9389 48.7672 53.0182 47.9621 52.8637C47.1569 52.7092 46.4173 52.3278 45.8368 51.7678C45.2563 51.2078 44.861 50.4943 44.7009 49.7176C44.5407 48.9408 44.6229 48.1357 44.937 47.404C45.2512 46.6723 45.7832 46.047 46.4658 45.607C47.1484 45.167 47.9509 44.9321 48.7718 44.9321C49.8727 44.9321 50.9284 45.354 51.7068 46.1049C52.4853 46.8559 52.9226 47.8744 52.9226 48.9364Z" fill="white" stroke="#333333" stroke-width="1.5"></path><path d="M55.9736 34.4237L23.5129 34.4237L18.9494 16.7051L62.9397 16.7051L58.3767 32.613C58.0692 33.685 57.0888 34.4237 55.9736 34.4237ZM63.1226 16.0672L63.1223 16.0682L63.1226 16.0672Z" fill="#EEEEEE" stroke="white" stroke-width="3" stroke-linecap="square"></path><path d="M22.3503 35.9237L55.9736 35.9237C57.758 35.9237 59.3265 34.7418 59.8185 33.0266L64.5645 16.4808C64.7478 15.8418 64.2681 15.2051 63.6033 15.2051L17.0142 15.2051L22.3503 35.9237Z" stroke="#333333" stroke-width="1.5" stroke-linecap="square"></path><line x1="18.7505" y1="22.7261" x2="62.3655" y2="22.7261" stroke="#333333" stroke-width="1.5" stroke-linecap="round"></line><line x1="20.9172" y1="30.1001" x2="60.4778" y2="30.1001" stroke="#333333" stroke-width="1.5" stroke-linecap="round"></line><path d="M11.7366 4.85498C13.2886 4.98674 14.5832 6.05372 14.9604 7.51206L23.4621 40.3958C23.6466 41.1092 24.3109 41.6098 25.073 41.6098H55.057" stroke="#333333" stroke-width="1.5" stroke-linecap="round"></path><path d="M32.6701 46.9908C33.3912 49.1578 30.3097 50.1985 29.3959 47.9986C28.8517 46.6812 26.9448 41.6094 26.9448 41.6094H30.5274H34.11C34.11 41.6094 31.7269 44.1607 32.6701 46.9908Z" fill="white"></path><path d="M32.6701 46.9908C33.3912 49.1578 30.3097 50.1985 29.3959 47.9986C28.8517 46.6812 26.9448 41.6094 26.9448 41.6094H30.5274H34.11C34.11 41.6094 31.7269 44.1607 32.6701 46.9908Z" stroke="#333333" stroke-width="1.5"></path><path d="M50.2922 46.9908C51.0132 49.1578 47.9318 50.1985 47.018 47.9986C46.4738 46.6812 44.5669 41.6094 44.5669 41.6094H48.1495H51.732C51.732 41.6094 49.3489 44.1607 50.2922 46.9908Z" fill="white"></path><path d="M50.2922 46.9908C51.0132 49.1578 47.9318 50.1985 47.018 47.9986C46.4738 46.6812 44.5669 41.6094 44.5669 41.6094H48.1495H51.732C51.732 41.6094 49.3489 44.1607 50.2922 46.9908Z" stroke="#333333" stroke-width="1.5"></path><path d="M3.31856 2.04498C2.3138 1.95968 1.42759 2.67631 1.33917 3.64561C1.25075 4.61492 1.9936 5.46984 2.99837 5.55514L10.8275 6.21979C11.1928 6.2508 11.5151 5.99021 11.5473 5.63774L11.751 3.404C11.7832 3.05152 11.513 2.74064 11.1477 2.70962L3.31856 2.04498Z" fill="white" stroke="#333333" stroke-width="1.5" stroke-linecap="round"></path><path d="M33.4013 35.9175L28.1064 15.3804" stroke="#333333" stroke-width="1.5" stroke-linecap="round"></path><path d="M45.3417 35.9175L40.0469 15.3804" stroke="#333333" stroke-width="1.5" stroke-linecap="round"></path><path d="M51.9871 15.3804L57.1754 35.5044" stroke="#333333" stroke-width="1.5" stroke-linecap="round"></path><path d="M69.6677 52.9404H9.79736" stroke="#333333" stroke-width="1.5"></path><path d="M29.8208 5.44531L35.1403 9.85297" stroke="#333333" stroke-width="1.5" stroke-linecap="round"></path><path d="M51.1311 5.44531L45.8116 9.85297" stroke="#333333" stroke-width="1.5" stroke-linecap="round"></path><path d="M40.4758 0.901855V8.4523" stroke="#333333" stroke-width="1.5" stroke-linecap="round"></path></svg>
                <h4></h4>
                <h4>¡Tu carrito está vacío!</h4>
                <a href="/">volver al inicio</a>
            `;
        } else {
            emptyMessage.innerHTML = '';
            carrito.forEach(item => {
                const card = crearCardCarrito(item);
                carritoContainer.appendChild(card);
            });
        }
    }

    function crearCardCarrito(item) {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'p-2');
        
        card.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.foto}" class="me-3" style="width: 80px;">
                <div class="flex-grow-1">
                    <h5>${item.nombre}</h5>
                    <p>${formatearPrecio(item.precio)}</p>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-primary btn-sm btn-decrementar" data-id="${item.id}">-</button>
                    <span class="mx-2">${item.cantidad}</span>
                    <button class="btn btn-outline-primary btn-sm btn-incrementar" data-id="${item.id}">+</button>
                    <button class="btn btn-outline-danger btn-sm btn-eliminar ms-3" data-id="${item.id}">🗑</button>
                </div>
            </div>
        `;
        return card;
    }

    function formatearPrecio(precio) {
        const formatter = new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
        return formatter.format(precio);
    }
    
    
    carritoContainer.addEventListener('click', event => {
        const id = event.target.dataset.id;
        if (event.target.classList.contains('btn-incrementar')) incrementarCantidad(id);
        if (event.target.classList.contains('btn-decrementar')) decrementarCantidad(id);
        if (event.target.classList.contains('btn-eliminar')) eliminarProducto(id);
    });
    
    function obtenerCarrito() {
        return localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    }
    
    function calcularTotal(carrito) {
        return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    }
    
    function formatearPrecio(precio) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precio);
    }
    
    function incrementarCantidad(id) {
        let carrito = obtenerCarrito();
        const producto = carrito.find(item => item.id === id);
        producto.cantidad++;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
    
    function decrementarCantidad(id) {
        let carrito = obtenerCarrito();
        const producto = carrito.find(item => item.id === id);
        if (producto.cantidad > 1) {
            producto.cantidad--;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        }
    }
    
    function eliminarProducto(id) {
        let carrito = obtenerCarrito();
        const index = carrito.findIndex(item => item.id === id);
        if (index !== -1) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        }
    }
});