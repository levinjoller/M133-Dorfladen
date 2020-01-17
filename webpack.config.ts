import path from 'path';

module.exports = {
    entry: './views/assets/cart_value.ts',
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
        filename: 'cart_value.js',
        path: path.resolve(__dirname, 'dist', 'views', 'assets')
    },
};