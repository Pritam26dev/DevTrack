const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createTask,
    getTasksByProject,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

router.post("/", protect, createTask);

router.get(
    "/project/:projectId",
    protect,
    getTasksByProject
);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;