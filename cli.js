#!/usr/bin/env node

const fs = require('fs');
var shell = require('shelljs');
const [,, ...args] = process.argv;



const scssFolder = './assets/sass/components/';
const templatePartsFolder = './__fe-template-parts/';
const templatesFolder = './__fe-templates/';

let fileName = args[0];

//check for existance of scss folder
if (!fs.existsSync(scssFolder)){
    fs.mkdirSync(scssFolder, { recursive: true });
}
//check for existance of file in that folder
if (fs.existsSync(`./assets/sass/components/${fileName}.scss`)) {
    console.log('File already exists, chose another name');
} else {
    // it doesnt exists, create file
    fs.appendFile(`assets/sass/components/${fileName}.scss`, `.${fileName} {\n\n}`, function (err) {
   
        if (err) throw err;
        
        console.log('Component SCSS file created!');
    });
}
if (!fs.existsSync(scssFolder)){
    fs.mkdirSync(scssFolder, { recursive: true });
}

//Update main scss file to import component in SASS
fs.appendFile('assets/sass/style.scss', `\n @import 'components/component-${fileName}';`, (err) => {
    if (err) throw err;
    console.log('style.scss updated');
})



// fs.appendFile(`${templatePartsFolder}${fileName}.php`, `.${fileName} {\n}`, function (err) {
//     if (!fs.existsSync(templatePartsFolder)){
//         fs.mkdirSync(templatePartsFolder);
//     } else {
//         if (err) throw err;
//     }
//     console.log('PHP file generated!');
// });
// fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
//     if (!fs.existsSync(templatesFolder)){
//         fs.mkdirSync(templatesFolder);
//     } else {
//         if (err) throw err;
//     }
// });
