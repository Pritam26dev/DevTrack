const Project=require("../models/Project")

const createProject=async(req,res)=>{
    try{
        const{title,description}=req.body;
    
        if(!title){
            return res.status(400).json({
                messgae:"Title is required",
            })
        }
        const project=await Project.create({
            title,
            description,
            owner:req.user.id,
        })
        req.status(201).json(project);
    }catch(error){
        console.error(error);

        res.status(500).json({
            message:"server error"
        })
    }

}

const getProjects=async(req,res)=>{
    try{
        const projects=await Project.find({
            owner:req.user.id,
        })
        res.status(200).json(projects);
    }catch(error){
        console.error(error)

        res.status(500).json({
            messgae:"server error"
        })
    }
}


const getProjectById=async (req,res)=>{
    try{
        const project=await Project.findById(req.params.id);

        if(!project){
            return res.status(404).json({
                message:"Project not found"
            })
        }
        if(project.owner.toString() !== req.user.id){
            return res.status(403).json({
                message:"access denied"
            })
        }
        res.status(200).json(project);
    }catch(error){
        console.error(error);

        res.status(500).json({
            message:"server error"
        })
    }
    }

    const updateProject=async (req,res)=>{
        try{
            const project=await Project.findById(req.params.id);

            if(!project){
                return res.status(400).json({
                    message:"project not found"
                })
            }
            if(project.owner.toString() !== req.user.id){
                return res.status(403).json({
                    message:"Access denied"
                })
            }
            const updateProject=await Project.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new:true,

                }
            )
            res.status(200).json(updatedProject)
                }catch(error){
                    console.error(error);
                    res.status(500).json({
                        message:"server error",
                    })
                }
    }



module.exports={
    createProject,
    getProjects,getProjectById,
    updateProject
}