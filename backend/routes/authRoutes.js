const express = require('express');
const jwt = require('jsonwebtoken')
const util = require('util');
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")
const db = require("../config/setupdb.js")
router = express.Router()
const { studentUpload, therapistUpload } = require("../config/multer_config.js")
const { protectAdmin, protectTherapist, protectParent, protectTherapistAdmin } = require("../middleware/usermiddleware")

module.exports = router;

const generateToken = (id) => {
    return jwt.sign({ id }, "abc123");
}

router.use("/studentRegister", protectAdmin, async (req, res) => {
    const query = util.promisify(db.query).bind(db);
    let { firstName, lastName, p_email, phoneNumber, admin } = req.body.data
    let therapist = req.body.therapist
    admin = jwt.verify(admin, "abc123").id
    let password = Date.now()
    console.log(password)
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
            query("INSERT INTO parent SET ?", {
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

router.use("/fillStudent", studentUpload, async (req, res) => {
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

router.use("/therapistRegister", protectAdmin, async (req, res) => {
    let { fname, lname, Email, Phone, admin } = req.body
    admin = jwt.verify(admin, "abc123").id
    let password = Date.now()
    console.log(password)
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

router.use("/fillTherapist", therapistUpload, async (req, res) => {
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
    const login_therapist = `SELECT * from therapist where Email="${email}"`;
    const query_run = util.promisify(db.query).bind(db);
    let result= await query_run(login_admin);
    if(result && result?.length>0){
        if(password.localeCompare(result[0].password)==0){
            return res.status(200).json({
                type: "admin",
                token: generateToken(email),
                flag: null
            });
        }
        else{ return res.status(400).send("wrongPass")}
    }
    result =await query_run(login_parent);
    if (result && result?.length > 0) {
        let flag = await bcrypt.compare(password, result[0].password)
        if (flag)
            return res.status(200).json({
                type: "parent",
                token: generateToken(email),
                flag: result[0].username
            });
        else res.status(400).send("wrongPass")
    }

    result = await query_run(login_therapist);

    if (result && result?.length > 0) {
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
