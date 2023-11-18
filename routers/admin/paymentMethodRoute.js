const express = require('express');

const paymentMethodRoute = express.Router();

const { payment_methods,payment_method_add,payment_method_add_post, payment_method_update,payment_method_update_post ,payment_method_delete } = require('../../controllers/admin_controller/paymentMethodController');
const admin = require('../../middlewares/admin');

paymentMethodRoute.get('/payment_methods',admin,payment_methods);
paymentMethodRoute.get('/payment_method_add',admin,payment_method_add);
paymentMethodRoute.post('/payment_method_add_post',admin,payment_method_add_post);
paymentMethodRoute.get('/method_update',admin,payment_method_update);
paymentMethodRoute.post('/payment_method_update_post',admin,payment_method_update_post);
paymentMethodRoute.get('/method_delete',admin,payment_method_delete);
// paymentMethodRoute.post('/website_info_update',admin,website_info_update);



module.exports = paymentMethodRoute

