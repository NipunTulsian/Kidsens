const express = require('express');
const jwt = require('jsonwebtoken')
const util = require('util');
const db = require("../config/setupdb.js")
router = express.Router()
const { protectAdmin, protectTherapist, protectParent, protectTherapistAdmin } = require("../middleware/usermiddleware")
module.exports = router;


router.use("/saveMarks", protectTherapistAdmin, async (req, res) => {
    try {
        let { marks, id, form_Id } = req.body

        db.query(`select p_email from parent where student_Id='${id}'`, (err, result) => {
            let query = "insert into Marks values "
            for (let i = 0; i < marks?.length; i++) {
                query += ` ('${result[0]["p_email"]}','${form_Id}','${marks[i]["QUESTION_ID"]}',${marks[i]["Max_Marks"]},${marks[i]["Marks_Obtained"]})`
                if (i !== marks.length - 1) {
                    query += ","
                }
            }
            db.query(`delete from Marks where student_Id = '${result[0]["p_email"]}' and FORM_ID = '${form_Id}'`, (err, result) => {
                db.query(query, (err, result_done) => {
                    res.sendStatus(200)
                })
            })
        })
    }
    catch (err) {

        return res.status(500).send("Error")

    }
})

router.use("/getResponses", protectTherapistAdmin, async (req, res) => {
    try {
        let { id, student } = req.body
        db.query(`select p_email from parent where student_Id= '${student}'`, (err, result) => {
            db.query(`select FORM_OBJ from forms_obj where FORM_ID = '${id}'`, (err, result_original) => {
                db.query(`select Form_response from student_responses where student_Id = '${result[0]["p_email"]}' and FORM_ID = '${id}'`, (err, result_student) => {
                    db.query(`select * from questions where FORM_ID='${id}'`, (err, result_ques) => {
                        db.query(`select * from Marks where QUESTION_ID in (select QUESTION_ID from questions where FORM_ID='${id}')`, (err, result_marks) => {
                            return res.status(200).json({
                                original: result_original[0]["FORM_OBJ"],
                                student: result_student[0] ? result_student[0]["Form_response"] : null,
                                question: result_ques,
                                marks: result_marks,
                            })
                        })
                    })
                })
            })
        })
    }
    catch (err) {

        return res.status(500).send("Error")

    }
})

router.use("/Activity", protectParent, async (req, res) => {
    try {
        const query = util.promisify(db.query).bind(db);
        var que_query = "";
        que_query = `select * from parent where student_Id='${req.user}'`;
        const student = await query(que_query);
        var birth_year = parseInt((student[0]["c_DOB"]).substring(0, 4));
        var date = new Date();
        date = date.getFullYear();
        var age = date - birth_year;
        que_query = `select * from Activity where lower<='${age}' and upper>='${age}'`;
        let activity = await query(que_query);
        let act_speech = [], act_motor = [], act_social = [], act_cognitive = [], act_sensory = [];
        for (let i = 0; i < activity.length; i++) {
            if (activity[i].type === "speech") {
                act_speech.push(activity[i].activity);
            }
            else if (activity[i].type === "motor") {
                act_motor.push(activity[i].activity);
            }
            else if (activity[i].type === "social") {
                act_social.push(activity[i].activity);
            }
            else if (activity[i].type === "cognitive") {
                act_cognitive.push(activity[i].activity);
            }
            else if (activity[i].type === "sensory") {
                act_sensory.push(activity[i].activity);
            }
        }
        return res.status(200).json({
            act_speech: act_speech,
            act_motor: act_motor,
            act_social: act_social,
            act_cognitive: act_cognitive,
            act_sensory: act_sensory
        })
    }
    catch (e) {
        return res.status(500).send(e);
    }
})

