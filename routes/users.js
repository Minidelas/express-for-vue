var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('', function(req, res, next) {
  let users = [
    { id: 0, name: "Ismael" },
    { id: 1, name: "Sergio" },
    { id: 2, name: "Karina" },
    { id: 3, name: "Elena" }
  ];

  res.json(users);
});

module.exports = router;
