# starterCLI
CLI for starter_s theme _underscores framework for WordPress

Add this line to your package.json to register gen-c command

```
"bin": {
    "gen-c": "./cli.js",
    "gen-p": "./cli-page.js"
}
```

```
npm install
npm link
```

Usage:

To create new page type:

```
gen-p PAGENAME
```

To create new component type:

```
gen-c COMPONENT ?PAGENAME
```

2nd argument is optional, if it's not supplied, component will be inserted into the Homepage

to create banner-slider component in Homepage, type: 
```
gen-c banner-slider
```

to create component in About page(you must copy paste fe-page-example.php file first, rename it and edit comments. File has to have atleast one ```get_template_part``` indented properly

```
gen-c banner-slider about
```
