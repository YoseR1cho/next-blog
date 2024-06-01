import mongoose from "mongoose";

let tagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})
tagSchema.pre("save",function (next){
    if(this.isNew){
        this.createAt = this.updateAt = new Date()
    }else {
        this.updateAt = new Date()
    }
    next()
})

const tags = mongoose.models.tags || mongoose.model('tags',tagSchema);

export default tags;

