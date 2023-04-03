const express = require('express')
const router = express.Router();

router.post('/', function(req, res, next){

console.log('Inside GET req.logout() callback\n');
console.log(`req.session ${JSON.stringify(req.session)}\n`);
console.log(`req.isAuthenticated from GET /logout route ${req.isAuthenticated()}\n`);
console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
console.log(`req.session.user: ${JSON.stringify(req.session.user)}\n`);
console.log(`req.user: ${JSON.stringify(req.user)}\n`);
console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);


if (req.session) {
  req.session.destroy(err => {
    if (err) {
      res.status(400).send('Unable to log out')
    } else {
      res.send('Logout successful')
    }
  });
} else {
  res.end('Please Login')
}
})

module.exports = router;