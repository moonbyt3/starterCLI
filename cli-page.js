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
        for (var i = 0; i < fileContent.length; i++) {
            let package = fileContent[i].search(' * @package');
            
            if (package > 0) {
                positionsOfString.push(i);
            }
        }
        let packageLine = fileContent[positionsOfString].split(' ');
        
        fileContent.splice(fileContent[positionsOfString], 0, `${packageLine[3]}`);
        let str = fileContent.join('\n');
        fs.appendFile(`__fe-templates/fe-page-${pageName}.php`, str, function(err) {
            if (err) throw err;
            console.log(`CREATED __fe-templates/fe-page-${pageName}.php`);
        });
    } else {
        console.log(`ERR: fe-page-example.php doesn't exist, check if you have it in the right directory.`);
    }
});