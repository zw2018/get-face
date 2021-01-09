module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-px2rem-exclude': {
            remUnit: 37.48,
            exclude: /node_modules|folder_name/i
        }
    }
};
