import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

(async function () {
  const sdk = await new AppExtensionsSDK().initialize();
  // Now you can use sdk to interact with Pipedrive
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("jobForm");
  const submitButton = document.getElementById("submit");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitButton.style.backgroundColor = "red";
    submitButton.value = "Sent";

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Preparing data for Pipedrive
    const dealData = {
      title: `${data["first-name"]} ${data["last-name"]} - ${data["area"]}`, // Assuming first `area` is Job Type
      person_id: null, // Should be obtained or created separately if needed
      org_id: null, // Should be obtained or created separately if needed
      value: 0, // Set this based on your business logic
      currency: "USD", // Adjust as necessary
      user_id: null, // Set to the ID of the user creating the deal if necessary
      visible_to: 1, // Visibility setting, adjust as per your needs
      status: "open", // Initial status of the deal
      custom_fields: {
        // Assuming custom fields for additional data like Job Source, Description, etc.
        job_source: data["area"], // Adjust key based on Pipedrive custom field configuration
        job_description: data["job-description"],
        service_address: data["address"],
        service_city: data["city"],
        service_state: data["state"],
        service_zip_code: data["zip-code"],
        scheduled_start_date: data["start-date"],
        scheduled_start_time: data["start-time"],
        scheduled_end_time: data["end-time"],
      },
    };

    // Replace 'YOUR_API_KEY' with your actual Pipedrive API key
    const apiKey = "863234d90e1195023e56aca3ac90bb8102d1d577";
    const url = `https://api.pipedrive.com/v1/deals?api_token=${apiKey}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dealData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Deal created successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error creating the deal.");
      });
  });
});