router.use("/ReportDetails", protectParent, async (req, res) => {
    try {
        const query = util.promisify(db.query).bind(db);
        const form_id = req.body.id;
        var que_query = "";
        que_query = `select * from parent where student_Id='${req.user}'`;
        const student = await query(que_query);
        let admin = student[0]["Assigned_Admin"];
        let therapist = student[0]["Assigned_Therapist"].split(",")[0];
        que_query = `select * from therapist where Email='${therapist}'`;
        therapist = await query(que_query);
        que_query = `select * from AssessFormMap where student_Id='${req.user}' and FORM_ID='${form_id}'`;
        let assessmap = await query(que_query);
        que_query = `select * from default_assessments where admin_Id='${admin}' and stage='${assessmap[0]["stage"]}' and assessment='${assessmap[0]["assessment"]}'`;
        let scale = await query(que_query);

        var birth_year = parseInt((student[0]["c_DOB"]).substring(0, 4));
        var date = new Date();
        date = date.getFullYear();
        var age = date - birth_year;
        que_query = `select * from report_details where lower<='${age}' and upper>='${age}'`;
        const details = await query(que_query);
        var lower = 0, upper = 0;
        if (details?.length) {
            lower = details[0]["lower"];
            upper = details[0]["upper"];
        }
        const category = ["speech", "motor", "social", "cognitive", "emotional", "sensory", "behaviour"];
        var obj = {};
        let total_correct = 0, total_assinged = 0;
        for (let i = 0; i < category.length; i++) {
            que_query = `select count(QUESTION_ID) as num from questions where FORM_ID='${form_id}' and Category='${category[i]}'`;
            let total = await query(que_query);
            total = total[0].num;
            total_assinged += total;
            que_query = `select count(QUESTION_ID) as num from marks where FORM_ID='${form_id}' and student_Id='${student[0]["p_email"]}' and  Marks_Obtained>0  and QUESTION_ID in (select QUESTION_ID from questions where FORM_ID='${form_id}' and Category='${category[i]}')`
            let total_cor = await query(que_query);
            total_cor = total_cor[0].num;
            total_correct += total_cor;
            obj["total_" + category[i]] = total;
            obj["total_" + category[i] + "_cor"] = total_cor;
        }

        var obj2 = {};
        for (let i = 0; i < category.length; i++) {
            que_query = `select * from questions where category='${category[i]}' and FORM_ID='${form_id}' and QUESTION_ID in (select QUESTION_ID from marks where FORM_ID='${form_id}' and student_Id='${student[0]["p_email"]}' and Marks_Obtained>0 and QUESTION_ID in (select QUESTION_ID from questions where FORM_ID='${form_id}' and Category='${category[i]}'))`;
            let result = await query(que_query);
            que_query = `select * from questions where category='${category[i]}' and FORM_ID='${form_id}' and QUESTION_ID not in (select QUESTION_ID from marks where FORM_ID='${form_id}' and student_Id='${student[0]["p_email"]}' and Marks_Obtained>0 and QUESTION_ID in (select QUESTION_ID from questions where FORM_ID='${form_id}' and Category='${category[i]}'))`;
            let result2 = await query(que_query);
            obj2[category[i] + "_correct"] = result;
            obj2[category[i] + "_incorrect"] = result2;
        }

        let scale_val = (total_correct * 100) / total_assinged;
        let summary = "", rec = "";
        if (scale_val > scale[0]["MildUp"]) {
            summary = scale[0]["message_mild"];
            rec = scale[0]["recommendation_mild"]
        }
        else if (scale_val > scale[0]["SevereUp"]) {
            summary = scale[0]["message_moderate"];
            rec = scale[0]["recommendation_moderate"]
        }
        else {
            summary = scale[0]["message_severe"];
            rec = scale[0]["recommendation_severe"]
        }

        return res.status(200).json({
            student: student[0],
            details: details,
            summary: summary,
            rec: rec,
            age: age,
            lower: lower,
            upper: upper,
            branch: therapist["branch"],
            school: therapist["school"],
            total_behaviour: obj["total_behaviour"],
            total_behaviour_cor: obj["total_behaviour_cor"],
            total_sensory: obj["total_sensory"],
            total_sensory_cor: obj["total_sensory_cor"],
            total_emotional: obj["total_emotional"],
            total_emotional_cor: obj["total_emotional_cor"],
            total_cognition: obj["total_cognitive"],
            total_cognition_cor: obj["total_cognitive_cor"],
            total_social: obj["total_social"],
            total_social_cor: obj["total_social_cor"],
            total_motor: obj["total_motor"],
            total_motor_cor: obj["total_motor_cor"],
            total_speech: obj["total_speech"],
            total_speech_cor: obj["total_speech_cor"],
            behaviour_correct: obj2["behaviour_correct"],
            behaviour_incorrect: obj2["behaviour_incorrect"],
            sensory_correct: obj2["sensory_correct"],
            sensory_incorrect: obj2["sensory_incorrect"],
            emotional_correct: obj2["emotional_correct"],
            emotional_incorrect: obj2["emotional_incorrect"],
            cognition_correct: obj2["cognitive_correct"],
            cognition_incorrect: obj2["cognitive_incorrect"],
            social_correct: obj2["social_correct"],
            social_incorrect: obj2["social_incorrect"],
            motor_correct: obj2["motor_correct"],
            motor_incorrect: obj2["motor_incorrect"],
            speech_correct: obj2["speech_correct"],
            speech_incorrect: obj2["speech_incorrect"]
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
})
