const express = require('express');
const jwt = require('jsonwebtoken')
const util = require('util');
const db = require("../config/setupdb.js")
router = express.Router()
const { protectAdmin, protectTherapist, protectParent, protectTherapistAdmin } = require("../middleware/usermiddleware")
module.exports = router;

router.use("/getPendingForms", protectParent, async (req, res) => {
    try {
        let { id } = req.body
        const email = jwt.verify(id, "abc123").id;
        var query = `select student_Id from parent where p_email='${email}'`;
        db.query(query, function (err, result) {
            id = result[0]["student_Id"];
            query = `select FORM_ID from AssessFormMap where student_id='${id}'`;
            db.query(query, function (err, result_form) {
                var form_id = result_form;
                form_id = form_id.map((d) => { return d["FORM_ID"] })
                query = `select FORM_ID from student_responses where student_Id='${email}'`;
                db.query(query, function (err, result_filled) {
                    var form_filled = result_filled;
                    form_filled = form_filled.map((d) => { return d["FORM_ID"] })

                    form_id = form_id.filter((d) => {
                        return !form_filled.includes(d)
                    })

                    return res.status(200).json(form_id);
                })
            })
        })
    }
    catch (err) {

        return res.status(500).send(err)
    }
})


router.use("/getPendingformsName", protectParent, async (req, res) => {
    try {
        const query = util.promisify(db.query).bind(db);
        var names = []
        var { id } = req.body

        for (let i = 0; i < id.length; i++) {
            var result = await query(`select * from forms where FORM_ID='${id[i]}'`)

            names.push(result[0]);
        }


        return res.status(200).json(names);

    }
    catch (err) {

        return res.status(500).send(err)
    }
})

router.use("/getReports", protectParent, async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.id, "abc123");
        const email = decoded.id
        var query = `select * from forms where FORM_ID in (select DISTINCT FORM_ID from Marks where student_Id='${email}')`
        db.query(query, (err, result) => {
            return res.status(200).json(result);
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
})

router.use("/StudentDetails", protectParent, async (req, res) => {
    try {
        const id = req.body.id;
        const email = jwt.verify(id, "abc123").id;
        var query = `select * from parent where p_email='${email}'`;
        db.query(query, function (err, result) {
            const obj = {
                c_fname: result[0]["c_fname"],
                c_lname: result[0]["c_lname"],
                student_Id: result[0]["student_Id"],
                c_img: result[0]["c_img"],
                username: result[0]["username"],
                p_fname: result[0]["p_fname"],
                p_lname: result[0]["p_lname"],
                p_Address: result[0]["p_Address"],
                c_DOB: result[0]["c_DOB"],
                c_gender: result[0]["c_gender"],
                Diagnosis: result[0]["Diagnosis"],
                identification: result[0]["Identity"],
                reports: result[0]["Prev_Report"]
            }

            return res.status(200).json(obj);
        })
    }
    catch (err) {
        ;
        return res.status(500).send(err);
    }

})

router.use("/StudentProfile", protectTherapistAdmin, async (req, res) => {
    try {
        const id = req.body.id;
        var query = `select * from parent where student_Id='${id}'`;
        db.query(query, function (err, result) {
            const obj = {
                c_fname: result[0]["c_fname"],
                c_lname: result[0]["c_lname"],
                student_Id: result[0]["student_Id"],
                c_img: result[0]["c_img"],
                username: result[0]["username"],
                p_fname: result[0]["p_fname"],
                p_lname: result[0]["p_lname"],
                p_Address: result[0]["p_Address"],
                c_DOB: result[0]["c_DOB"],
                c_gender: result[0]["c_gender"],
                Diagnosis: result[0]["Diagnosis"],
                identification: result[0]["Identity"],
                reports: result[0]["Prev_Report"]
            }

            return res.status(200).json(obj);
        })
    }
    catch (err) {
        ;
        return res.status(500).send(err);
    }

})

router.use("/getForms", async (req, res) => {
    try {
        let { id, stage_name, assess_name } = req.body
        id = jwt.verify(id, "abc123").id
        db.query(`select * from parent where p_email = '${id}'`, (err, result) => {
            db.query(`select * from forms where FORM_ID IN (select FORM_ID from AssessFormMap where student_Id = '${result[0]["student_Id"]}' and stage= '${stage_name}' and assessment= '${assess_name}') and FORM_ID NOT IN (select FORM_ID from student_responses where student_Id = '${id}') `, (err, result_unfilled) => {
                db.query(`select * from forms where FORM_ID IN (select FORM_ID from AssessFormMap where student_Id = '${result[0]["student_Id"]}' and stage= '${stage_name}' and assessment= '${assess_name}') and FORM_ID IN (select FORM_ID from student_responses where student_Id = '${id}') and FORM_ID NOT IN (select FORM_ID from Marks where student_Id = '${id}') `, (err, result_filled) => {
                    db.query(`select * from forms where FORM_ID IN (select FORM_ID from AssessFormMap where student_Id = '${result[0]["student_Id"]}' and stage= '${stage_name}' and assessment= '${assess_name}') and FORM_ID IN (select FORM_ID from Marks where student_Id = '${id}')  `, (err, result_checked) => {
                        res.status(200).json({
                            checked: result_checked,
                            filled: result_filled,
                            unfilled: result_unfilled
                        });
                    })
                })
            })
        })
    }
    catch (err) {

        return res.status(500).send("Error")
    }
})