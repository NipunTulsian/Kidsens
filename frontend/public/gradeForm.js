const urlParams = new URLSearchParams(window.location.search);
const form_id = urlParams.get("id");
const fbRender1 = document.getElementById("fb-render");
const fbRender2 = document.getElementById("fb-render2");
var originalFormData = null, filled_response = null, questions = null, marks_auto = null;
const studentId = urlParams.get("student")
const env = {
  API_URL: 'http://localhost:8000',
};

const handleSaveMarks = async () => {
  marks = []
  for (let i = 0; i < window.questions.length; i++) {
    marks.push({
      QUESTION_ID: window.questions[i]["QUESTION_ID"],
      Marks_Obtained: parseInt(document.getElementById(`${window.questions[i]["QUESTION_ID"]}`).value),
      Max_Marks: parseInt(document.getElementById(`${window.questions[i]["QUESTION_ID"]}_total`).value)
    })
  }
  const serverRes = await fetch(`${env.API_URL}/report/saveMarks`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
    },
    body: JSON.stringify({
      id: studentId,
      form_Id: form_id,
      marks: marks
    })
  })
  if (serverRes.status == 200) {
    window.alert("Form Graded Succesfully")
    history.back()
  }
}
async function gradeForm() {
  const serverRes = await fetch(`${env.API_URL}/report/getResponses`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
    },
    body: JSON.stringify({
      id: form_id,
      student: studentId
    })
  })

  if (serverRes.status === 200) {
    const serverResJson = await serverRes.json()
    console.log(serverResJson.marks)
    originalFormData = serverResJson.original
    filled_response = serverResJson.student
    questions = serverResJson.question
    marks_auto = serverResJson.marks

    jQuery(function ($) {
      var formData = originalFormData
      $(fbRender2).formRender({ formData });
      if (filled_response) {
        var formData = filled_response
        $(fbRender1).formRender({ formData });
      }
      else {
        $(fbRender1).formRender({});
      }
    });

    function getMarks(que_id){
      for(let i=0;i<marks_auto.length;i++){
        if(que_id===marks_auto[i].QUESTION_ID) return marks_auto[i].Marks_Obtained
      }
      return 0;
    }

    const grade = document.querySelector(".grade")
    let cntQues = serverResJson.question.length
    console.log(serverResJson.question)
    let marksOfQuestions = []
    for (let i = 0; i < cntQues; i++) {
      marksOfQuestions.push({
        maxMarks: questions[i].max_marks,
        obtainedMarks: getMarks(questions[i].QUESTION_ID),
        QUESTION_ID: questions[i].QUESTION_ID
      })
    }
    let gradeHTMLstr = ''
    for (let i = 0; i < cntQues; i++) {
      if (filled_response)
        gradeHTMLstr +=
          `
        <div class="grade-inner">
            <h3>Q${i + 1}</h3>
            <input  id = "${marksOfQuestions[i]["QUESTION_ID"]}" type="text" placeholder="Marks Obtained" value='${marksOfQuestions[i].obtainedMarks}' >
            <h3>/</h3>
            <input id = "${marksOfQuestions[i]["QUESTION_ID"]}_total" class="maxMark" type="text" placeholder="Max Marks" value='${marksOfQuestions[i].maxMarks}'>
        </div>
    `
    }
    if (!filled_response) gradeHTMLstr += "<h1>FORM NOT FILLED YET</h1>"
    grade.innerHTML = gradeHTMLstr

    const marksEl = document.querySelector('.marks')
    if (cntQues != 0 && filled_response) {
      marksEl.innerHTML += `<input  type="button" value="Save" onClick="handleSaveMarks()">`
    }
  }
}
gradeForm()