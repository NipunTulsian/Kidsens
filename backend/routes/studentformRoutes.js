const express = require('express');
const jwt = require('jsonwebtoken')
const util = require('util');
const db = require("../config/setupdb.js")
router = express.Router()
const { protectAdmin, protectTherapist, protectParent, protectTherapistAdmin } = require("../middleware/usermiddleware")

module.exports = router;

const destructure_form_obj_answers = async (form_obj, form_id, student_id, email) => {
    console.log(form_obj)
    const query = util.promisify(db.query).bind(db);
    var que_query = "", type = "", opt_query = "";
    que_query = `select QUESTION_ID,max_marks from questions where FORM_ID='${form_id}'`;
    var result = await query(que_query);
    let index = 0;
    for (let i = 0; i < form_obj.length; i++) {
        type = form_obj[i]["type"];
        console.log(form_obj[i])
        if (type === "checkbox-group" || type === "radio-group" || type === "select") {
            var options = form_obj[i]["userData"];
            let marks = 0;
            for (let j = 0; j < options?.length; j++) {
                let temp = options[j];
                marks += parseInt(temp);
                let ans_query=`select ANSWER from answers where QUESTION_ID='${result[index]["QUESTION_ID"]}' and FORM_ID='${form_id}' and value='${temp}'`;
                let ans= await query(ans_query);
                temp=ans[0]["ANSWER"];
                temp=db.escape(temp)
                opt_query = `Insert into student_answers Values("${result[index]["QUESTION_ID"]}","${student_id}",${temp})`;
                await query(opt_query);
            }
            que_query = `Insert into Marks values ("${email}","${form_id}","${result[index]["QUESTION_ID"]}","${result[index]["max_marks"]}","${marks}")`;
            await query(que_query)
            index++;
        }
        else if (type === "text") {
            let temp = form_obj[i]["userData"][0];
            temp = db.escape(temp)
            opt_query = `Insert into student_answers Values('${result[index]["QUESTION_ID"]}','${student_id}',${temp})`;
            await query(opt_query);
            index++;
        }
        // else if (type === "file") {
        //     que_query = `Insert into student_answers Values('${result[i]["QUESTION_ID"]}','${student_id}','${form_obj[i]["value"]}')`;
        //     await query(que_query);
        // }
        // else if (type === "date") {
        //     que_query = `Insert into student_answers Values('${result[i]["QUESTION_ID"]}','${student_id}','${name}','${type}',${Max_Marks},'${category}')`;
        //     await query(que_query);
        // }
    }
}

router.use("/storeFormObject", protectParent, async (req, res) => {
    try {
        let { id, form, student } = req.body
        student = jwt.verify(student, "abc123").id;
        let form_obj = db.escape(form);
        let query = `INSERT INTO student_responses value('${student}','${id}',${form_obj})`;
        db.query(query, (err, result0) => {
            destructure_form_obj_answers(JSON.parse(form), id, req.user, student);
            query = `select stage from AssessFormMap where FORM_ID='${id}' and student_Id='${req.user}'`;
            db.query(query, (err, result) => {
                let stage = result[0]["stage"];
                query = `select count(FORM_ID) as num from AssessFormMap where stage='${stage}' and student_Id='${req.user}'`
                db.query(query, (err, result2) => {
                    let total_ass = result2[0]["num"];
                    query = `select count(FORM_ID) as num from student_responses where student_Id='${student}' and FORM_ID in (select FORM_ID from AssessFormMap where stage='${stage}' and student_Id='${req.user}')`
                    db.query(query, (err, result3) => {
                        let total_com = result3[0]["num"];
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
                            query = `update screening set end_date='${date_curr}', screening_indicator='${3}' where student_id='${req.user}' and stage_name='${stage}'`;
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
            })
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})

router.use("/getFormObjectStudent", protectParent, async (req, res) => {
    try {
        const { id } = req.body;
        let query = `select stage from AssessFormMap where FORM_ID='${id}' and student_Id='${req.user}'`;
        db.query(query, (err, result) => {
            query = `select count(stage_name) as num from screening where student_id='${req.user}' and stage_name='${result[0]["stage"]}'`;
            db.query(query, (err, result2) => {
                if (result2[0]["num"] != 0) {
                    query = `select FORM_OBJ from forms_obj where FORM_ID='${id}'`;
                    db.query(query, (err, result) => {
                        return res.status(200).json({
                            form: result[0]["FORM_OBJ"]
                        });
                    })
                }
                else {
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
                    if (hours.length === 1) {
                        hours = '0' + hours;
                    }
                    if (minutes.length === 1) {
                        minutes = '0' + minutes;
                    }
                    date_curr = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
                    query = `insert into screening (student_id,stage_name,start_date) values('${req.user}','${result[0]["stage"]}','${date_curr}')`;
                    db.query(query, (err, result3) => {
                        query = `select FORM_OBJ from forms_obj where FORM_ID='${id}'`;
                        db.query(query, (err, result) => {
                            return res.status(200).json({
                                form: result[0]["FORM_OBJ"]
                            });
                        })
                    })
                }
            })

        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})

