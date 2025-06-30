export const mockData = {
    categories: [
        { id: 1, name: 'Sushi Rolls', description: 'Deliciosos rolls de sushi frescos', image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3' },
        { id: 2, name: 'Nigiri', description: 'Sushi tradicional japonés con pescado fresco', image_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3' },
        { id: 3, name: 'Tempura', description: 'Verduras y mariscos fritos en tempura crujiente', image_url: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?ixlib=rb-4.0.3' },
        { id: 4, name: 'Bebidas', description: 'Refrescantes bebidas japonesas', image_url: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-4.0.3' }
    ],
    menuItems: [
        { 
            id: 1, 
            name: 'California Roll', 
            price: 12.99, 
            category_id: 1, 
            description: 'Roll relleno de aguacate, pepino y cangrejo, cubierto con sésamo', 
            image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3'
        },
        { 
            id: 2, 
            name: 'Salmón Nigiri', 
            price: 8.99, 
            category_id: 2, 
            description: 'Nigiri de salmón noruego premium sobre arroz sushi', 
            image_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3'
        },
        { 
            id: 3, 
            name: 'Tempura Mixta', 
            price: 15.99, 
            category_id: 3, 
            description: 'Selección de tempuras de camarón y verduras variadas', 
            image_url: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?ixlib=rb-4.0.3'
        },
        { 
            id: 4, 
            name: 'Dragon Roll', 
            price: 14.99, 
            category_id: 1, 
            description: 'Roll de anguila y pepino cubierto con aguacate y salsa teriyaki', 
            image_url: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?ixlib=rb-4.0.3'
        },
        { 
            id: 5, 
            name: 'Atún Nigiri', 
            price: 9.99, 
            category_id: 2, 
            description: 'Nigiri de atún rojo sobre arroz sushi', 
            image_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3'
        },
        { 
            id: 6, 
            name: 'Ramune Soda', 
            price: 3.99, 
            category_id: 4, 
            description: 'Refresco japonés tradicional con sabor a limón', 
            image_url: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-4.0.3'
        }
    ],
    blogPosts: [
        { 
            id: 1, 
            title: 'Historia del Sushi', 
            content: 'El sushi tiene sus orígenes en el sudeste asiático, donde el arroz fermentado se utilizaba como método de conservación del pescado. Esta práctica se extendió a Japón alrededor del siglo VIII. Con el tiempo, el proceso evolucionó hasta convertirse en el sushi que conocemos hoy en día, donde el arroz ya no se fermenta sino que se sazona con vinagre.', 
            image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3' 
        },
        { 
            id: 2, 
            title: 'Tipos de Sushi', 
            content: 'Existen diversos tipos de sushi, cada uno con sus características únicas. El nigiri consiste en una porción de arroz cubierta con pescado o marisco. El maki son rollos de arroz y pescado envueltos en alga nori. El uramaki es similar al maki pero con el arroz en el exterior. El temaki tiene forma de cono y el sashimi, aunque técnicamente no es sushi, consiste en finas láminas de pescado crudo sin arroz.', 
            image_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3' 
        }
    ],
    users: [
        { id: 1, name: 'Usuario Demo', email: 'demo@example.com', token: 'demo-token' }
    ],
    reservations: [
        {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan@example.com',
            date: '2024-02-20',
            time: '19:00',
            guests: 2,
            status: 'confirmed'
        }
    ],
    orders: [
        {
            id: 1,
            userId: 1,
            items: [
                { menuItemId: 1, quantity: 2 },
                { menuItemId: 3, quantity: 1 }
            ],
            status: 'completed',
            date: '2024-02-19T18:30:00.000Z',
            total: 41.97
        }
    ],
    cartItems: [
        {
            id: 1,
            userId: 1,
            menuItemId: 2,
            quantity: 1
        }
    ]
};