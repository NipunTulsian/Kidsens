/*
This has been updated to use the new userData method available in formRender
*/

// http://localhost:3001/formSubmit.html?id=1234&userName=arjun+dosajh -> id = 1234 and name = arjun dosajh
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// const userName = urlParams.get("name");
// console.log(id, userName);
const fbRender = document.getElementById("fb-render");
let originalFormData = [];
async function fetchForm() {
  const serverRes = await fetch("http://localhost:8000/get-Scores", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
    },
    body: JSON.stringify({
      id: id,
      student: localStorage.getItem("User")
    })
  })
  if (serverRes.status === 200) {
    let serverResJson = await serverRes.json()
    console.log(serverResJson.res)
    originalFormData = JSON.parse(serverResJson.form)
    jQuery(function ($) {
      const formData = JSON.stringify(originalFormData)

      $(fbRender).formRender({ formData });
    });

    const grade = document.querySelector(".grade")
    const marksTxtEl = document.getElementById('marksTxt')
    let marksOfQuestions = serverResJson.res
    let cntQues = marksOfQuestions.length
    let gradeHTMLstr = ''
    let marksObt = 0, totalMarks = 0
    if (cntQues > 0) {
      for (let i = 0; i < cntQues; i++) {
        totalMarks += marksOfQuestions[i].Max_Marks
        marksObt += marksOfQuestions[i].Marks_Obtained
        gradeHTMLstr +=
          `
          <div class="grade-inner">
              <h3>Q${i + 1}</h3>
              <input disabled type="text" placeholder="Marks Obtained" value='${marksOfQuestions[i].Marks_Obtained}'>
              <h3>/</h3>
              <input disabled type="text" placeholder="Max Marks" value='${marksOfQuestions[i].Max_Marks}'>
          </div>
      `
      }
    }
    else
      gradeHTMLstr += "<h1>NOT GRADED YET</h1>"
    grade.innerHTML = gradeHTMLstr
    marksTxtEl.textContent = `Marks Obtained: ${marksObt}/${totalMarks}`

  }
}
fetchForm()