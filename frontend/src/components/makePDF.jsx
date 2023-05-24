import { Typography } from "@mui/material";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Line,
  Font,
  Svg,
} from "@react-pdf/renderer";
const urlParams = new URLSearchParams(window.location.search);
const form_id = urlParams.get("id");
console.log(form_id)
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

// Create styles
const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
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
    paddingBottom: 65,
  },
});

// Create Document Component
function BasicPDFDocument() {
  const getReportDetails = async () => {
    const serverRes = await fetch("http://localhost:8000/get-report", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
      },
      body: JSON.stringify({
        id: form_id,
        student: localStorage.getItem("User"),
      })
    })

    if (serverRes.status === 200) {
      const serverJson = await serverRes.json()
      setStudent({
        c_fname: serverJson.student.c_fname,
        c_lanme: serverJson.student.c_lname,
        c_DOB: serverJson.student.c_DOB,
        gender: serverJson.student.c_gender,
        diagnosis: serverJson.student.c_fname,
        TherapistName: serverJson.student.Assigned_Therapist,
        stage: serverJson.stage.stage,
        assessment: serverJson.stage.assessment,
        form_name: serverJson.form.FORM_NAME
      })
      getQuestions(serverJson.stage.stage,serverJson.stage.assessment)
      
    }
  }
  const getQuestions = async (stage,assess) => {
    const serverRes = await fetch("http://localhost:8000/get-questionsReport", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
      },
      body: JSON.stringify({
        id: form_id,
        student: localStorage.getItem("User")
      })
    })
    if (serverRes.status === 200) {
      const serverResJson = await serverRes.json()
      console.log(serverResJson)
      setTotal(serverResJson.sum)
      setMaxTotal(serverResJson.max_sum)
      setMarksArr(serverResJson.questions)
      setNameArr(serverResJson.question_desc)
      getScale(stage,assess,100*(serverResJson.sum/serverResJson.max_sum))
    }
  }
  const getScale = async (stage,assessment,percentage) => {
    const serverRes = await fetch("http://localhost:8000/get-scale", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
      },
      body: JSON.stringify({
        stage:stage,
        assessment:assessment,
        percentage:percentage
      })
    })
    if(serverRes.status==200)
    {
      let serverResJson= await serverRes.json()
      setScale(serverResJson.status)
      setMessage(serverResJson.message)
    }
  }
  let totalMarksObtained, maximumMarks
  const [student, setStudent] = React.useState({
    c_fname: "",
    c_lanme: "",
    c_DOB: "",
    gender: "",
    diagnosis: "",
    TherapistName: "",
    stage: "",
    assessment: "",
    form_name: ""
  })
  const [scale, setScale] = React.useState("")
  const [total, setTotal] = React.useState(0)
  const [maxtotal, setMaxTotal] = React.useState(0)
  const [marksArr, setMarksArr] = React.useState([]);
  const [nameArr, setNameArr] = React.useState([])
  const [message,setMessage] =React.useState("")
  React.useEffect(() => {
    getReportDetails()
  }, [])
  for (let i = 0; i < marksArr.length; i++) {
    totalMarksObtained += marksArr[i].marksObtained;
    maximumMarks += marksArr[i].maximumMarks;
    let temp = (100 * marksArr[i].marksObtained / marksArr[i].maximumMarks).toFixed(2)
    marksArr[i].percentage = temp;
  }
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.body}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: '0px 0px 15px 0px'
            }}
          >
            <Image
              style={{ width: "23%" }}
              src={require("../logo.png")}
            ></Image>
            <Text
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                fontFamily: "Times-Roman",
              }}
            >
              Centre Form Report
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "10px 25px 15px 25px",
              justifyContent: "space-around",
              alignItems: "space-between",
              backgroundColor: '#E0FFFF',
              padding: "10px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Text style={{ fontSize: "9px", color: "#5A5A5A" }}>
                Child Name:{" "}
                <span>
                  <Text style={{ color: "black" }}>{student.c_fname + " " + student.c_lanme}</Text>
                </span>{" "}
              </Text>
              <Text style={{ fontSize: "9px", color: "#5A5A5A" }}>
                Child DOB:{" "}
                <span>
                  <Text style={{ color: "black" }}>{student.c_DOB}</Text>
                </span>
              </Text>
              <Text style={{ fontSize: "9px", color: "#5A5A5A" }}>
                Gender:{" "}
                <span>
                  <Text style={{ color: "black" }}>{student.gender}</Text>
                </span>
              </Text>
              <Text style={{ fontSize: "9px", color: "#5A5A5A" }}>
                Diagonosis:{" "}
                <span>
                  <Text style={{ color: "black" }}>{student.diagnosis}</Text>
                </span>
              </Text>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Text style={{ fontSize: "9px", color: "#5A5A5A" }}>
                Therapist Name:{" "}
                <span>
                  <Text style={{ color: "black" }}>{student.TherapistName}</Text>
                </span>{" "}
              </Text>
              <Text style={{ fontSize: "9px", color: "#5A5A5A" }}>
                Stage:{" "}
                <span>
                  <Text style={{ color: "black" }}>{student.stage}</Text>
                </span>
              </Text>
              <Text style={{ fontSize: "9px", color: "#5A5A5A" }}>
                Assessment:{" "}
                <span>
                  <Text style={{ color: "black" }}>{student.assessment}</Text>
                </span>
              </Text>
              <Text style={{ fontSize: "9px", color: "#5A5A5A" }}>
                Percentage:{" "}
                <span>
                  <Text style={{ color: "black" }}>{(100 * total / maxtotal).toFixed(2)}%</Text>
                </span>
              </Text>
            </div>
          </div>
          {marksArr.map((ques, idx) => (
            <div style={{ backgroundColor: '#FFF0F5', margin: "0px 25px 0px 25px", display: 'flex', flexDirection: 'column', padding: '15px 45px', fontSize: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', color: '#5A5A5A' }}>Question {idx + 1}: {nameArr[idx]["Question"]} </Text>
                <Text><span><Text style={{ color: '#5A5A5A', fontWeight: 'bold' }}>Score: </Text></span>{ques.Marks_Obtained}/{ques.Max_Marks}  {"("}{(100 * ques.Marks_Obtained / ques.Max_Marks).toFixed(2)}%{")"}</Text>
              </div>
              <Text>{ques.description}</Text>
            </div>
          ))}
          <div style={{ backgroundColor: '#E6FFE6', margin: "20px 25px", display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '15px 45px', fontSize: '14px' }}>
            <Text><span><Text style={{ color: '#5A5A5A', fontWeight: 'bold' }}>Assessment Scale: </Text></span>{scale}</Text>
            <Text><span><Text style={{ color: '#5A5A5A', fontWeight: 'bold' }}>Total Score: </Text></span>{total}/{maxtotal}  {"("}{100 * total / maxtotal}%{")"}</Text>
            <Text><span><Text style={{ color: '#5A5A5A', fontWeight: 'bold' }}>Recommendation: </Text></span>{message}</Text>
          </div>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}\n Copyright - 2023, Powered by Kidsens`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default BasicPDFDocument;
