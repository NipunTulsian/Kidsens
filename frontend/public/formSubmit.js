
// http://localhost:3001/formSubmit.html?id=1234&userName=arjun+dosajh -> id = 1234 and name = arjun dosajh
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id)
const env = {
  API_URL: 'http://localhost:8000',
};

const getUserDataBtn = document.getElementById("get-user-data");
const fbRender = document.getElementById("fb-render");
var originalFormData = null;

async function fetchForm() {
  const serverRes = await fetch(`${env.API_URL}/studentForm/getFormObjectStudent`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
    },
    body: JSON.stringify({
      id: id
    })
  })

  if (serverRes.status === 200) {
    const serverResJson = await serverRes.json();
    originalFormData = JSON.parse(serverResJson.form);
    console.log(originalFormData)
    jQuery(function ($) {
      var formData = originalFormData;
      for (idx in formData) {
        let obj = formData[idx]
        if (obj.type === "text") {
          obj.value = ""
        } else if (obj.type === "checkbox-group") {
          obj.values.map(val => val.selected = false)
        } else if (obj.type === "date") {
          obj.value = ""
        } else if (obj.type === "radio-group") {
          obj.values.map(val => val.selected = false)
        } else if (obj.type === "select") {
          obj.values.map(val => val.selected = false)
        }
      }
      formData = JSON.stringify(formData)
      var formRenderOpts = {
        fbRender,
        formData,
        // dataType: 'xml'
      };
      $(fbRender).formRender(formRenderOpts);
      getUserDataBtn.addEventListener(
        "click",
        async () => {
          let response = $(fbRender).formRender("userData")
          const serverRes = await fetch(`${env.API_URL}/studentForm/storeFormObject`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
              id: id,
              form: JSON.stringify(response),
              student: localStorage.getItem("User")
            })
          })
          if (serverRes.status == 200) {
            alert("You have finished your screening successfully, You will be getting the report shortly.")
            history.back()
          }
        },
        false
      );
    });

  }
}

fetchForm()

