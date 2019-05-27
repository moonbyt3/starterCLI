#!/usr/bin/env node

const fs = require('fs');
const [,, ...args] = process.argv;

const scssFolder = './assets/sass/components/';
const templatesFolder = './__fe-template-parts/'
let componentName = args[0];
let pageName = args[1];

let flag = false;

/*
    PHP FILES
*/
if (!fs.existsSync(templatesFolder)){
    fs.mkdirSync(templatesFolder, { recursive: true });
}

if (pageName) {
    fs.readFile(`__fe-templates/fe-page-${pageName}.php`, 'utf8', function(err, contents) {
        if (contents) {
            let fileContent = contents.split('\n');
            let positionsOfString = [];
            // finds last get_template_part
            for (var i = 0; i < fileContent.length; i++) {
                let hasTemplatePart = fileContent[i].search('\t\t\tget_template_part');
                
                if (hasTemplatePart === 0) {
                    positionsOfString.push(i);
                }
            }
            let lastLineIndex = positionsOfString[positionsOfString.length - 1] + 1;
            fileContent.splice(lastLineIndex, 0, `\t\t\tget_template_part( '__fe-template-parts/fe-component', '${componentName}' );`);
            let str = fileContent.join('\n');
            // writes new line after last template part
            fs.writeFile(`__fe-templates/fe-page-${pageName}.php`, str, function (err) {
            
                    if (err) throw err;
                
                console.log(`${pageName} page updated`);
            });
        } else {
            console.log(`ERR: fe-page-${pageName}.php doesn't exists, please copy/paste example page and rename it.`)
        }
    });
    flag = true;
} else {
    flag = true;
    fs.readFile('__fe-templates/fe-page-homepage.php', 'utf8', function(err, contents) {
    
        let fileContent = contents.split('\n');
        let positionsOfString = [];
        // finds last get_template_part
        for (var i = 0; i < fileContent.length; i++) {
            let hasTemplatePart = fileContent[i].search('\t\t\tget_template_part');
            
            if (hasTemplatePart === 0) {
                positionsOfString.push(i);
            }
            
        }
        let lastLineIndex = positionsOfString[positionsOfString.length - 1] + 1;
        fileContent.splice(lastLineIndex, 0, `\t\t\tget_template_part( '__fe-template-parts/fe-component', '${componentName}' );`);
        let str = fileContent.join('\n');
        // writes new line after last template part
        fs.writeFile(`__fe-templates/fe-page-homepage.php`, str, function (err) {
            
            if (err) throw err;
            
            console.log('UPDATED __fe-templates/fe-page-homepage.php');
        });
    });
}

fs.appendFileSync(`__fe-template-parts/fe-component-${componentName}.php`, `<div class="${componentName}">\n\t${componentName} component\n</div>\n`, function (err) {
    
    if (err) throw err;
    
    console.log(`CREATED __fe-template-parts/fe-component-${componentName}.php`);
    flag=true;
});

/*
    SCSS FILES
*/

//check for existance of scss folder
if (!fs.existsSync(scssFolder)){
    fs.mkdirSync(scssFolder, { recursive: true });
}

if (flag) {
    //check for existance of file in that folder
    if (fs.existsSync(`./assets/sass/components/_component-${componentName}.scss`)) {
        console.log(`WARNING: File _component-${componentName}.scss already exists, its not affected`);
    } else {
        // it doesnt exists, create file
        fs.appendFile(`assets/sass/components/_component-${componentName}.scss`, `.${componentName} {\n\n}`, function (err) {
    
            if (err) throw err;
            
            console.log(`CREATED ./assets/sass/components/_component-${componentName}.scss`);
        });
    }
    //Update main SCSS file to import component
    fs.appendFile('assets/sass/style.scss', `\n@import 'components/component-${componentName}';`, (err) => {
        if (err) throw err;
        console.log('UPDATED style.scss');
    });
}
