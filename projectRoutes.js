const express = require('express');
const { getProjects, addProject } = require('../controllers/projectController');
const router = express.Router();

router.route('/').get(getProjects).post(addProject);

module.exports = router;
