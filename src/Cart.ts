import { IProduct } from "./IProduct";

export class Cart {
    public products: IProduct[] = [];
    public totalCost: number = .00;
}

export function addProductToCart(cart: Cart, newProduct: IProduct): Cart {
    let product = cart.products.find(p => p.id == newProduct.id);
    if (!product) {
        cart.products.push(Object.assign(newProduct, { quantity: 1 }));
    } else {
        product.quantity++;
    }
    cart.totalCost = parseFloat(
        (cart.totalCost + (newProduct.specialOffer ? newProduct.specialOffer : newProduct.normalPrice)).toFixed(2)
    );
    return cart;
}

export function pollProductFromCart(cart: Cart, id: string): Cart {
    let productToPoll = cart.products.find(p => p.id == id);
    if (productToPoll) {
        if (productToPoll.quantity > 1) {
            productToPoll.quantity--;
        } else {
            cart.products = cart.products.filter(p => p.id != id);
        }
        cart.totalCost = parseFloat(
            (cart.totalCost - (productToPoll.specialOffer ? productToPoll.specialOffer : productToPoll.normalPrice)).toFixed(2)
        );
    }
    return cart;
}