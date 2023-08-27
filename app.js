document.addEventListener("DOMContentLoaded", function () {
  const inputContainer = document.getElementById("inputContainer");
  const dropdownContainer = document.getElementById("dropdownContainer");
  const inputForm = document.getElementById("inputForm");

  // CSV URL
  const csvUrl = 'income.csv';

  // Desired column headers for dropdowns (excluding "age" and "education_num")
  const desiredColumns = [
    'workclass', 'education',
    'marital_status', 'occupation', 'relationship', 'race', 'sex',
    'hours_per_week', 'native_country'
  ];

  // Parse CSV and populate dropdowns
  Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: function (results) {
      const data = results.data;

      desiredColumns.forEach(columnName => {
        const dropdownLabel = document.createElement("label");
        dropdownLabel.textContent = `${columnName}: `;

        const dropdownSelect = document.createElement("select");
        dropdownSelect.name = columnName;
        dropdownSelect.id = columnName;

        const uniqueValues = [...new Set(data.map(row => row[columnName]))];
        const sortedValues = (columnName === 'hours_per_week')
          ? uniqueValues.map(value => Number(value)).sort((a, b) => a - b)
          : uniqueValues;

        sortedValues.forEach(value => {
          const option = document.createElement("option");
          option.value = value;
          option.text = value;
          dropdownSelect.appendChild(option);
        });

        dropdownContainer.appendChild(dropdownLabel);
        dropdownContainer.appendChild(dropdownSelect);
        dropdownContainer.appendChild(document.createElement("br"));
      });
    }
  });
});

function showPredictionOnPage(predictionResult) {
  // Display the prediction result on the webpage
  const predictionDiv = document.getElementById("predictionDiv");
  predictionDiv.textContent = `Model Prediction: ${predictionResult}`;
}

function submitForm() {
  const ageInput = document.getElementById("age");
  const ageValue = ageInput.value;

  const formData = {};

  formData['age'] = ageValue;

  const dropdowns = document.querySelectorAll("select");

  dropdowns.forEach(dropdown => {
    const dropdownName = dropdown.name;
    const dropdownValue = dropdown.value;
    formData[dropdownName] = dropdownValue;
  });

  // Log the data to the console
  console.log(formData);

  // Send the form data to the Flask endpoint
  fetch('http://127.0.0.1:5501/predict', {  // Replace with your Flask server URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'formData': formData }) // Wrap form data in an object with key 'formData'
  })
  .then(response => response.json())
  .then(data => {
    // Process the data returned from the backend (display predictions)
    var predictionResult = data.result;
    //console log the data type of predictionResult
    console.log(typeof(predictionResult));
    // convert predictionResult to float
    predictionResult = parseFloat(predictionResult);
    console.log(predictionResult);
    console.log(typeof(predictionResult));
    // if prediction is <.5 then return 'income >50K' else return 'income <=50K'
    if (predictionResult > .5) {
      Result = 'Income >50K';
    } else {
      Result = 'Income <=50K';
    }
    showPredictionOnPage(Result);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error sending data:', error);
  });
}
