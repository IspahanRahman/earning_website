const express = require('express');

const noticeRoute = express.Router();

const { notice, notice_add_post,notice_update,notice_update_post,notice_delete, notice_add } = require('../../controllers/admin_controller/noticeController');

const admin = require('../../middlewares/admin');

noticeRoute.get('/notice',admin,notice);
noticeRoute.get('/notice_add',admin,notice_add);
noticeRoute.post('/notice_add_post',admin,notice_add_post);
noticeRoute.get('/notice_update',admin,notice_update);
noticeRoute.post('/notice_update_post',admin,notice_update_post);
noticeRoute.get('/notice_delete',admin,notice_delete);




module.exports = noticeRoute

