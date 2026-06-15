const project=require("../models/Project")

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
module.exports={
    createProject,
    getProjects
}