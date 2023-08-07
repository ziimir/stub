const path = require('path');

const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const { rootDir } = require('../lib/root-dir');

module.exports = (params) => {
    const isProduction = params.mode === 'production';

    return {
        mode: params.mode,
        context: rootDir,
        target: 'node',
        entry: path.resolve(rootDir, 'src/server/index.ts'),
        output: {
            path: path.resolve(rootDir, 'build'),
            publicPath: params.publicPath,
            filename: 'server.js',
        },
        resolve: {
            modules: [path.resolve(rootDir, 'src'), 'node_modules'],
            extensions: ['.ts', '.tsx', '.js'],
        },
        externals: [nodeExternals()],
        node: { __dirname: true },
        devtool: isProduction ? false : 'eval-source-map',
        module: {
            noParse: /native-require/,
            rules: [
                {
                    test: /\.(ts|tsx|js)$/,
                    exclude: [/node_modules/],
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
                    use: 'null-loader',
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|ttf|eot)$/,
                    type: 'asset/resource',
                    generator: { emit: false },
                },
            ],
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(rootDir, 'src/server/views'),
                        to: path.resolve(rootDir, 'build/views'),
                    },
                ],
            }),
        ],
    };
};
