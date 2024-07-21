import mongoose from "mongoose";

let topicSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    articleIds:{
        type:Array,
        required:true
    }
})
topicSchema.pre("save",function (next){
    if(this.isNew){
        this.createAt = this.updateAt = new Date()
    }else {
        this.updateAt = new Date()
    }
    next()
})

const topics = mongoose.models.topics || mongoose.model('topics',topicSchema);

export default topics;

