module.exports = {
    plugins: ['@babel/plugin-transform-runtime'],
    presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-env'],
};
