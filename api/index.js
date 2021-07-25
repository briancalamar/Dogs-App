const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { cargaBb } = require ('./src/functions')
const {PORT} = process.env

conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    console.log('%s listening at 3001'); 

    await cargaBb()

    console.log("success upload")
  });
});
