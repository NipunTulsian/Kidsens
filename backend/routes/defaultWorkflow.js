const express = require('express');
const jwt = require('jsonwebtoken')
const util = require('util');
const db = require("../config/setupdb.js")
router = express.Router()
const { protectAdmin, protectTherapist, protectParent, protectTherapistAdmin } = require("../middleware/usermiddleware")
module.exports = router;

router.use("/getTree", protectAdmin, async (req, res) => {
    try {
        let { id } = req.body
        const db_query = util.promisify(db.query).bind(db);
        id = jwt.verify(id, "abc123").id
        let stages, assess, forms, maps
        let query_call = `select stage from default_stages where admin_Id = "${id}" order by position`;
        await db_query(query_call, async (err, result) => {
            stages = result
            await db_query(`select assessment,stage from default_assessments where admin_Id = "${id}"`, async (err, result_assess) => {
                assess = result_assess
                await db_query(`select FORM_NAME,FORM_ID from forms `, async (err, result_forms) => {
                    forms = result_forms
                    await db_query(`select assessment,stage,FORM_ID from default_AssessFormMap where admin_Id = "${id}"`, async (err, result_maps) => {
                        maps = result_maps
                        res.status(200).json({
                            stages: stages,
                            assess: assess,
                            forms: forms,
                            maps: maps
                        })
                    })
                })
            })
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})

router.use("/createStage", protectAdmin, async (req, res) => {
    try {
        let { id, stage_name, position } = req.body
        stage_name = db.escape(stage_name);
        id = jwt.verify(id, "abc123").id
        db.query(`Update default_stages set position= position+1 where position >=${position} and admin_Id = '${id}';`)
        db.query(`Insert into default_stages values ('${id}',${stage_name},${position})`, (err, result) => {

            res.sendStatus(200);
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})


router.use("/deleteStage", protectAdmin, async (req, res) => {
    try {
        let { id, stage_name } = req.body
        id = jwt.verify(id, "abc123").id
        const query = util.promisify(db.query).bind(db);
        stage_name = db.escape(stage_name);
        let que_query = `select position from default_stages where admin_Id='${id}' and stage = ${stage_name}`;
        let result = await query(que_query);
        que_query = `UPDATE default_stages set position = position -1 where position>${result[0]["position"]} and admin_Id='${id}'`;
        await query(que_query);
        que_query = `DELETE from default_assessments where admin_Id= '${id}' and stage=${stage_name}`;
        await query(que_query);
        que_query = `Delete from default_AssessFormMap  where admin_Id='${id}' and stage=${stage_name}`
        await query(que_query);
        que_query = `DELETE from default_stages where admin_Id= '${id}' and stage = ${stage_name}`;
        await query(que_query);

        res.sendStatus(200);
    }
    catch (err) {
        res.sendStatus(500)
    }
})

router.use("/createAssessment", protectAdmin, async (req, res) => {
    try {
        let { id, stage_name, assess_name, sevUp, mildUp, message_severe, message_moderate, message_mild, rec_severe, rec_moderate, rec_mild } = req.body
        stage_name = db.escape(stage_name);
        assess_name = db.escape(assess_name);
        message_mild = db.escape(message_mild);
        message_moderate = db.escape(message_moderate);
        message_severe = db.escape(message_severe);
        rec_mild = db.escape(rec_mild);
        rec_moderate = db.escape(rec_moderate);
        rec_severe = db.escape(rec_severe);
        id = jwt.verify(id, "abc123").id
        db.query(`Insert into default_assessments values ("${id}",${stage_name},${assess_name},${mildUp},${sevUp},${message_mild},${message_severe},${message_moderate},${rec_mild},${rec_moderate},${rec_severe})`, (err, result) => {
            res.sendStatus(200);
        })
    }
    catch (err) {
        console.lof(err)
        res.sendStatus(500)
    }
})

router.use("/deleteAssessment", protectAdmin, async (req, res) => {
    try {
        let { id, stage_name, assess_name } = req.body
        id = jwt.verify(id, "abc123").id
        const query = util.promisify(db.query).bind(db);
        stage_name = db.escape(stage_name);
        assess_name = db.escape(assess_name);
        let que_query = `delete from default_assessments where admin_Id = '${id}' and stage = ${stage_name} and assessment= ${assess_name}`;
        await query(que_query);
        que_query = `delete from default_AssessFormMap where admin_Id='${id}' and stage = ${stage_name} and assessment= ${assess_name}`;
        await query(que_query);
        res.sendStatus(200);
    }
    catch (err) {

        res.sendStatus(500)
    }
})

router.use("/getStages", protectAdmin, async (req, res) => {
    try {
        let { id } = req.body
        id = jwt.verify(id, "abc123").id
        db.query(`select stage from default_stages where admin_Id = '${id}' order by position`, (err, result) => {
            arr = []
            for (let i = 0; i < result?.length; i++) {
                arr.push(result[i]["stage"])
            }
            res.status(200).json({ stages: arr });
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})

router.use("/getAssessments", protectTherapistAdmin, async (req, res) => {
    try {
        let { id, stage } = req.body
        id = jwt.verify(id, "abc123").id
        db.query(`select assessment from default_assessments where admin_Id = '${id}' and stage= '${stage}' `, (err, result) => {
            arr = []
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

router.use("/DefaultForms", protectTherapistAdmin, async (req, res) => {
    try {
        let { id, stage_name, assess_name } = req.body
        id = jwt.verify(id, "abc123").id
        arr_used = []
        arr_unused = []
        stage_name = db.escape(stage_name);
        assess_name = db.escape(assess_name);
        db.query(`select * from forms where FORM_ID IN (select FORM_ID from default_AssessFormMap where admin_Id = '${id}' and stage= ${stage_name} and assessment= ${assess_name})`, (err, result) => {
            for (let i = 0; i < result?.length; i++) {
                arr_used.push(result[i])
            }
            db.query(`select * from forms where FORM_ID NOT IN (select FORM_ID from default_AssessFormMap where admin_Id = '${id}' and stage= ${stage_name} and assessment= ${assess_name}) `, (err, result) => {
                for (let i = 0; i < result?.length; i++) {
                    arr_unused.push(result[i])
                }
                res.status(200).json({
                    used: arr_used,
                    unused: arr_unused
                });
            })
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})

router.use("/addDefaultForms", protectTherapistAdmin, async (req, res) => {
    try {
        let { id, stage_name, assess_name, forms } = req.body
        id = jwt.verify(id, "abc123").id
        stage_name = db.escape(stage_name);
        assess_name = db.escape(assess_name);
        const query = util.promisify(db.query).bind(db);
        for (let i = 0; i < forms.length; i++) {
            await query(`insert into default_AssessFormMap values ('${id}',${stage_name},${assess_name},'${forms[i]}')`)
        }
        res.sendStatus(200)
    }
    catch (err) {
        res.sendStatus(500)
    }
})

router.use("/deleteDefaultForms", protectTherapistAdmin, async (req, res) => {
    try {
        let { id, stage_name, assess_name, form_id } = req.body
        id = jwt.verify(id, "abc123").id
        let query = `delete from default_AssessFormMap where admin_id='${id}' and stage='${stage_name}' and assessment='${assess_name}' and FORM_ID='${form_id}'`;
        db.query(query, (err, result) => {
            return res.sendStatus(200);
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})