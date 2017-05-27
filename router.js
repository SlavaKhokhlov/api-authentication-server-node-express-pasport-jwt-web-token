const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  // HEADER: authorization
  // TOKEN eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGY0NjY0MDgxYmZlMTM0NDg0N2M5MjgiLCJpYXQiOjE0OTI0MTE5Njg4NjN9.OOrp3ToKbUttyAo2JVNBNYraRpLS9TJtvCr1m8RhUsI
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });

  app.get('/blah', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });

  // POST http://localhost:3090/signin
  // BODY { "email": "test3@test.com", "password": "321" }
  // RES  {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGY1MmMyN2U4ZjNhNTBhOTg3M2Q4NjAiLCJpYXQiOjE0OTI0NjI3MjYzNTR9.fykW4U8RdTLEOPNxPQx9FjLl3n07ckxMlbFSZ_7qVn4"}
  app.post('/signin', requireSignin, Authentication.signin);
  

  // POST http://localhost:3090/signup
  // BODY {"email":"test@test.com","password": "123123"}
  // RES  {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGY0NGVmN2ZjYTMzNTI0NTBiZjlkYWIiLCJpYXQiOjE0OTI0MDYwMDc5MjJ9.gICYaqGr0qjRGWTwK8ZBCH_F4UCLB2AY48TgPtYelhI"}
  app.post('/signup', Authentication.signup);
}
