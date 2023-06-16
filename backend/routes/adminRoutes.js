const express = require('express');
const jwt = require('jsonwebtoken')
const util = require('util');
const db = require("../config/setupdb.js")
router = express.Router()
const { protectAdmin, protectTherapist, protectParent, protectTherapistAdmin } = require("../middleware/usermiddleware")
module.exports = router;

router.use("/displayStudent", protectAdmin, async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.admin, "abc123")
        var query = `SELECT * FROM parent where Assigned_Admin="${decoded.id}"`;
        db.query(query, (err, result, fields) => {
            return res.status(200).json(result);
        })
    }
    catch (err) {
        return res.status(500).json(err);
    }
})

router.use("/displayTherapist", protectAdmin, async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.admin, "abc123")
        var query = `SELECT * FROM therapist where Assigned_Admin="${decoded.id}"`;
        db.query(query, (err, result, fields) => {
            return res.status(200).json(result);
        })
    }
    catch (err) {
        return res.status(500).json(err);
    }
})

router.use("/deleteStudent", protectAdmin, async (req, res) => {
    try {
        const email = req.body.p_email;

        var query = `DELETE FROM parent WHERE p_email="${email}"`;

        db.query(query, function (err, result) {
            //if (err) throw err;
            //else {
            return res.status(200).send("Deleted")
            //}
        })
    }
    catch (err) {
        return res.status(500).json(err);
    }
})


router.use("/deleteTherapist", protectAdmin, async (req, res) => {
    try {
        const email = req.body.email;

        var query = `DELETE FROM therapist WHERE Email="${email}"`;

        db.query(query, (err, result) => {
            // if (err) throw err;
            // else {
            return res.status(200).send("Deleted")
            // }
        })
    }
    catch (err) {
        return res.status(500).json(err);
    }
})