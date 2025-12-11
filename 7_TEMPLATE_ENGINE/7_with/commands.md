npm init -y
npx gitignore node
npm install express express-handlebars
npm install --save-dev nodemon

package.json -> scripts -> "start": "nodemon ./index.js localhost 3000"