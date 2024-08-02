import jwt from "jsonwebtoken";

const verifyToken = async (req, isJwt) => {
    try {
        const token = req.headers.get("authorization").split(" ")[1] || "";
        const decoded = jwt.verify(
            token,
            process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
            ["HS256"]
        );
        const id = decoded.id;

        return new Promise(resolve => resolve(id));
    } catch (err) {
        if (isJwt) {
            throw err;
        }
    }
};

const createAccessToken = payload => {
    return jwt.sign(payload, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24 * 3,
    });
};

export const auth = {
    verifyToken,
    createAccessToken,
};
