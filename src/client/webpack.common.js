const path = require('path')

module.exports = {
    entry: './src/client/client.js',
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                  ],
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                use: "file-loader",
            }
        ]
    },
    resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    },
output: {
    filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    },
}