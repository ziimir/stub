const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const { rootDir } = require('../lib/root-dir');

module.exports = (params) => {
    const isProduction = params.mode === 'production';

    return {
        mode: params.mode,
        context: rootDir,
        target: 'web',
        entry: path.resolve(rootDir, 'src/index.tsx'),
        output: {
            path: path.resolve(rootDir, 'build/assets'),
            publicPath: params.publicPath,
            filename: '[name].[hash].js',
        },
        resolve: {
            modules: [path.resolve(rootDir, 'src'), 'node_modules'],
            extensions: ['.ts', '.js', '.tsx'],
        },
        devtool: isProduction ? false : 'eval-source-map',
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                configFile: path.resolve(rootDir, 'babel.config.js'),
                            },
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                compilerOptions: {
                                    transpileOnly: true,
                                    sourceMap: isProduction ? false : true,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                import: false,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|ttf|eot)$/,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            isProduction && new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
            new WebpackManifestPlugin({
                fileName: path.resolve(rootDir, 'build', 'manifest.json'),
                publicPath: params.publicPath,
                filter: (fileDescriptor) => fileDescriptor.isInitial,
            }),
        ].filter(Boolean),
    };
};
