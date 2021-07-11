
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { cargaBb } = require ('./src/functions') 


conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001');

    await cargaBb()

    console.log("success upload")
  });
});
