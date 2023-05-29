const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const util = require('util');
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")
const sql = require('mysql')
const db = require("../config/setupdb.js")
const { studentUpload, therapistUpload } = require("../config/multer_config.js")
router = express.Router()
const { protectAdmin, protectTherapist, protectParent, protectTherapistAdmin } = require("../middleware/usermiddleware")

const fs = require("fs")
const path = require("path")


module.exports = router;
router.use("/student-register", protectAdmin, async (req, res) => {
    const query = util.promisify(db.query).bind(db);
    let { firstName, lastName, p_email, phoneNumber, admin } = req.body.data
    let therapist = req.body.therapist
    admin = jwt.verify(admin, "abc123").id
    let password = Date.now()
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password.toString(), salt);
    const query_call = `Select COUNT(p_email) as num from parent where p_email= "${p_email}"`;
    var query_que = `Select COUNT(Email) as num from therapist where Email= "${p_email}"`
    var result = await query(query_que)
    if (result[0].num > 0) {
        return res.status(400).send("Email Already Exists")
    }
    query_que = `Select COUNT(email) as num from admin where email= "${p_email}"`
    result = await query(query_que)
    if (result[0].num > 0) {
        return res.status(400).send("Email Already Exists")
    }
    query(query_call, function (err, result, fields) {
        if (result && result[0].num > 0) {
            return res.status(400).send("Already Exists");
        }
        else {
            let id = Date.now()
            query("INSERT INTO parent SET ?", {
                student_Id: id,
                password: hash, p_email: p_email, p_phn: phoneNumber,
                c_fname: firstName, c_lname: lastName, Assigned_Admin: admin, Assigned_Therapist: therapist
            })
            var text = `Thank you for registering with Kidsens.Please visit the below URL and enter the email and password and complete all details for your ward.\n
                email=${p_email}\n
                password=${password}\n

                http://localhost:3000`
            sendmail(p_email, text);
            res.status(200).send(req.body)
        }
    })
})

router.use("/fill-student", studentUpload, async (req, res) => {
    const { p_email, username, password, p_fname, p_lname, p_Add, c_gender, c_DOB, Diagnosis, c_ROLL_NUMBER } = req.body
    const decoded = jwt.verify(p_email, "abc123")
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const query2 = `UPDATE parent SET username="${username}", password="${hash}",p_fname="${p_fname}",p_lname="${p_lname}"
    ,p_Address= "${p_Add}", c_DOB= "${c_DOB}", c_img= "${req.files.image[0].path}", 
    c_gender= "${c_gender}", Diagnosis= "${Diagnosis}", Identity= "${req.files.identification[0].path}",Prev_Report= "${req.files.reports[0].path}",
    c_ROLL_NUMBER="${c_ROLL_NUMBER}" WHERE
    p_email="${decoded.id}"`;
    const query = `Select COUNT(p_email) as num from parent where username= "${username}"`;
    db.query(query, function (err, result, fields) {
        if (result && result[0].num > 0) {
            return res.status(400).send("Already Exists");
        }
        else {
            db.query(query2)
            res.status(200).send(req.body)
        }
    })
})

router.use("/therapist-register", protectAdmin, async (req, res) => {
    let { fname, lname, Email, Phone, admin } = req.body
    admin = jwt.verify(admin, "abc123").id
    let password = Date.now()
    const salt = await bcrypt.genSalt(10);
    const query_run = util.promisify(db.query).bind(db);
    const hash = await bcrypt.hash(password.toString(), salt);
    const query = `Select COUNT(Email) as num from therapist where Email= "${Email}"`;
    var query_que = `Select COUNT(p_email) as num from parent where p_email= "${Email}"`
    var result = await query_run(query_que)
    if (result[0].num > 0) {
        return res.status(400).send("Email Already Exists")
    }
    query_que = `Select COUNT(email) as num from admin where email= "${Email}"`
    result = await query_run(query_que)
    if (result[0].num > 0) {
        return res.status(400).send("Email Already Exists")
    }
    db.query(query, function (err, result, fields) {
        if (result && result[0].num > 0) {
            return res.status(400).send("Already Exists");
        }
        else {
            db.query("INSERT INTO therapist SET ?", {
                password: hash, Email: Email, Phone: Phone,
                fname: fname, lname: lname, Assigned_Admin: admin
            })
            var text = `Thank you for registering with Kidsens.Please visit the below URL and enter the email and password and complete all details for your ward.\n
                email=${Email}\n
                password=${password}\n

                http://localhost:3000`
            sendmail(Email, text);
            res.status(200).send(req.body)
        }
    })
})

