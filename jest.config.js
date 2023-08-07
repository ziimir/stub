module.exports = {
    // js-with-babel-esm т.к. у нас сначала tsc билдит код в ESNext, а потом babel билдит его уже в commonJs
    preset: 'ts-jest/presets/js-with-babel-esm',
    testPathIgnorePatterns: ['<rootDir>/out/', '<rootDir>/node_modules/'],
};
