const express = require('express');
const jwt = require('jsonwebtoken')
const util = require('util');
const db = require("../config/setupdb.js")
router = express.Router()
const { protectAdmin, protectTherapist, protectParent, protectTherapistAdmin } = require("../middleware/usermiddleware")
module.exports = router;

router.use("/getStudents", protectTherapist, async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.therapist, "abc123").id
        var query = `SELECT * FROM parent`;
        let arr = []
        db.query(query, (err, result, fields) => {
            for (let i of result) {
                if (i.Assigned_Therapist.includes(decoded)) {
                    arr.push(i)
                }
            }
            db.query("SELECT * FROM forms", (err, result, fields) => {
                res.status(200).json({
                    students: arr,
                    forms: result
                })
            })
        })
    }
    catch (err) {
        return res.status(400).json(err);
    }
})


router.use("/getTherapist", protectTherapist, async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.therapist, "abc123").id
        var query = `SELECT * FROM therapist where Email="${decoded}"`;
        db.query(query, (err, result, fields) => {
            res.status(200).json(result[0]);
        })
    }
    catch (err) {
        return res.status(400).json(err);
    }
})

router.use("/getPendingforms", protectTherapist, async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.therapist, "abc123").id
        var que_query = `SELECT * FROM parent`;
        let arr = []
        db.query(que_query, async (err, result, fields) => {
            for (let i of result) {
                if (i.Assigned_Therapist.includes(decoded)) {
                    arr.push(i)
                }
            }
            let answer = await getPending(arr)
            res.status(200).json({
                answer
            })
        })
    }
    catch (e) {

        return res.status(500).json(e);
    }
})

async function getPending(arr) {
    const query = util.promisify(db.query).bind(db);
    const students = arr;
    var answer = [];
    var allResponded = []
    for (let i = 0; i < students?.length; i++) {
        var que_query = `select FORM_ID, student_Id from student_responses where student_Id='${students[i].p_email}' and FORM_ID not in (select FORM_ID from Marks where student_Id='${students[i].p_email}')`;
        var result = await query(que_query);

        for (let j = 0; j < result?.length; j++) {
            result[j]["student"] = students[i].student_Id;
            allResponded.push(result[j])
        }
    }
    for (let i = 0; i < allResponded?.length; i++) {
        var que_query = `select * from AssessFormMap where student_id= '${allResponded[i].student}' and FORM_ID='${allResponded[i].FORM_ID}'`;
        var result = await query(que_query)
        que_query = `select * from forms where FORM_ID='${allResponded[i].FORM_ID}'`;
        var result_name = await query(que_query)
        for (let j = 0; j < result?.length; j++) {
            result[j].FORM_NAME = result_name[0].FORM_NAME
            answer.push(result[j]);
        }
    }
    for (let i = 0; i < answer.length; i++) {
        let result = await query(`select c_fname,c_lname from parent where student_Id = '${answer[i]["student_Id"]}'`)
        answer[i]["studentFirstName"] = result[0]["c_fname"]
        answer[i]["studentLastName"] = result[0]["c_lname"]
    }
    return answer
}


router.use("/TherapistProfile", protectTherapistAdmin, async (req, res) => {
    try {
        const id = req.body.id;
        var query = `select * from therapist where EMP_ID='${id}'`;
        db.query(query, function (err, result) {
            return res.status(200).json(result[0]);
        })
    }
    catch (err) {
        ;
        return res.status(500).send(err);
    }

})