router.use("/fill-therapist", therapistUpload, async (req, res) => {
    const { username, password, speciality, Email, Address, id } = req.body
    const salt = await bcrypt.genSalt(10);
    const decoded = jwt.verify(Email, "abc123")
    const hash = await bcrypt.hash(password, salt);
    const query2 = `UPDATE therapist SET username="${username}", password="${hash}",Address= "${Address}", image= "${req.files?.image[0].path}", 
    speciality="${speciality}", Identity= "${req.files?.Identity[0].path}",Certificate= "${req.files?.Certification[0].path}", 
    Resume= "${req.files?.Resume[0].path}", EMP_ID="${id}" WHERE
    Email="${decoded.id}"`;
    const query = `Select COUNT(Email) as num from therapist where username= "${username}"`;
    db.query(query, function (err, result, fields) {
        if (result && result[0].num > 0) {
            return res.status(400).send("Already Exists");
        }
        else {
            db.query(query2)
            res.status(200).send(req.body)
        }
    })
})

router.use("/login", async (req, res) => {
    const { email, password } = req.body;
    const login_admin = `SELECT * from admin where email="${email}"`
    const login_parent = `SELECT * from parent where p_email="${email}"`
    const login_therapist = `SELECT * from therapist where Email="${email}"`
    db.query(login_admin, async function (err, result, fields) {
        if (result && result.length > 0) {
            if (result[0].password = password)
                return res.status(200).json({
                    type: "admin",
                    token: generateToken(email),
                    flag: null
                });
            else res.status(400).send("wrongPass")
        }
        else {
            db.query(login_parent, async function (err, result, fields) {
                if (result && result.length > 0) {
                    let flag = await bcrypt.compare(password, result[0].password)
                    if (flag)
                        return res.status(200).json({
                            type: "parent",
                            token: generateToken(email),
                            flag: result[0].username
                        });
                    else res.status(400).send("wrongPass")
                }
                else {
                    db.query(login_therapist, async function (err, result, fields) {
                        if (result && result.length > 0) {
                            let flag = await bcrypt.compare(password, result[0].password)
                            if (flag)
                                return res.status(200).json({
                                    type: "therapist",
                                    token: generateToken(email),
                                    flag: result[0].username
                                });
                            else res.status(400).send("wrongPass")
                        }
                        else {
                            res.sendStatus(400)
                        }
                    })
                }
            })
        }
    })
})

