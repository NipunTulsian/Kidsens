/*
This has been updated to use the new userData method available in formRender
*/

// http://localhost:3001/formSubmit.html?id=1234&userName=arjun+dosajh -> id = 1234 and name = arjun dosajh
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// const userName = urlParams.get("name");
// console.log(id, userName);
const fbRender = document.getElementById("fb-render");
async function fetchForm() {
  const serverRes = await fetch("http://localhost:8000/get-FormObject", {
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
    let originalFormData = JSON.parse(serverResJson.form);

    jQuery(function ($) {
      const formData = JSON.stringify(originalFormData)

      $(fbRender).formRender({ formData });
    });
  }
}
fetchForm()