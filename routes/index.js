const express = require('express');
const show_processing = process.env.SHOW_PROCESSING;

const router = express.Router();

const main = async (req, res) => {
  res.render('main', { show_processing });
}

router.get('/main', main);
module.exports = router;
