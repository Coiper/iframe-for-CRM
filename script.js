import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

(async function () {
  const sdk = await new AppExtensionsSDK().initialize();
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("jobForm");
  const submitButton = document.getElementById("submit");

  const apiKey = "863234d90e1195023e56aca3ac90bb8102d1d577";
  const url = `https://api.pipedrive.com/v1/deals?api_token=${apiKey}`;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitButton.style.backgroundColor = "red";
    submitButton.value = "Sent";

    const jobFormData = {};
    const formData = new FormData(event.target);

    jobFormData.firstName = formData.get("first-name");
    jobFormData.lastName = formData.get("last-name");
    jobFormData.phone = formData.get("phone");
    jobFormData.email = formData.get("email");

    jobFormData.jobType = formData.get("job-type");
    jobFormData.jobSource = formData.get("job-source");
    jobFormData.jobDescription = formData.get("job-description");

    jobFormData.address = formData.get("address");
    jobFormData.city = formData.get("city");
    jobFormData.state = formData.get("state");
    jobFormData.zipCode = formData.get("zip-code");
    jobFormData.area = formData.get("area");

    jobFormData.date = formData.get("date");
    jobFormData.startTime = formData.get("start-time");
    jobFormData.endTime = formData.get("end-time");
    jobFormData.testSelect = formData.get("test-select");

    console.log(jobFormData);

    async function sendJobFormData(data) {
      await fetch("/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          document.body.textContent = "";
          document.body.setAttribute("align", "center");
          const title = document.createElement("h1");
          title.textContent = "Job is created!";
        })
        .catch((err) => {
          console.log(err.message);
          document.body.textContent = "";
          document.body.setAttribute("align", "center");
          const title = document.createElement("h1");
          title.textContent = err.message;
        });
    }
    sendJobFormData(jobFormData);
  });
});
