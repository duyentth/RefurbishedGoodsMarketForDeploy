import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send("Please provide the valid token!");
        return;
    }
    const splits = req.headers.authorization.split(" ");
    if (splits.length !== 2) {
        next(new Error("Please use Bearer schema!"));
    }
    const token = splits[1];
    try {
        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = decryptedToken;
        next();
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};
