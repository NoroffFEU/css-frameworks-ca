# css-frameworks-ca
# setup node sass

1. Once in the correct folder, run the command npm init. You will be prompted to answer several questions about the project, after which NPM will generate a package.json file in your folder.
2. Node-sass is an NPM package that compiles Sass to CSS (which it does very quickly too). To install node-sass run the following command in your terminal: npm install node-sass
3. Open the package.json file in a code editor. You will see something like this: "scss": "node-sass --watch scss -o css" When we run this script it will watch every .scss file in the scss/ folder, then save the compiled css in css/ folder every time we change a .scss file.
4. To execute our one-line script, we need to run the following command in the terminal: npm run scss
