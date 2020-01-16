import { IProduct } from '../../src/IProduct';

let lastPartOfPath = location.pathname.split("/").pop();
fetch(`/api/product/${lastPartOfPath}`)
    .then(r => r.json())
    .then((product: IProduct) => {
        let content = `
            <div>
                <img src="/assets/img/${product.imageName}" alt="${product.productName}" />
            </div>
            <div>
                <h2>${product.productName}</h2>
                <p>${product.description}</p>
                <input type="submit" value="In den Warenkorb" onclick="window.location='/api/addproduct/${lastPartOfPath}';" /> 
            </div>
        `;
        document.querySelector('.productdetails').innerHTML = content;
    });