const express = require('express');
const router = express.Router();
const userBusiness = require('../business/user');

router.get('/', (req, res) => {
  const items = userBusiness.welcomeRemarks();
  res.json({ data: items });
});

router.get('/all', async (req, res) => {
  const items = await userBusiness.getAllUsers();
  res.json({ data: items });
});

// router.get('/', (req, res) => {
//   const items = userBusiness.welcomeRemarks();
//   res.json({ data: items });
// });

// router.get('/', (req, res) => {
//   const items = userBusiness.welcomeRemarks();
//   res.json({ data: items });
// });

// router.get('/', (req, res) => {
//   const items = userBusiness.welcomeRemarks();
//   res.json({ data: items })
// });

// router.get('/', (req, res) => {
//   const items = userBusiness.welcomeRemarks();
//   res.json({ data: items });
// });

module.exports = router;
