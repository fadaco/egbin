const jwt = require('jsonwebtoken');
const {JsonResponse} = require('../shared/methods');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).send(JsonResponse(401,'Access denied'));

    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    }catch(error){
        res.status(400).send(JsonResponse(400, 'Invalid Token'));
    }
}

const admin = (req, res, next) => {
    if(req.user.type !== "admin") return res.status(403).send(JsonResponse(403, 'Access denied'))
    next();
}

const staff = (req, res, next) => {
    if(req.user.type !== "staff") return res.status(403).send(JsonResponse(403, 'Access denied'))
    next();
}



module.exports = {
    auth,
    admin,
    staff
};