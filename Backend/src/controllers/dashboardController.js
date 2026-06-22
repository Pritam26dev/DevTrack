const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments({
            owner: req.user.id
        });

        const activeProjects = await Project.countDocuments({
            owner: req.user.id,
            status: "active"
        });

        const pausedProjects = await Project.countDocuments({
            owner: req.user.id,
            status: "paused"
        });

        const completedProjects = await Project.countDocuments({
            owner: req.user.id,
            status: "completed"
        });

        const totalTasks = await Task.countDocuments({
            owner: req.user.id
        });

        const completedTasks = await Task.countDocuments({
            owner: req.user.id,
            completed: true
        });

        res.status(200).json({
            totalProjects,
            activeProjects,
            pausedProjects,
            completedProjects,
            totalTasks,
            completedTasks
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getDashboardStats
};