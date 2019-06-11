#!/usr/bin/env node

const fs = require('fs');
const [,, ...args] = process.argv;
const templatesFolder = './__fe-templates/';

let pageName = args[0];
let packageName = '';
/*
    Creating page based on argument supplied
*/
if (!fs.existsSync(templatesFolder)){
    fs.mkdirSync(templatesFolder, { recursive: true });
}

fs.readFile(`__fe-templates/fe-page-example.php`, 'utf8', function(err, contents) {
    if (contents) {
        let fileContent = contents.split('\n');
        let positionsOfString = [];
        // finds @ package NAMEOFTHEME
        for (let i = 0; i < fileContent.length; i++) {
            let package = fileContent[i].search(' * @package');
            
            if (package > 0) {
                positionsOfString.push(i);
            }
        }
        let packageLine = fileContent[positionsOfString[0]].split(' ');
        let templateNameLine = fileContent[2].split('-');
        let templateName = pageName.split("-");
        let newTemplateNameArr = [];
        for (let i = 0; i < templateName.length; i++) {
            templateName[i] = capitalize(templateName[i]);
            newTemplateNameArr.push(templateName[i]);
        }
        let newTemplateName = newTemplateNameArr.join(" ");
        fileContent.splice(2, 1, ` * Template Name: FE Dev - ${newTemplateName}`);
        fileContent.splice(6, 1, ` * @package ${packageLine[3]}`);
       
        
        let str = fileContent.join('\n');
        fs.appendFile(`__fe-templates/fe-page-${pageName}.php`, str, function(err) {
            if (err) throw err;
            console.log(`CREATED __fe-templates/fe-page-${pageName}.php`);
        });
    } else {
        console.log(`ERR: fe-page-example.php doesn't exist, check if you have it in the right directory.`);
    }
});

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
