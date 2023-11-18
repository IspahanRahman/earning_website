const express = require('express');

const paymentMethodRoute = express.Router();

const { payment_methods,payment_method_add,payment_method_add_post } = require('../../controllers/admin_controller/paymentMethodController');
const admin = require('../../middlewares/admin');

paymentMethodRoute.get('/payment_methods',admin,payment_methods);
paymentMethodRoute.get('/payment_method_add',admin,payment_method_add);
paymentMethodRoute.post('/payment_method_add_post',admin,payment_method_add_post);
// paymentMethodRoute.post('/website_info_update',admin,website_info_update);



module.exports = paymentMethodRoute

