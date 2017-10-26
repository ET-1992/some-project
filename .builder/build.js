process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.on('unhandledRejection', err => {
  throw err;
});

const webpack = require('webpack');
const config = require('./webpack.prod.config');


// Create the production build and print the deployment instructions.
function build() {
  // setConfig();
  console.log('Compile sdk loader...');
  let compiler = webpack(config);
  compiler.run((err, stats) => {
    console.log(
      stats.toString({
        assets: true,
        chunks: false,
        warnings: false,
        colors: true
      })
    );
  });
}

build();
