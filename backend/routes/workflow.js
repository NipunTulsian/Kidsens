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