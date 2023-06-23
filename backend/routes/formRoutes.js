const express = require('express');
const jwt = require('jsonwebtoken')
const util = require('util');
const db = require("../config/setupdb.js")
router = express.Router()
const { protectAdmin, protectTherapist, protectParent, protectTherapistAdmin } = require("../middleware/usermiddleware")

module.exports = router;

router.use("/saveForm", protectTherapistAdmin, async (req, res) => {
    try {
        const query = util.promisify(db.query).bind(db);
        let form_obj1 = req.body.form_obj;
        form_obj1 = db.escape(form_obj1)

        const sender_type = req.body.sender_type
        const sender_id = jwt.verify(req.body.sender_id, "abc123").id
        const form_obj = JSON.parse(req.body.form_obj);
        var form_name = null;
        var form_id = null;
        if (form_obj[0].type === "header") {
            form_name = form_obj[0]["label"];
        }
        form_name = form_name?.trim();
        form_name = db.escape(form_name)
        var query2 = `Insert into forms Values (NULL,${form_name})`;
        let result = await query(query2);
        form_id = result.insertId;
        destructure_form_obj(form_obj, form_id);

        query2 = `Insert into forms_obj value('${form_id}',${form_obj1},'${sender_type}','${sender_id}')`;

        await query(query2);
        return res.status(200).json("Form added")

    }
    catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
})

router.use("/editForm", protectTherapistAdmin, async (req, res) => {
    try {
        const query = util.promisify(db.query).bind(db);
        let form_obj1 = req.body.form_obj;
        let form_id = req.body.id;
        form_obj1 = db.escape(form_obj1)

        const form_obj = JSON.parse(req.body.form_obj);
        var form_name = null;
        if (form_obj[0].type === "header") {
            form_name = form_obj[0]["label"];
        }
        form_name = form_name?.trim();
        form_name = db.escape(form_name)
        var que_query = `delete from Marks where FORM_Id='${form_id}'`;
        await query(que_query);
        que_query = `delete from ANSWERS where FORM_Id='${form_id}'`;
        await query(que_query);
        que_query = `delete from questions where FORM_ID='${form_id}'`;
        await query(que_query);
        que_query = `update forms set FORM_NAME=${form_name} where FORM_ID='${form_id}'`;
        await query(que_query);

        destructure_form_obj(form_obj, form_id);
        que_query = `update forms_obj set FORM_OBJ=${form_obj1} where FORM_ID='${form_id}'`

        await query(que_query);
        return res.status(200).json("Form edited")
    }
    catch (err) {
        return res.status(500).json(err);
    }
})

router.use("/getFormObject", async (req, res) => {
    try {
        const { id } = req.body
        let query = `select FORM_OBJ from forms_obj where FORM_ID='${id}'`;
        db.query(query, (err, result) => {
            return res.status(200).json({
                form: result[0]?.FORM_OBJ
            });
        })
    }
    catch (err) {

        res.sendStatus(500)
    }
})

router.use("/deleteForm", protectTherapist, async (req, res) => {
    try {
        const query = util.promisify(db.query).bind(db);
        let { id } = req.body;
        var que_query = `delete from Marks where FORM_Id='${id}'`;
        await query(que_query);
        que_query = `delete from ANSWERS where FORM_Id='${id}'`;
        await query(que_query);
        que_query = `delete from student_answers where QUESTION_ID in (select QUESTION_ID from questions where FORM_ID='${id}')`;
        await query(que_query);
        que_query = `delete from questions where FORM_ID='${id}'`;
        await query(que_query);
        que_query = `delete from default_AssessFormMap where FORM_ID='${id}'`;
        await query(que_query);
        que_query = `delete from AssessFormMap where FORM_ID='${id}'`;
        await query(que_query);
        que_query = `delete from forms_obj where FORM_ID='${id}'`;
        await query(que_query);
        que_query = `delete from student_responses where FORM_ID='${id}'`;
        await query(que_query);
        que_query = `delete from forms where FORM_ID='${id}'`;
        await query(que_query);

        return res.status(200).send("Deleted");
    }
    catch (e) {
        console.log(e);
        return res.status(500);
    }
})

const destructure_form_obj = async (form_obj, form_id) => {
    const query = util.promisify(db.query).bind(db);
    var que_query = "", name = "", type = "", ques_id = 0, opt_name = "", opt_query = "", category = "";
    for (let i = 0; i < form_obj.length; i++) {
        type = form_obj[i]["type"];
        if (type === "checkbox-group" || type === "radio-group" || type === "select") {
            name = form_obj[i]["label"];
            name = name?.trim()
            name = db.escape(name);
            Max_Marks = parseInt(form_obj[i]["Marks"]);
            category = form_obj[i]["Category"];
            var options = form_obj[i]["values"];
            que_query = `Insert into questions Values(NULL,"${form_id}",${name},"${type}","${Max_Marks}","${category}")`
            let result = await query(que_query);
            ques_id = result.insertId;
            for (let j = 0; j < options.length; j++) {
                opt_name = options[j]["label"];
                opt_name = opt_name?.trim();
                opt_name = db.escape(opt_name)
                opt_query = `Insert into ANSWERS Values("${ques_id}","${form_id}",${opt_name},"${options[j]["value"]}")`;
                await query(opt_query);
            }

        }
        else if (type === "text") {
            name = form_obj[i]["label"];
            name = name?.trim()
            name = db.escape(name);
            Max_Marks = parseInt(form_obj[i]["Marks"]);
            category = form_obj[i]["Category"];
            que_query = `Insert into questions Values(NULL,"${form_id}",${name},"${type}","${Max_Marks}","${category}")`;
            let result = await query(que_query);
            ques_id = result.insertId;
            let value = form_obj[i]["value"];
            value = value?.trim()
            value = db.escape(value)
            opt_query = `Insert into ANSWERS Values("${ques_id}","${form_id}",${value},NULL)`;
            await query(opt_query);
        }
        else if (type === "file") {
            name = form_obj[i]["label"];
            name = name?.trim()
            name = db.escape(name);
            Max_Marks = parseInt(form_obj[i]["Marks"]);
            category = form_obj[i]["Category"];
            que_query = `Insert into questions Values(NULL,'${form_id}',${name},'${type}',${Max_Marks},'${category}')`;
            await query(que_query);
        }
        else if (type === "date") {
            name = form_obj[i]["label"];
            name = name?.trim()
            name = db.escape(name);
            Max_Marks = parseInt(form_obj[i]["Marks"]);
            category = form_obj[i]["Category"];
            que_query = `Insert into questions Values(NULL,'${form_id}',${name},'${type}',${Max_Marks},'${category}')`;
            await query(que_query);
        }
    }
}