import { servicioAuth } from '../services/auth-service.js';

const reservationPageTemplate = document.createElement('template');
reservationPageTemplate.innerHTML = `
    <link rel="stylesheet" href="../blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="../blocks/site-header/site-header.css">
    <link rel="stylesheet" href="../blocks/reservation-form/reservation-form.css">

    <style>
        .layout-split__main {
            background-image: url('../assets/images/Main-reservation.png');
        }
        .layout-split__sidebar {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px;
        }
    </style>

    <div class="layout-split">
        <main class="layout-split__main">
            <site-header></site-header>
            <h1 class="layout-split__title">BOOK A TABLE</h1>
        </main>

        <aside class="layout-split__sidebar">
            <form class="reservation-form">
                <h2 class="reservation-form__title">RESERVATION</h2>
                <p class="reservation-form__subtitle">Secure your spot at Qitchen, where exceptional sushi and a remarkable dining experience await.</p>
                
                <input type="text" name="name" placeholder="Name" class="reservation-form__input" required>
                <input type="tel" name="phone" placeholder="Phone Number" class="reservation-form__input" required>
                <input type="email" name="email" placeholder="Email" class="reservation-form__input" required>

                <div class="reservation-form__row">
                    <input type="number" name="guests" placeholder="Guests" class="reservation-form__input" required min="1">
                    <input type="date" name="date" placeholder="Date" class="reservation-form__input" required>
                    <input type="time" name="time" placeholder="Time" class="reservation-form__input" required>
                </div>

                <button type="submit" class="reservation-form__submit-btn">RESERVE</button>
            </form>
        </aside>
    </div>
`;

class ReservationPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(reservationPageTemplate.content.cloneNode(true));
        
        this.formularioReserva = this.shadowRoot.querySelector('.reservation-form');
    }

    connectedCallback() {
        this.formularioReserva.addEventListener('submit', evento => {
            this.manejarEnvioReserva(evento);
        });
    }

    async manejarEnvioReserva(evento) {
        evento.preventDefault();

        const formData = new FormData(this.formularioReserva);
        const datos = Object.fromEntries(formData.entries());

        const token = servicioAuth.obtenerToken();
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const respuesta = await fetch('/api/reservas', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            alert(resultado.mensaje);
            this.formularioReserva.reset();
        } else {
            alert(`Error: ${resultado.mensaje || 'No se pudo enviar la solicitud.'}`);
        }
    }
}

customElements.define('reservation-page', ReservationPage);

