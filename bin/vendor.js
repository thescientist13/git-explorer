const copy = require('copy');

// assumes starting point of node_modules
const vendorLibs = [
  'diff2html',
  'es-module-shims',
  'lit-element',
  'lit-html'
];

vendorLibs.forEach((lib) => {
  const cwd = process.cwd();
  const sourceDirectory = `${cwd}/node_modules/${lib}`;
  const targetDirectory = `${cwd}/src/client/vendor`;

  copy(`${sourceDirectory}/**/**/*.{js,css}`, `${targetDirectory}/${lib}`, (err) => {
    if (err) {
      console.log(err);
    }

    // console.log(`copied from ${sourceDirectory} => ${targetDirectory}/${lib}`);
  });
});