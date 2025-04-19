const { POST } = require("../chat/route");


const monitor = async (req) => {
    const body = await req.json();
    console.log(body);

}

export const POST = monitor