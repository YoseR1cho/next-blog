import users from "@/models/users";

const identityMiddleware = async (
    req,
    identity = "visitor",
    isJwt = false
) => {
    if(!isJwt || identity === 'visitor')    return;
    const userId = req.headers.get('userId')
    const user = await users.findOne({_id:userId})

    req.headers.set('userRole',user.role)

    if(identity = 'manager' && user.role !==0 ){
        throw new Error('无操作权限！')
    }
};

export {identityMiddleware}
