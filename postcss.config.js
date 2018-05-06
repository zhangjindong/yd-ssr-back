const precss = require('precss');
module.exports = {
plugins: [
require('postcss-apply'),
require('postcss-import'),
require('postcss-cssnext')({
autoprefixer: {browsers: 'last 2 version'},
}),
precss({
browsers: "last 3 versions"
}),
]
}