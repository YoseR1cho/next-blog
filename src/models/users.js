import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        required:true,
        default:1 //1代表是用户 0代表是管理员
    },
    avatar:{
        type:String,
        default: ''
    },
    chatTimes:{
        type:Number,
        required:true,
        default:0
    }
})

userSchema.pre("save",function (next){
    if(this.isNew){
        this.createAt = this.updateAt =new Date()
    }else{
        this.updateAt = new Date()
    }
    next()
})

const users = mongoose.models.users || mongoose.model('users',userSchema);

export default users;
