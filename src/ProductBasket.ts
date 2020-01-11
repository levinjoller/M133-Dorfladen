import { IProduct } from "./IProduct";

export class ProductBasket {
    private products: IProduct[] = [];
    private totalCost: number = .00;

    constructor(oldBasket?: ProductBasket) {
        if (oldBasket && Object.entries(oldBasket).length) {
            this.products = [...oldBasket.products];
            this.totalCost = oldBasket.totalCost;
        }
    }

    public getProductsInBasket(): IProduct[] {
        return this.products;
    }

    public addProductToBasket(newProduct: IProduct) {
        let product = this.products.find(p => p.id == newProduct.id);
        if (!product) {
            this.products.push(Object.assign(newProduct, { quantity: 1 }));
        } else {
            product.quantity++;
        }
        this.totalCost += newProduct.specialOffer ? newProduct.specialOffer : newProduct.normalPrice;
    }

    public pollProductFromBasket(id: string) {
        let pollProduct = this.products.find(p => p.id == id);
        if (pollProduct.quantity > 1) {
            pollProduct.quantity--;
        } else {
            this.products = this.products.filter(p => p.id != id);
        }
        this.totalCost -= pollProduct.specialOffer ? pollProduct.specialOffer : pollProduct.normalPrice;
    }

    public getTotalCost(): number {
        return Math.round(this.totalCost * 20) / 20;
    }
}