const path = require('path')
const HTMLplugin = require('html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const rules =[
    {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader"
    },
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'source-map-loader'
        }
    },
    {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
    },
    {
        test: /\.html$/,
        use: [
            {loader: "html-loader"}
        ]
    }
]
module.exports = {
    entry: "./src/components/index.tsx",
    target: "web",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
    },
    module: {rules},
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "components", "index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "./styles/main.css"
        })
    ]
}