const jwt = require("jsonwebtoken");
const jwt_secret = "abc123";
const sql = require('mysql')
const db = require("../config/setupdb.js")
const util = require('util');
const protectParent = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) //token is in headers and starts with Bearer token
    {
        try {
            const query = util.promisify(db.query).bind(db);
            token = req.headers.authorization.split(" ")[1]; //extracting token
            const decoded = jwt.verify(token, "abc123");
            const email = decoded.id
            var que_query = `select student_Id from parent where p_email='${email}'`
            var result = await query(que_query)
            if (result[0]) {
                req.user = result[0]["student_Id"]
                next();
            }
            else {
                return res.sendStatus(500)
            }
        }
        catch (err) {
            return res.status(401).json("not authorized");
        }
    }
    if (!token) {
        return res.status(401).json("not authorized, not token")
    }
}

const protectAdmin = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) //token is in headers and starts with Bearer token
    {
        try {
            const query = util.promisify(db.query).bind(db);
            token = req.headers.authorization.split(" ")[1]; //extracting token
            const decoded = jwt.verify(token, "abc123");
            const email = decoded.id
            var que_query = `select ADMIN_ID from admin where email='${email}'`
            var result = await query(que_query)
            if (result[0]) {
                req.user = result[0]["ADMIN_ID"]
                next()
            } else {
                return res.sendStatus(500)
            }
        }
        catch (err) {
            console.log(err)
            return res.status(401).json("not authorized");
        }
    }
    if (!token) {
        return res.status(401).json("not authorized, not token")
    }
}
const protectTherapist = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) //token is in headers and starts with Bearer token
    {
        try {
            const query = util.promisify(db.query).bind(db);
            token = req.headers.authorization.split(" ")[1]; //extracting token
            const decoded = jwt.verify(token, "abc123");
            const email = decoded.id
            var que_query = `select EMP_ID from therapist where email='${email}'`
            var result = await query(que_query)
            if (result[0]) {
                req.user = result[0]["EMP_ID"]
                next()
            } else {
                return res.sendStatus(500)
            }
        }
        catch (err) {
            console.log(err)
            return res.status(401).json("not authorized");
        }
    }
    if (!token) {
        return res.status(401).json("not authorized, not token")
    }
}

const protectTherapistAdmin = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) //token is in headers and starts with Bearer token
    {
        try {
            const query = util.promisify(db.query).bind(db);
            token = req.headers.authorization.split(" ")[1]; //extracting token
            const decoded = jwt.verify(token, "abc123");
            const email = decoded.id
            var que_query = `select EMP_ID from therapist where email='${email}'`
            var result = await query(que_query)
            if (result[0]) {
                req.user = result[0]["EMP_ID"]
                next();
            }
            else {
                que_query = `select ADMIN_ID from admin where email='${email}'`
                result = await query(que_query)
                if (result[0]) {
                    req.user = result[0]["ADMIN_ID"]
                    next()
                } else {
                    return res.sendStatus(500)
                }
            }
        }
        catch (err) {
            console.log(err)
            return res.status(401).json("not authorized");
        }
    }
    if (!token) {
        return res.status(401).json("not authorized, not token")
    }
}
module.exports = { protectAdmin, protectParent, protectTherapist, protectTherapistAdmin }