const sendmail = (email, text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: 'nipun.tulsian.nt@gmail.com',
            pass: 'dlfffkzuncdwwizc',
        },
    });

    var mailOptions = {
        from: 'nipun.tulsian.nt@gmail.com',
        to: email,
        subject: 'Welcome to Kidsens',
        text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

router.use("/display-student", protectAdmin, async (req, res) => {
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

router.use("/get-students", protectTherapist, async (req, res) => {
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
router.use("/get-therapist", protectTherapist, async (req, res) => {
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

router.use("/display-therapist", protectAdmin, async (req, res) => {
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

router.use("/delete-student", protectAdmin, async (req, res) => {
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

router.use("/delete-therapist", protectAdmin, async (req, res) => {
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

router.use("/save-form", protectTherapistAdmin, async (req, res) => {
    try {
        const form_obj1 = req.body.form_obj;
        const sender_type = req.body.sender_type
        const sender_id = jwt.verify(req.body.sender_id, "abc123").id
        const form_id = Date.now();
        var query1 = `Insert into forms_obj value('${form_id}','${form_obj1}','${sender_type}','${sender_id}')`;
        const form_obj = JSON.parse(req.body.form_obj);
        var form_name = null;
        if (form_obj[0].type === "header") {
            form_name = form_obj[0]["label"];
        }
        var query2 = `Insert into forms Values ('${form_id}','${form_name}')`;

        db.query(query2, function (err, result) {
            destructure_form_obj(form_obj, form_id);
        });
        db.query(query1, (err, result) => {
            if (err) {

            }

            return res.status(200).json("Form added")
        })
    }
    catch (err) {

        return res.status(500).json(err);
    }
})
router.use("/create-stage", protectAdmin, async (req, res) => {
    try {
        let { id, stage_name, position } = req.body
        id = jwt.verify(id, "abc123").id
        db.query(`Update default_stages set position= position+1 where position >=${position} and admin_Id = '${id}';`)
        db.query(`Insert into default_stages values ('${id}','${stage_name}',${position})`, (err, result) => {

            res.sendStatus(200);
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})
router.use("/delete-stage", protectAdmin, async (req, res) => {
    try {
        let { id, stage_name } = req.body
        id = jwt.verify(id, "abc123").id
        db.query(`select position from default_stages where admin_Id='${id}' and stage = '${stage_name}'`, (err, result) => {
            db.query(`UPDATE default_stages set position = position -1 where position>${result[0]["position"]}`)
            db.query(`DELETE from default_assessments where admin_Id= '${id}' and stage='${stage_name}'`)
        })
        db.query(`DELETE from default_stages where admin_Id= '${id}' and stage = '${stage_name}'`, (err, result) => {

            res.sendStatus(200);
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})
router.use("/get-stages", async (req, res) => {
    try {
        const { id } = req.body
        var query = `select Assigned_Admin from parent where student_Id=${id}`;
        db.query(query, (err, result) => {
            var admin = result[0]["Assigned_Admin"]
            query = `select stage from default_stages where admin_Id="${admin}" order by position`;
            db.query(query, (err, result) => {

                var arr = []
                for (let i = 0; i < result.length; i++) {
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
router.use("/create-default-assessment", protectAdmin, async (req, res) => {
    try {
        console.log(req.body)
        let { id, stage_name, assess_name, sevUp, mildUp, message_severe, message_moderate, message_mild } = req.body
        id = jwt.verify(id, "abc123").id
        db.query(`Insert into default_assessments values ('${id}','${stage_name}','${assess_name}',${mildUp},${sevUp},'${message_mild}','${message_severe}','${message_moderate}')`, (err, result) => {
            res.sendStatus(200);
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})
router.use("/delete-default-assessment", protectAdmin, async (req, res) => {
    try {
        let { id, stage_name, assess_name } = req.body
        id = jwt.verify(id, "abc123").id
        db.query(`delete from default_assessments where admin_Id = '${id}' and stage = '${stage_name}' and assessment= '${assess_name}'`, (err, result) => {

            res.sendStatus(200);
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})
router.use("/get-default-stages", protectAdmin, async (req, res) => {
    try {
        let { id } = req.body

        id = jwt.verify(id, "abc123").id
        db.query(`select stage from default_stages where admin_Id = '${id}' order by position`, (err, result) => {
            arr = []
            for (let i = 0; i < result.length; i++) {
                arr.push(result[i]["stage"])
            }
            res.status(200).json({ stages: arr });
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})
router.use("/get-default-assessments", protectTherapistAdmin, async (req, res) => {
    try {
        let { id, stage } = req.body
        id = jwt.verify(id, "abc123").id
        db.query(`select assessment from default_assessments where admin_Id = '${id}' and stage= '${stage}' `, (err, result) => {
            arr = []
            for (let i = 0; i < result.length; i++) {
                arr.push(result[i]["assessment"])
            }
            res.status(200).json({ assessment: arr });
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})
router.use("/get-default-forms", protectTherapistAdmin, async (req, res) => {
    try {
        let { id, stage_name, assess_name } = req.body
        id = jwt.verify(id, "abc123").id
        arr_used = []
        arr_unused = []
        db.query(`select * from forms where FORM_ID IN (select FORM_ID from default_AssessFormMap where admin_Id = '${id}' and stage= '${stage_name}' and assessment= '${assess_name}')`, (err, result) => {
            for (let i = 0; i < result.length; i++) {
                arr_used.push(result[i])
            }
            db.query(`select * from forms where FORM_ID NOT IN (select FORM_ID from default_AssessFormMap where admin_Id = '${id}' and stage= '${stage_name}' and assessment= '${assess_name}') `, (err, result) => {
                for (let i = 0; i < result.length; i++) {
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
router.use("/add-default-map", protectTherapistAdmin, async (req, res) => {
    try {
        let { id, stage_name, assess_name, forms } = req.body
        id = jwt.verify(id, "abc123").id
        const query = util.promisify(db.query).bind(db);
        for (let i = 0; i < forms.length; i++) {
            await query(`insert into default_AssessFormMap values ('${id}','${stage_name}','${assess_name}','${forms[i]}')`)
        }
        res.sendStatus(200)
    }
    catch (err) {

        res.sendStatus(500)
    }
})
const destructure_form_obj = async (form_obj, form_id) => {
    const query = util.promisify(db.query).bind(db);
    var que_query = "", name = "", type = "", ques_id = 0, opt_name = "", opt_query = "",category="";
    for (let i = 0; i < form_obj.length; i++) {
        type = form_obj[i]["type"];
        if (type === "checkbox-group" || type === "radio-group" || type === "select") {
            name = form_obj[i]["label"];
            Max_Marks = form_obj[i]["Marks"];
            category=form_obj[i]["Category"];
            ques_id = Date.now();
            var options = form_obj[i]["values"];
            que_query = `Insert into questions Values('${ques_id}','${form_id}','${name}','${type}',${Max_Marks},'${category}')`
            await query(que_query);
            for (let j = 0; j < options.length; j++) {
                opt_name = options[j]["label"];
                opt_query = `Insert into ANSWERS Values('${ques_id}','${form_id}','${opt_name}','${options[j]["selected"] ? 1 : 0}')`;
                await query(opt_query);
            }

        }
        else if (type === "text") {
            name = form_obj[i]["label"];
            Max_Marks = form_obj[i]["Marks"];
            category=form_obj[i]["Category"];
            ques_id = Date.now();
            que_query = `Insert into questions Values('${ques_id}','${form_id}','${name}','${type}',${Max_Marks},'${category}')`;
            await query(que_query);
            opt_query = `Insert into ANSWERS Values('${ques_id}','${form_id}','${form_obj[i]["value"]}',NULL)`;
            await query(opt_query);
        }
        else if (type === "file") {
            name = form_obj[i]["label"];
            Max_Marks = form_obj[i]["Marks"];
            category=form_obj[i]["Category"];
            ques_id = Date.now();
            que_query = `Insert into questions Values('${ques_id}','${form_id}','${name}','${type}',${Max_Marks},'${category}')`;
            await query(que_query);
        }
        else if (type === "date") {
            name = form_obj[i]["label"];
            ques_id = Date.now();
            Max_Marks = form_obj[i]["Marks"];
            category=form_obj[i]["Category"];
            que_query = `Insert into questions Values('${ques_id}','${form_id}','${name}','${type}',${Max_Marks},'${category}')`;
            await query(que_query);
        }
    }
}
router.use("/delete-assessment", protectTherapistAdmin, async (req, res) => {
    try {
        const { id, stage_name, assess_name } = req.body
        var query = `delete from assessments where student_Id = '${id}' and stage = '${stage_name}' and assessment= '${assess_name}'`
        db.query(query, (err, result) => {

            res.sendStatus(200);
        })
    }
    catch (err) {

        res.sendStatus(500)
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
            var temp = result[j];
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
router.use("/get-fetchPending", protectTherapist, async (req, res) => {
    try {
        const query = util.promisify(db.query).bind(db);
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
router.use("/add-assessment", protectTherapistAdmin, async (req, res) => {
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
router.use("/get-assessments", async (req, res) => {
    try {
        const { id, stage } = req.body

        db.query(`select assessment from assessments where student_Id = '${id}' and stage= '${stage}'`, (err, result) => {
            var arr = []
            for (let i = 0; i < result.length; i++) {
                arr.push(result[i]["assessment"])
            }
            res.status(200).json({ assessment: arr });
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})
router.use("/get-default-assessments-therapist", protectTherapistAdmin, async (req, res) => {
    try {
        const { id, stage } = req.body
        var query = `select Assigned_Admin from parent where student_Id=${id}`;
        db.query(query, (err, result) => {
            var admin = result[0]["Assigned_Admin"];
            db.query(`select assessment from assessments where student_Id = '${id}' and stage= '${stage}'`, (err, result) => {
                var assigned_arr = []
                for (let i = 0; i < result.length; i++) {
                    assigned_arr.push(result[i]["assessment"])
                }
                db.query(`select assessment from default_assessments where admin_Id = '${admin}' and stage= '${stage}'`, (err, result) => {
                    var arr = []
                    for (let i = 0; i < result.length; i++) {
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
router.use("/add-map", protectTherapistAdmin, async (req, res) => {
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
router.use("/get-forms", protectTherapistAdmin, async (req, res) => {
    try {
        const { id, stage_name, assess_name } = req.body
        var arr_used = []
        var arr_unused = []
        var query = `select * from forms where FORM_ID IN (select FORM_ID from AssessFormMap where student_Id = '${id}' and stage= '${stage_name}' and assessment= '${assess_name}')`;
        db.query(query, (err, result) => {
            for (let i = 0; i < result.length; i++) {
                arr_used.push(result[i])
            }
            query = `select Assigned_Admin from parent where student_Id=${id}`;
            db.query(query, (err, result) => {
                var admin = result[0]["Assigned_Admin"];
                db.query(`select * from forms where FORM_ID IN (select FORM_ID from default_AssessFormMap where admin_Id = '${admin}' and stage= '${stage_name}' and assessment= '${assess_name}') `, (err, result) => {
                    for (let i = 0; i < result.length; i++) {
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

        res.sendStatus(500)
    }
})
router.use("/get-fill", async (req, res) => {
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

router.use("/get-Scores", async (req, res) => {
    try {
        let { id, student } = req.body
        student = jwt.verify(student, "abc123").id
        db.query(`select Form_Response from student_responses where FORM_ID = '${id}' and student_Id = '${student}'`, (err, result) => {

            db.query(`select * from Marks where student_Id='${student}' and FORM_ID = '${id}' order by QUESTION_ID`, (err, result_2) => {

                res.status(200).json({
                    form: result[0]["Form_Response"],
                    res: result_2
                })
            })
        })
    }
    catch (err) {

        return res.status(500).send("Error")
    }
})

router.use("/delete-map", protectTherapistAdmin, async (req, res) => {
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

router.use("/get-FormObject", async (req, res) => {
    try {
        const { id } = req.body
        let query = `select FORM_OBJ from forms_obj where FORM_ID='${id}'`;
        db.query(query, (err, result) => {
            return res.status(200).json({
                form: result[0]["FORM_OBJ"]
            });
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})

router.use("/get-FormObjectStudent", protectParent, async (req, res) => {
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
                    console.log(date_curr);
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

router.use("/store-FormObject", protectParent, async (req, res) => {
    try {
        let { id, form, student } = req.body
        student = jwt.verify(student, "abc123").id;
        let query = `INSERT INTO student_responses value('${student}','${id}','${form}')`;
        db.query(query, (err, result0) => {
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

router.use("/delete-default-map", protectTherapistAdmin, async (req, res) => {
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

router.use("/get-tree", protectAdmin, async (req, res) => {
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
router.use("/get-pending-forms", protectParent, async (req, res) => {
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

router.use("/get-pending-formsName", protectParent, async (req, res) => {
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
router.use("/get-student-details", protectParent, async (req, res) => {
    try {
        const id = req.body.id;
        const email = jwt.verify(id, "abc123").id;
        var query = `select * from parent where p_email='${email}'`;
        db.query(query, function (err, result) {
            console.log(result[0]);
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

router.use("/get-student-profile", protectTherapistAdmin, async (req, res) => {
    try {
        const id = req.body.id;
        var query = `select * from parent where student_Id='${id}'`;
        db.query(query, function (err, result) {
            console.log(result[0]);
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

router.use("/get-therapist-profile", protectTherapistAdmin, async (req, res) => {
    try {
        const id = req.body.id;
        var query = `select * from therapist where EMP_ID='${id}'`;
        db.query(query, function (err, result) {
            console.log(result[0]);
            return res.status(200).json(result[0]);
        })
    }
    catch (err) {
        ;
        return res.status(500).send(err);
    }

})

const generateToken = (id) => {
    return jwt.sign({ id }, "abc123");
}

router.use("/save-marks", protectTherapistAdmin, async (req, res) => {
    try {
        let { marks, id, form_Id } = req.body

        db.query(`select p_email from parent where student_Id='${id}'`, (err, result) => {
            let query = "insert into Marks values "
            for (let i = 0; i < marks.length; i++) {
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
router.use("/get-responses", async (req, res) => {
    try {
        let { id, student } = req.body
        db.query(`select p_email from parent where student_Id= '${student}'`, (err, result) => {
            db.query(`select FORM_OBJ from forms_obj where FORM_ID = '${id}'`, (err, result_original) => {
                db.query(`select Form_response from student_responses where student_Id = '${result[0]["p_email"]}' and FORM_ID = '${id}'`, (err, result_student) => {
                    db.query(`select * from questions where FORM_ID='${id}'`, (err, result_ques) => {
                        res.status(200).json({
                            original: result_original[0]["FORM_OBJ"],
                            student: result_student[0] ? result_student[0]["Form_response"] : null,
                            question: result_ques
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
router.use("/get-report", protectParent, async (req, res) => {
    try {
        let id = req.body.id
        const decoded = jwt.verify(req.body.student, "abc123");
        const email = decoded.id
        var query = `select * from parent where p_email='${email}'`;
        db.query(query, function (err, result_student) {
            query = `select * from AssessFormMap where student_Id='${result_student[0]["student_Id"]}' and FORM_ID='${id}'`;
            db.query(query, (err, result_stage) => {
                query = `select * from forms  where FORM_ID='${id}'`;
                db.query(query, (err, result_form) => {
                    return res.status(200).json({
                        student: result_student[0],
                        stage: result_stage[0],
                        form: result_form[0]
                    })
                })
            })
        })
    }
    catch (e) {
        return res.status(500).json(e)
    }
})
router.use("/get-scale", protectParent, async (req, res) => {
    try {
        const { stage, assessment, percentage } = req.body
        console.log(percentage)
        db.query(`select * from default_assessments where stage='${stage}' and assessment = '${assessment}'`, (err, result) => {
            console.log(result)
            if (percentage < result[0]["SevereUp"]) {
                res.status(200).json({
                    status: "Severe",
                    message: result[0]["message_severe"]
                })
            }
            else if (percentage < result[0]["MildUp"]) {
                res.status(200).json({ status: "Moderate", message: result[0]["message_moderate"] })
            }
            else {
                res.status(200).json({
                    status: "Mild",
                    message: result[0]["message_mild"]
                })
            }
        })
    }
    catch (e) {
        return res.status(500).json(e)
    }
})
router.use("/get-reportsMain", protectParent, async (req, res) => {
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
router.use("/get-questionsReport", protectParent, async (req, res) => {
    try {
        const id = req.body.id;
        const decoded = jwt.verify(req.body.student, "abc123");
        const email = decoded.id
        const assessment = req.body.assessment
        const stage = req.body.stage
        var query = `select * from Marks where student_Id='${email}' and FORM_ID='${id}'`
        db.query(query, (err, result_question) => {
            query = `select sum(Marks_Obtained) as total, sum(Max_Marks) as max from Marks where student_Id='${email}' and FORM_ID='${id}'`
            db.query(query, (err, result_sum) => {
                query = `select Question from questions where QUESTION_ID in (select QUESTION_ID from Marks where student_Id='${email}' and FORM_ID='${id}')`;
                db.query(query, (err, result) => {
                    return res.status(200).json({
                        questions: result_question,
                        sum: result_sum[0].total,
                        max_sum: result_sum[0].max,
                        question_desc: result,
                    })
                })
            })
        })
    }
    catch (e) {
        return res.status(500).json(e)
    }
})