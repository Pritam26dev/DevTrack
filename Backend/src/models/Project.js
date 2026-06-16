const mongoose=require("mongoose");

const projectSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            default:""
        },
        status:{
            type:String,
            enum:["active","paused","completed"],
            default:"active"
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
    }
    ,{timestamps:true}
)

module.exports=mongoose.model("Project",projectSchema)