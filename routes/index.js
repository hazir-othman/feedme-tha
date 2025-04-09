const express = require('express');

const router = express.Router();

const main = async (req, res) => {
  res.render('main');
}

router.get('/main', main);
module.exports = router;
