let mediaRecorder;
let audioChunks = [];

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const formData = new FormData();
                formData.append('audio', audioBlob);
                
                // Send the audio to the server
                fetch('/upload-audio', {
                    method: 'POST',
                    body: formData
                }).then(response => response.json())
                  .then(data => {
                      document.getElementById('transcript').textContent = data.transcript;
                  });
            });
        });
}

function stopRecording() {
    mediaRecorder.stop();
}

function submitText() {
    const text = document.getElementById('textInput').value;
    
    fetch('/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
    }).then(response => response.blob())
      .then(blob => {
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          audio.play();
      });
}

document.getElementById('tts-form').onsubmit = async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/text_to_speech', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    document.getElementById('response').innerText = result.message;
};

document.getElementById('stt-form').onsubmit = async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    document.getElementById('response').innerText = result.transcript;
};
