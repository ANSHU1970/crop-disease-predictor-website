function previewImage(event, previewId) {
    const output = document.getElementById(previewId);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.style.display = 'block';
}

function predictPotatoDisease() {
    const imageFile = document.getElementById('potatoImageUpload').files[0];
    if (imageFile) {
        callApi(imageFile, 'https://potato-disease-api-9cqs.onrender.com/predict', 'potatoResult');
    }
}

function predictTomatoDisease() {
    const imageFile = document.getElementById('tomatoImageUpload').files[0];
    if (imageFile) {
        callApi(imageFile, 'https://tomato-disease-api.onrender.com/predict', 'tomatoResult');
    }
}

function predictRiceDisease() {
    const imageFile = document.getElementById('riceImageUpload').files[0];
    if (imageFile) {
        callApi(imageFile, 'https://crop-rice-disease-api.onrender.com/predict', 'riceResult');
    }
}

function predictWheatDisease() {
    const imageFile = document.getElementById('wheatImageUpload').files[0];
    if (imageFile) {
        callApi(imageFile, 'https://wheat-disease-api.onrender.com/predict', 'wheatResult');
    }
}

function callApi(imageFile, apiUrl, resultId) {
    const formData = new FormData();
    formData.append('file', imageFile);

    fetch(apiUrl, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById(resultId).innerText = `Disease: ${data.disease}`;
        })
        .catch(error => {
            document.getElementById(resultId).innerText = 'Error predicting disease';
            console.error('Error:', error);
        });
}
