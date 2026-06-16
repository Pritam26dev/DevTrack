const express=require("express")
const{createProject,getProjects,getProjectById,updateProject}=require("../controllers/projectController")


const {protect}=require("../middleware/authMiddleware")

const router=express.Router();

router.get("/",protect,getProjects)
router.post("/",protect,createProject)
router.get("/:id", protect, getProjectById);
router.put("/:id",protect,updateProject)
module.exports=router;