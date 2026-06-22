const Task=require("../models/Task")
const Project=require("../models/Project")

const createTask=async(req,res)=>{
    try{
        const {title,projectId}=req.body;

        if(!title || !projectId){
            return res.status(400).json({
                message:"Title and id are required"
            })
        }

        const project=await Project.findById(projectId);

        if(!project){
            return res.status(404).json({
                message:"Project not found",
            })
        }
        if(project.owner.toString() !== req.user.id){
            return res.status(403).json({
                message:"Access denied"
            })
        }

        const task=await Task.create({
            title,
            project:projectId,
            owner:req.user.id,

        })
        res.status(201).json(task);
    }catch(error){
        console.error(error);

        res.status(500).json({
            message:"server error"
        })
    }
}

const getTasksByProject=async(req,res)=>{
    try{
        const project=await Project.findById(req.params.projectId);

        if(!project){
            return res.status(404).json({
                message:"Project not found",
            })
        }
        if(project.owner.toString() !== req.user.id){
            return res.status(403).json({
                message:"Access denied"
            })
        }
        const tasks=await Task.find({
            project:req.params.projectId,

        })
        res.status(200).json(tasks);
    }catch(error){
        console.error(error)

        res.status(500).json({
            message:"Server error"
        })
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.status(200).json(updatedTask);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports={createTask,getTasksByProject,deleteTask,updateTask}