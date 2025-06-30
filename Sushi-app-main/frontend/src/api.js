
import { mockData } from './mockData.js';

let currentUser = null;

function delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mockRequest(operation) {
    await delay();
    return operation();
}

export function register({ name, email, password }) {
    return mockRequest(() => {
        const user = { id: Date.now(), name, email, token: 'mock-token-' + Date.now() };
        mockData.users.push(user);
        currentUser = user;
        return user;
    });
}

export function login({ email, password }) {
    return mockRequest(() => {
        const user = mockData.users.find(u => u.email === email);
        if (!user) throw new Error('Usuario no encontrado');
        currentUser = user;
        return user;
    });
}

export function getCategories() {
    return mockRequest(() => mockData.categories);
}

export function getCategoryById(id) {
    return mockRequest(() => {
        const category = mockData.categories.find(c => c.id === parseInt(id));
        if (!category) throw new Error('Categoría no encontrada');
        return category;
    });
}

export function getMenuItems() {
    return mockRequest(() => mockData.menuItems);
}

export function getMenuItemById(id) {
    return mockRequest(() => {
        const item = mockData.menuItems.find(i => i.id === parseInt(id));
        if (!item) throw new Error('Ítem no encontrado');
        return item;
    });
}

export function getBlogPosts() {
    return mockRequest(() => mockData.blogPosts);
}

export function getBlogPostById(id) {
    return mockRequest(() => {
        const post = mockData.blogPosts.find(p => p.id === parseInt(id));
        if (!post) throw new Error('Post no encontrado');
        return post;
    });
}

export function getReservations() {
    return mockRequest(() => mockData.reservations);
}

export function getReservationById(id) {
    return mockRequest(() => {
        const reservation = mockData.reservations.find(r => r.id === parseInt(id));
        if (!reservation) throw new Error('Reserva no encontrada');
        return reservation;
    });
}

export function createReservation(data) {
    return mockRequest(() => {
        const reservation = { id: Date.now(), ...data };
        mockData.reservations.push(reservation);
        return reservation;
    });
}

export function createOrder(items) {
    return mockRequest(() => {
        const order = {
            id: Date.now(),
            items,
            userId: currentUser?.id,
            status: 'pending',
            date: new Date().toISOString()
        };
        mockData.orders.push(order);
        return order;
    });
}

export function addToCart(item) {
    return mockRequest(() => {
        const cartItem = { id: Date.now(), ...item };
        mockData.cartItems.push(cartItem);
        return cartItem;
    });
}

export function getCartItems() {
    return mockRequest(() => mockData.cartItems);
}

export function removeFromCart(id) {
    return mockRequest(() => {
        const index = mockData.cartItems.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            mockData.cartItems.splice(index, 1);
        }
        return null;
    });
}



