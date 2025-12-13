npm init -y
npx gitignore node
npm install express sequelize mysql2
npm install --save-dev nodemon

package.json -> scripts -> "start": "nodemon ./index.js localhost 3000"