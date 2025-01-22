const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(400).json({ valid: false });
    }
  
    jwt.verify(token, 'MeghEcon', (err, decoded) => {
      if (err) {
        return res.status(401).json({ valid: false });
      }
      return res.status(200).json({ valid: true, decoded });
    });
  });

  router.get('/',(req,res)=>{
    res.send("working");
  })

  module.exports = router;