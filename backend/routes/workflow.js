const express = require('express');
const jwt = require('jsonwebtoken')
const util = require('util');
const db = require("../config/setupdb.js")
router = express.Router()
const { protectAdmin, protectTherapist, protectParent, protectTherapistAdmin } = require("../middleware/usermiddleware")
module.exports = router;

router.use("/Stages", async (req, res) => {
    try {
        const { id } = req.body
        var query = `select Assigned_Admin from parent where student_Id=${id}`;
        db.query(query, (err, result) => {
            var admin = result[0]["Assigned_Admin"]
            query = `select stage from default_stages where admin_Id="${admin}" order by position`;
            db.query(query, (err, result) => {

                var arr = []
                for (let i = 0; i < result?.length; i++) {
                    arr.push(result[i]["stage"])
                }
                res.status(200).json({ stages: arr });
            })
        })

    }
    catch (err) {
        res.sendStatus(500)
    }
})

router.use("/deleteAssessment", protectTherapistAdmin, async (req, res) => {
    try {
        const { id, stage_name, assess_name } = req.body;
        var query = `delete from assessments where student_Id = '${id}' and stage = '${stage_name}' and assessment= '${assess_name}'`
        db.query(query, (err, result) => {

            res.sendStatus(200);
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})

router.use("/addAssessment", protectTherapistAdmin, async (req, res) => {
    try {
        const db_query = util.promisify(db.query).bind(db);
        const { id, stage_name, assess_name } = req.body;
        for (let i = 0; i < assess_name?.length; i++) {
            var query = `Insert into assessments values ('${id}','${stage_name}','${assess_name[i]}')`;
            await db_query(query);
        }
        return res.sendStatus(200)
    }
    catch (err) {

        res.sendStatus(500)
    }
})


router.use("/getAssessment", async (req, res) => {
    try {
        const { id, stage } = req.body

        db.query(`select assessment from assessments where student_Id = '${id}' and stage= '${stage}'`, (err, result) => {
            var arr = []
            for (let i = 0; i < result?.length; i++) {
                arr.push(result[i]["assessment"])
            }
            res.status(200).json({ assessment: arr });
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})

router.use("/getDefaultAssessments", protectTherapistAdmin, async (req, res) => {
    try {
        const { id, stage } = req.body
        var query = `select Assigned_Admin from parent where student_Id=${id}`;
        db.query(query, (err, result) => {
            var admin = result[0]["Assigned_Admin"];
            db.query(`select assessment from assessments where student_Id = '${id}' and stage= '${stage}'`, (err, result) => {
                var assigned_arr = []
                for (let i = 0; i < result?.length; i++) {
                    assigned_arr.push(result[i]["assessment"])
                }
                db.query(`select assessment from default_assessments where admin_Id = '${admin}' and stage= '${stage}'`, (err, result) => {
                    var arr = []
                    for (let i = 0; i < result?.length; i++) {
                        arr.push(result[i]["assessment"])
                    }
                    arr = arr.filter((d) => { return !assigned_arr.includes(d) })
                    res.status(200).json({ default_assessment: arr });
                })
            })
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})

router.use("/addFormMap", protectTherapistAdmin, async (req, res) => {
    try {
        const { id, stage_name, assess_name, forms } = req.body
        const db_query = util.promisify(db.query).bind(db);
        let query = `select count(stage_name) as num from screening where student_id='${id}' and stage_name='${stage_name}' and end_date is not null`;
        let result = await db_query(query);
        if (result[0]["num"] != 0) {
            query = `update screening set end_date=NULL,screening_indicator='${1}' where student_id='${id}' and stage_name='${stage_name}'`;
            await db_query(query);
        }
        for (let i = 0; i < forms.length; i++) {
            let query = `insert into AssessFormMap values ('${id}','${stage_name}','${assess_name}','${forms[i]}')`
            await db_query(query);
        }
        res.sendStatus(200)
    }
    catch (err) {

        res.sendStatus(500)
    }
})

router.use("/deleteFormMap", protectTherapistAdmin, async (req, res) => {
    try {
        const { id, stage_name, assess_name, form_id } = req.body;
        let query = `delete from AssessFormMap where student_id='${id}' and stage='${stage_name}' and assessment='${assess_name}' and FORM_ID='${form_id}'`;
        db.query(query, (err) => {
            query = `select p_email from parent where student_Id='${id}'`;
            db.query(query, (err, result) => {
                query = `select count(stage_name) as num from screening where student_id='${id}' and stage_name='${stage_name}' and end_date is null`;
                db.query(query, (err, result2) => {
                    if (result2[0]["num"] != 0) {
                        query = `select count(FORM_ID) as num from AssessFormMap where stage='${stage_name}' and student_Id='${id}'`;
                        db.query(query, (err, result3) => {
                            let total_ass = result3[0]["num"];
                            query = `select count(FORM_ID) as num from student_responses where student_Id='${result[0]["p_email"]}' and FORM_ID in (select FORM_ID from AssessFormMap where stage='${stage_name}' and student_Id='${id}')`
                            db.query(query, (err, result4) => {
                                let total_com = result4[0]["num"];
                                if (total_ass === total_com) {
                                    let date_curr = new Date();
                                    let year = '' + date_curr.getFullYear()
                                    let month = '' + (date_curr.getMonth() + 1)
                                    let date = '' + date_curr.getDate();
                                    let hours = '' + (date_curr.getHours() + 1);
                                    let minutes = '' + (date_curr.getMinutes() + 1);
                                    let seconds = '' + (date_curr.getSeconds() + 1)

                                    if (month.length === 1) {
                                        month = '0' + month;
                                    }
                                    date_curr = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

                                    query = `update screening set end_date='${date_curr}',screening_indicator='${3}' where student_id='${id}' and stage_name='${stage_name}'`;
                                    db.query(query, (err, result4) => {
                                        return res.status(200).json({
                                            message: "done"
                                        })
                                    })
                                }
                                else {
                                    return res.status(200).json({
                                        message: "done"
                                    })
                                }
                            })
                        })
                    }
                    else {
                        return res.sendStatus(200);
                    }
                })
            })
        })
    }
    catch (err) {
        res.sendStatus(500)
    }
})

router.use("/getType", protectTherapistAdmin, async (req, res) => {
    try {
        const query = util.promisify(db.query).bind(db);
        let { token } = req.body;
        const decoded = jwt.verify(token, "abc123");
        const email = decoded.id
        var que_query = `select EMP_ID,count(EMP_ID) as num from therapist where Email='${email}'`
        var result = await query(que_query)
        if (result[0]["num"] > 0) {
            return res.status(200).json({
                type: "therapist"
            })
        }
        else {
            que_query = `select ADMIN_ID from admin where email='${email}'`
            result = await query(que_query)
            if (result[0]) {
                return res.status(200).json({
                    type: "admin"
                })
            }
        }
    }
    catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
})

router.use("/getForms", protectTherapistAdmin, async (req, res) => {
    try {
        const { id, stage_name, assess_name } = req.body
        var arr_used = []
        var arr_unused = []
        var query = `select * from forms where FORM_ID IN (select FORM_ID from AssessFormMap where student_Id = '${id}' and stage= '${stage_name}' and assessment= '${assess_name}')`;
        db.query(query, (err, result) => {
            for (let i = 0; i < result?.length; i++) {
                arr_used.push(result[i])
            }
            query = `select Assigned_Admin from parent where student_Id=${id}`;
            db.query(query, (err, result) => {
                var admin = result[0]["Assigned_Admin"];
                db.query(`select * from forms where FORM_ID IN (select FORM_ID from default_AssessFormMap where admin_Id = '${admin}' and stage= '${stage_name}' and assessment= '${assess_name}') `, (err, result) => {
                    for (let i = 0; i < result?.length; i++) {
                        let flag = 0
                        for (let j = 0; j < arr_used.length; j++) {
                            if (arr_used[j]["FORM_NAME"] == result[i]["FORM_NAME"] && arr_used[j]["FORM_ID"] == result[i]["FORM_ID"]) {
                                flag = 1;
                                break
                            }
                        }
                        if (flag == 0)
                            arr_unused.push(result[i])
                    }
                    res.status(200).json({
                        used: arr_used,
                        unused: arr_unused
                    });
                })
            })
        })
    }
    catch (err) {

        return res.sendStatus(500)
    }
})
