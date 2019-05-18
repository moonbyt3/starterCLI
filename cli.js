#!/usr/bin/env node

const fs = require('fs');
const [,, ...args] = process.argv;

const scssFolder = './assets/sass/components/';

let fileName = args[0];
let componentName = args[1];

let flag = false;

/*
    PHP FILES
*/

if (componentName) {
    fs.readFile(`__fe-templates/fe-page-${componentName}.php`, 'utf8', function(err, contents) {
        if (contents) {
            let fileContent = contents.split('\n');
            let positionsOfString = [];
            // finds last get_template_part
            for (var i = 0; i < fileContent.length; i++) {
                let hasTemplatePart = fileContent[i].search('\t\t\t\tget_template_part');
                
                if (hasTemplatePart === 0) {
                    positionsOfString.push(i);
                }
            }
            let lastLineIndex = positionsOfString[positionsOfString.length - 1] + 1;
            fileContent.splice(lastLineIndex, 0, `\t\t\t\tget_template_part( '__fe-template-parts/fe-component', '${fileName}' );`);
            let str = fileContent.join('\n');
            // writes new line after last template part
            fs.writeFile(`__fe-templates/fe-page-homepage.php`, str, function (err) {
            
                    if (err) throw err;
                
                console.log(`${componentName} page updated`);
            });
            flag = true;
        } else {
            console.log(`fe-page-${componentName}.php doesn't exists, please create it first`)
        }
        
    });
} else {
    flag = true;
    fs.readFile('__fe-templates/fe-page-homepage.php', 'utf8', function(err, contents) {
    
        let fileContent = contents.split('\n');
        let positionsOfString = [];
        // finds last get_template_part
        for (var i = 0; i < fileContent.length; i++) {
            let hasTemplatePart = fileContent[i].search('\t\t\t\tget_template_part');
            
            if (hasTemplatePart === 0) {
                positionsOfString.push(i);
            }
            
        }
        let lastLineIndex = positionsOfString[positionsOfString.length - 1] + 1;
        fileContent.splice(lastLineIndex, 0, `\t\t\t\tget_template_part( '__fe-template-parts/fe-component', '${fileName}' );`);
        let str = fileContent.join('\n');
        // writes new line after last template part
        fs.writeFile(`__fe-templates/fe-page-homepage.php`, str, function (err) {
        
                if (err) throw err;
            
            console.log('__fe-templates/fe-page-homepage.php Updated!');
        });
    });
}
if (flag) {
    
    fs.appendFile(`__fe-template-parts/fe-template-${fileName}.php`, `<div class="${fileName}">\n\t${fileName} component\n</div>\n`, function (err) {
        
        if (err) throw err;
        
        console.log(`__fe-template-parts/fe-template-${fileName}.php created`);
    });
} else {
    console.log(`fe-page-${componentName}.php doesn't exists, please create it first`);
}
/*
    SCSS FILES
*/

//check for existance of scss folder
if (!fs.existsSync(scssFolder)){
    fs.mkdirSync(scssFolder, { recursive: true });
}



if (flag) {
    //check for existance of file in that folder
    if (fs.existsSync(`./assets/sass/components/${fileName}.scss`)) {
        console.log(`File ${fileName}.scss already exists, its not affected`);
    } else {
        // it doesnt exists, create file
        fs.appendFile(`assets/sass/components/${fileName}.scss`, `.${fileName} {\n\n}`, function (err) {
    
            if (err) throw err;
            
            console.log(`./assets/sass/components/${fileName}.scss created`);
        });
    }
    //Update main SCSS file to import component
    fs.appendFile('assets/sass/style.scss', `\n @import 'components/component-${fileName}';`, (err) => {
        if (err) throw err;
        console.log('style.scss updated');
    })
}