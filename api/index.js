<<<<<<< HEAD
=======

>>>>>>> 38ea3adc94ba1feef65fcb3145c71c504c979c7e
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { cargaBb } = require ('./src/functions')
const {PORT} = process.env

<<<<<<< HEAD
conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    console.log('%s listening at 3001'); 
=======

conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001');
>>>>>>> 38ea3adc94ba1feef65fcb3145c71c504c979c7e

    await cargaBb()

    console.log("success upload")
  });
});
