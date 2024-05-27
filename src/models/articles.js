import mongoose from "mongoose";
let articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tags',
        required:true
    }],
    view:{
        type:Number,
        default:0
    },
    createAt:Date
})

articleSchema.pre("save",function (next){
    if(this.isNew){
        this.createAt = this.updateAt = new Date()
    }else {
        this.updateAt = new Date()
    }
    next()
})


const articles = mongoose.models.articles || mongoose.model('articles',articleSchema)

export default articles;
