export class SignUp {
    name: any;
    email: any;
    password: any;
}
export class login {
    email: any;
    password: any;
}

export class product {
    name: any
    price: any
    category: any
    color: any
    description: any
    img: any
    id: any
    quantity: undefined | number;

}

export class cart {
    name: any
    price: any
    category: any
    color: any
    description: any
    img: any
    id: any
    quantity: undefined | number;
    productId: any;
    userId: any;
}