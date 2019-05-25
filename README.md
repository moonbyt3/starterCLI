# starterCLI
CLI for starter_s theme _underscores framework for WordPress

Add this line to your package.json to register gen-c command

```
"bin": {
    "gen-c": "./cli.js"
}
```

```
npm install
npm link
```

Usage:
```
gen-c COMPONENT ?PAGENAME
```

2nd argument is optional, if it's not supplied, component will be inserted into the Homepage

to create banner-slider component in Homepage, type: 
```
gen-c banner-slider
```

to create component in About page(you must copy paste fe-page-example.php file first, rename it and edit comments. File has to have atleast one ```get_template_part``` indented properly **TBD copyng new page template.**

```
gen-c banner-slider about
```
