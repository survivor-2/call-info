async function lookupNumber() {
  const phoneNumber = document.getElementById("phoneInput").value.trim();
  const resultBox = document.getElementById("resultBox");

  if (!phoneNumber) {
    resultBox.textContent = "Please enter a phone number.";
    return;
  }

  const accessKey = '65bb3b6f9a4a1fc4eb452df67e16a8d7'; // Replace with your real API key
  const url = `https://apilayer.net/api/validate?access_key=${accessKey}&number=${encodeURIComponent(phoneNumber)}&country_code=IN&format=1`;

  resultBox.textContent = "Fetching details...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.success === false) {
      resultBox.textContent = `Error: ${data.error.info}`;
    } else {
      resultBox.innerText = `
✔️ Valid: ${data.valid}
🌐 Country: ${data.country_name}
📍 Location: ${data.location || 'N/A'}
📱 Carrier: ${data.carrier || 'N/A'}
🔌 Line Type: ${data.line_type || 'N/A'}
      `;
    }
  } catch (error) {
    resultBox.textContent = "Something went wrong. Please try again.";
    console.error(error);
  }
}
