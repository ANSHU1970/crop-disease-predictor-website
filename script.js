function previewImage(event, previewId) {
    const output = document.getElementById(previewId);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.style.display = 'block';
}

function predictPotatoDisease() {
    triggerPrediction('potatoImageUpload', 'potatoLoader', 'potatoResult', 'https://potato-disease-api-9cqs.onrender.com/predict');
}

function predictTomatoDisease() {
    triggerPrediction('tomatoImageUpload', 'tomatoLoader', 'tomatoResult', 'https://tomato-disease-api.onrender.com/predict');
}

function predictRiceDisease() {
    triggerPrediction('riceImageUpload', 'riceLoader', 'riceResult', 'https://crop-rice-disease-api.onrender.com/predict');
}

function predictWheatDisease() {
    triggerPrediction('wheatImageUpload', 'wheatLoader', 'wheatResult', 'https://wheat-disease-api.onrender.com/predict');
}

function triggerPrediction(inputId, loaderId, resultId, apiUrl) {
    const imageFile = document.getElementById(inputId).files[0];
    if (imageFile) {
        document.getElementById(loaderId).style.display = 'block';
        callApi(imageFile, apiUrl, resultId, loaderId);
    }
}

function callApi(imageFile, apiUrl, resultId, loaderId) {
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
        })
        .finally(() => {
            document.getElementById(loaderId).style.display = 'none';
        });
}
