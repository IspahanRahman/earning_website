const express = require('express');

const websiteInfoRoute = express.Router();

const { website_info,website_info_update } = require('../../controllers/admin_controller/websiteInfoController');
const admin = require('../../middlewares/admin');

websiteInfoRoute.get('/website_info',admin,website_info);
websiteInfoRoute.post('/website_info_update',admin,website_info_update);



module.exports = websiteInfoRoute

