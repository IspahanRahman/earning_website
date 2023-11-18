const express = require("express");

const taskRoute = express.Router();

const {
  tasks,
  task_add_post,
  task_delete
} = require("../../controllers/admin_controller/taskController");
const admin = require("../../middlewares/admin");

taskRoute.get("/tasks", admin, tasks);
taskRoute.post("/task_add_post", admin, task_add_post);
taskRoute.get("/task_delete", admin, task_delete);



module.exports = taskRoute;
