const path = require('path');

module.exports = {
    entry: {
        index: './views/assets/index.ts',
        warenkorb: './views/assets/warenkorb.ts',
        details: './views/assets/details.ts',
        basket_value: './views/assets/basket_value.ts',
        checkout: './views/assets/checkout.ts'
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'views', 'assets')
    },
};