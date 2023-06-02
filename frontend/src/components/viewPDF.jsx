import React, { useState } from 'react'
import land from "./landing.png"
import logo from "./logo.png"
import tick from "./tick.png"
import cross from "./cross.png"
import {
    Document,
    Page,
    Text,
    StyleSheet,
    PDFViewer,
    Image,
    Circle,
    Font,
    Svg,
} from "@react-pdf/renderer";
import { useEffect } from 'react'

const urlParams = new URLSearchParams(window.location.search);
const form_id = urlParams.get("id");

Font.register({
    family: "Roboto",
    fonts: [
        {
            src: "http://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
        },
        {
            src: "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf",
            fontWeight: "bold",
        },
    ],
});

const styles = StyleSheet.create({
    section: {
        margin: 10,
        padding: 10,
    },
    title: {
        fontSize: 40,
        fontFamily: 'Roboto',
        fontWeight: "bold"
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },
    body: {
        fontFamily: "Roboto",
        backgroundColor: "#fff",
        color: "black",
        paddingTop: 35,
        paddingBottom: 35,
    },
});

export default function ViewPDF() {
    const [student, setStudent] = React.useState({
        c_fname: "",
        c_lname: "",
        c_DOB: "",
        gender: "",
        p_fname: "",
        p_lname: "",
        roll_num: ""
    })

    const [land_msg, setland_msg] = useState("");
    const [summary, set_summary] = useState("");
    const [rec, set_rec] = useState([]);

    const [speech_msg, setspeech_msg] = useState("");
    const [total_speech, set_total_speech] = useState(0);
    const [total_speech_cor, set_total_speech_cor] = useState(0);
    const [speech_correct, set_speech_correct] = useState([]);
    const [speech_incorrect, set_speech_incorrect] = useState([]);

    const [motor_msg, setmotor_msg] = useState("");
    const [total_motor, set_total_motor] = useState(0);
    const [total_motor_cor, set_total_motor_cor] = useState(0);
    const [motor_correct, set_motor_correct] = useState([]);
    const [motor_incorrect, set_motor_incorrect] = useState([]);

    const [social_msg, setsocial_msg] = useState("");
    const [total_social, set_total_social] = useState(0);
    const [total_social_cor, set_total_social_cor] = useState(0);
    const [social_correct, set_social_correct] = useState([]);
    const [social_incorrect, set_social_incorrect] = useState([]);

    const [cognition_msg, setcognition_msg] = useState("");
    const [total_cognition, set_total_cognition] = useState(0);
    const [total_cognition_cor, set_total_cognition_cor] = useState(0);
    const [cognition_correct, set_cognition_correct] = useState([]);
    const [cognition_incorrect, set_cognition_incorrect] = useState([]);

    const [emotional_msg, setemotional_msg] = useState("");
    const [total_emotional, set_total_emotional] = useState(0);
    const [total_emotional_cor, set_total_emotional_cor] = useState(0);
    const [emotional_correct, set_emotional_correct] = useState([]);
    const [emotional_incorrect, set_emotional_incorrect] = useState([]);

    const [sensory_msg, setsensory_msg] = useState("");
    const [total_sensory, set_total_sensory] = useState(0);
    const [total_sensory_cor, set_total_sensory_cor] = useState(0);
    const [sensory_correct, set_sensory_correct] = useState([]);
    const [sensory_incorrect, set_sensory_incorrect] = useState([]);

    const [behavior_msg, setbehaviour_msg] = useState("");
    const [total_behaviour, set_total_behaviour] = useState(0);
    const [total_behaviour_cor, set_total_behaviour_cor] = useState(0);
    const [behaviour_correct, set_behaviour_correct] = useState([]);
    const [behaviour_incorrect, set_behaviour_incorrect] = useState([]);

    const [lower, setlower] = useState(null);
    const [upper, setupper] = useState(null);

    const getDetails = async () => {
        const serverRes = await fetch("http://localhost:8000/get-report-details", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: form_id,
            })
        })
        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json();
            set_summary(serverResJson.summary);
            setStudent({
                c_fname: serverResJson.student.c_fname,
                c_lname: serverResJson.student.c_lname,
                c_DOB: serverResJson.student.c_DOB,
                gender: serverResJson.student.c_gender,
                p_fname: serverResJson.student.p_fname,
                p_lname: serverResJson.student.p_lname,
                roll_num: serverResJson.student.c_ROLL_NUMBER
            });
            set_rec((serverResJson.rec)?.split(";"));
            setlower(serverResJson.lower);
            setupper(serverResJson.upper);
            set_total_behaviour(serverResJson.total_behaviour);
            set_total_behaviour_cor(serverResJson.total_behaviour_cor);
            set_total_sensory(serverResJson.total_sensory);
            set_total_sensory_cor(serverResJson.total_sensory_cor);
            set_total_emotional(serverResJson.total_emotional);
            set_total_emotional_cor(serverResJson.total_emotional_cor);
            set_total_cognition(serverResJson.total_cognition);
            set_total_cognition_cor(serverResJson.total_cognition_cor);
            set_total_social(serverResJson.total_social);
            set_total_social_cor(serverResJson.total_social_cor);
            set_total_motor(serverResJson.total_motor);
            set_total_motor_cor(serverResJson.total_motor_cor);
            set_total_speech(serverResJson.total_speech);
            set_total_speech_cor(serverResJson.total_speech_cor);
            set_speech_correct(serverResJson.speech_correct);
            set_speech_incorrect(serverResJson.speech_incorrect);
            set_motor_correct(serverResJson.motor_correct);
            set_motor_incorrect(serverResJson.motor_incorrect);
            set_social_correct(serverResJson.social_correct);
            set_social_incorrect(serverResJson.social_incorrect);
            set_cognition_correct(serverResJson.cognition_correct);
            set_cognition_incorrect(serverResJson.cognition_incorrect);
            set_emotional_correct(serverResJson.emotional_correct);
            set_emotional_incorrect(serverResJson.emotional_incorrect);
            set_sensory_correct(serverResJson.sensory_correct);
            set_sensory_incorrect(serverResJson.sensory_incorrect);
            set_behaviour_correct(serverResJson.behaviour_correct);
            set_behaviour_incorrect(serverResJson.behaviour_incorrect);

            for (let i = 0; i < serverResJson.details.length; i++) {
                if (serverResJson.details[i]["type"] === "general") {
                    setland_msg(serverResJson.details[i]["message"]);
                }
                else if (serverResJson.details[i]["type"] === "speech") {
                    setspeech_msg(serverResJson.details[i]["message"]);
                }
                else if (serverResJson.details[i]["type"] === "motor") {
                    setmotor_msg(serverResJson.details[i]["message"]);
                }
                else if (serverResJson.details[i]["type"] === "social") {
                    setsocial_msg(serverResJson.details[i]["message"]);
                }
                else if (serverResJson.details[i]["type"] === "cognitive") {
                    setcognition_msg(serverResJson.details[i]["message"]);
                }
                else if (serverResJson.details[i]["type"] === "emotional") {
                    setemotional_msg(serverResJson.details[i]["message"]);
                }
                else if (serverResJson.details[i]["type"] === "sensory") {
                    setsensory_msg(serverResJson.details[i]["message"]);
                }
                else if (serverResJson.details[i]["type"] === "behaviour") {
                    setbehaviour_msg(serverResJson.details[i]["message"]);
                }
            }
            console.log()
        }
    }
    useEffect(() => {
        getDetails();
    }, [])
    return (
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "relative" }}>
                        <div style={{ display: "flex", alignItems: "center" }} >
                            <Image src={land} style={{ margin: "0px auto", width: "80%", height: "200px" }}></Image>
                        </div>
                        <div style={{ marginTop: "40px", paddingLeft: "60px" }}>
                            <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                                CHILD DEVELOPMENT ({lower}-{upper} YEARS)
                            </Text>
                            <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "5px" }}></div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ width: "60%", paddingRight: "20px" }}>
                                    <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>{land_msg}</Text>
                                    <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                        REPORT
                                    </Text>
                                    <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "5px" }}></div>
                                    <Text style={{ fontSize: "12px", opacity: "0.8", marginBottom: "20px" }}>
                                        Following are  the criteria used to measure the child's development.
                                    </Text>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div style={{ display: "flex", flexDirection: "row", marginLeft: "20%", justifyContent: "space-between", marginBottom: "5px" }}>
                                            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                                                DELAYED
                                            </Text>
                                            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                                                ON-TRACK
                                            </Text>
                                            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                                                ADVANCED
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                SPEECH
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                {total_speech_cor !== 0 ? <div style={{ position: "relative", width: `${Math.round(total_speech_cor * 100 / total_speech) + "%"}`, borderRadius: "10px", height: "100%", backgroundColor: "#7f53ac" }}>
                                                    <div style={{ position: "absolute", right: "-8px", top: "-2.5px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "#7f53ac", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                        <Text style={{ color: "white", fontSize: "6px" }}>
                                                            {Math.round(total_speech_cor * 100 / total_speech)}%
                                                        </Text>
                                                    </div>
                                                </div> : null}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                MOTOR
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                {total_motor_cor !== 0 ? <div style={{ position: "relative", width: `${Math.round(total_motor_cor * 100 / total_motor) + "%"}`, borderRadius: "10px", height: "100%", backgroundColor: "hotpink" }}>
                                                    <div style={{ position: "absolute", right: "-8px", top: "-2.5px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "hotpink", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                        <Text style={{ color: "white", fontSize: "7px" }}>
                                                            {Math.round(total_motor_cor * 100 / total_motor)}%
                                                        </Text>
                                                    </div>
                                                </div> : null}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                SOCIAL
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                {total_social_cor !== 0 ? <div style={{ position: "relative", width: `${Math.round(total_social_cor * 100 / total_social) + "%"}`, borderRadius: "10px", height: "100%", backgroundColor: "lightpink" }}>
                                                    <div style={{ position: "absolute", right: "-8px", top: "-2.5px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "lightpink", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                        <Text style={{ color: "white", fontSize: "7px" }}>
                                                            {Math.round(total_social_cor * 100 / total_social)}%
                                                        </Text>
                                                    </div>
                                                </div> : null}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                COGNITIVE
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                {total_cognition_cor !== 0 ? <div style={{ position: "relative", width: `${Math.round(total_cognition_cor * 100 / total_cognition) + "%"}`, borderRadius: "10px", height: "100%", backgroundColor: "#7f53ac" }}>
                                                    <div style={{ position: "absolute", right: "-8px", top: "-2.5px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "#7f53ac", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                        <Text style={{ color: "white", fontSize: "7px" }}>
                                                            {Math.round(total_cognition_cor * 100 / total_cognition)}%
                                                        </Text>
                                                    </div>
                                                </div> : null}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                EMOTIONAL
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                {total_emotional_cor !== 0 ? <div style={{ position: "relative", width: `${Math.round(total_emotional_cor * 100 / total_emotional) + "%"}`, borderRadius: "10px", height: "100%", backgroundColor: "hotpink" }}>
                                                    <div style={{ position: "absolute", right: "-8px", top: "-2.5px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "hotpink", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                        <Text style={{ color: "white", fontSize: "7px" }}>
                                                            {Math.round(total_emotional_cor * 100 / total_emotional)}%
                                                        </Text>
                                                    </div>
                                                </div> : null}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                SENSORY
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                {total_sensory_cor !== 0 ? <div style={{ position: "relative", width: `${Math.round(total_sensory_cor * 100 / total_sensory) + "%"}`, borderRadius: "10px", height: "100%", backgroundColor: "lightpink" }}>
                                                    <div style={{ position: "absolute", right: "-8px", top: "-2.5px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "lightpink", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                        <Text style={{ color: "white", fontSize: "7px" }}>
                                                            {Math.round(total_sensory_cor * 100 / total_sensory)}%
                                                        </Text>
                                                    </div>
                                                </div> : null}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                BEHAVIOUR
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                {total_behaviour_cor !== 0 ? <div style={{ position: "relative", width: `${Math.round(total_behaviour_cor * 100 / total_behaviour) + "%"}`, borderRadius: "10px", height: "100%", backgroundColor: "#7f53ac" }}>
                                                    <div style={{ position: "absolute", right: "-8px", top: "-2.5px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "#7f53ac", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                        <Text style={{ color: "white", fontSize: "7px" }}>
                                                            {Math.round(total_behaviour_cor * 100 / total_behaviour)}%
                                                        </Text>
                                                    </div>
                                                </div> : null}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ backgroundColor: "lightgrey", padding: "30px", display: "flex", flexDirection: "column", borderRadius: "10px", opacity: "0.7" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "8px" }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                Student's
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontWeight: "bold" }}>
                                                Information
                                            </Text>
                                        </div>
                                        {/* <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                School :
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                JH Ambani
                                            </Text>
                                        </div> */}
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                Name :
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                {" " + student.c_fname + " " + student.c_lname}
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                DOB :
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                {" " + student.c_DOB}
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                Gender :
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                {" " + student.gender}
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                Roll No. :
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                {" " + student.roll_num}
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                Parent :
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                {" " + student.p_fname + " " + student.p_lname}
                                            </Text>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                </Page>


                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>SPEECH AND LANGUAGE</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            SPEECH AND LANGUAGE DEVELOPMENT ({lower}-{upper} YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>{speech_msg}</Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    {(student.c_fname).toUpperCase()}'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    {speech_correct?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                    {speech_incorrect?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">{total_speech_cor + "/" + total_speech}</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>

                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>MOTOR</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            MOTOR DEVELOPMENT ({lower}-{upper} YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>{motor_msg}</Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    {(student.c_fname).toUpperCase()}'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    {motor_correct?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                    {motor_incorrect?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">{total_motor_cor + "/" + total_motor}</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>


                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>SOCIAL</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            SOCIAL DEVELOPMENT ({lower}-{upper} YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>{social_msg}</Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    {(student.c_fname).toUpperCase()}'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    {social_correct?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                    {social_incorrect?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">{total_social_cor + "/" + total_social}</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>


                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>COGNITIVE</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            COGNITIVE DEVELOPMENT ({lower}-{upper} YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    {cognition_msg}
                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    {(student.c_fname).toUpperCase()}'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    {cognition_correct?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                    {cognition_incorrect?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">{total_cognition_cor + "/" + total_cognition}</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>


                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>EMOTIONAL</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            EMOTIONAL DEVELOPMENT ({lower}-{upper} YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>{emotional_msg}</Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    {(student.c_fname).toUpperCase()}'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    {emotional_correct?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                    {emotional_incorrect?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">{total_emotional_cor + "/" + total_emotional}</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>

                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>SENSORY</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            SENSORY DEVELOPMENT ({lower}-{upper} YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    {sensory_msg}
                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    {(student.c_fname).toUpperCase()}'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    {sensory_correct?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                    {sensory_incorrect?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">{total_sensory_cor + "/" + total_sensory}</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>

                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>BEHAVIOUR</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            BEHAVIOUR DEVELOPMENT ({lower}-{upper} YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    {behavior_msg}
                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    {(student.c_fname).toUpperCase()}'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    {behaviour_correct?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                    {behaviour_incorrect?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele["Question"]}</Text>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">{total_behaviour_cor + "/" + total_behaviour}</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>

                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>SUMMARY AND</Text>
                        <Text style={styles.title}>RECOMMENDATIONS</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            SUMMARY
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "100%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    {summary}
                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    RECOMMENDATIONS
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    {rec?.map((ele, idx) => {
                                        return <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>{idx + 1}. </Text>
                                            <Text style={{ opacity: "0.6", fontSize: "12px" }}>{ele}</Text>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </Page>
            </Document>
        </PDFViewer>
    )
}
