
export interface OrderItem {
    qty: number;
    unitPrice: number;
    item: {}
}

export interface Order {
    customer: {
        username: string;
        email: string;
    };

    restaurant :{
        name: string;
        address: string;
    };

    total: number;

    createdAt: string;

    status: string;

    orderItems: OrderItem[]
}