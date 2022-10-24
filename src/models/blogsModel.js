const mongoose=require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId

const blogSchema=new mongoose.Schema({
     title: {
        type:String,
        required:"Title is required",
        trim:true
    }, 
    body: {
        type:String,
        required:"Body is required",
        trim:true
    }, 
    authorId: {
        type:ObjectId,
        required:true, 
        ref:"Author"
    },
    tags:[{type:String,trim:true}], 
    category: {
        type:String,
        required:"category is required",
        trim:true
    },
    subcategory: [{type:String,trim:true}],
    deletedAt: {type:Date,default:null}, 
    isDeleted: {
        type:Boolean, 
        default: false}, 
    publishedAt: {type:Date, default:null}, 
    isPublished: {
        type:Boolean, 
        default: false
        },
},{timeStamp:true})


module.exports=mongoose.model("Blog",blogSchema)
