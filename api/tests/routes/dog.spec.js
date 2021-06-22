/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height: "2 - 4",
  weight: "10 - 20",
  life_span: "10 - 15 years",
  image: "image",
};


describe('Dogs routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
    it('should get a object with bd Dogs', async () => {
      await agent.get('/dogs?ft=true').then((res) => {
        let dog = res.body.pop()
        expect(dog).to.deep.equal({
            id: 1000,
            name: "Pug",
            image: "image",
            temperaments: [],
            weight: 15
        })
    })
  })
});
});



// it('should get bd dog', () => {
//   agent.get('/dogs?fs=bd').then((res) => {
//     expect(res.body).to.be.equal({

//     });
//   })
// });
