document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let fileInput = document.getElementById("fileInput");
    let fileStatus = document.getElementById("fileStatus");

    if (fileInput.files.length === 0) {
        fileStatus.innerText = "Please select a file to upload.";
        fileStatus.style.color = "red";
        return;
    }

    let file = fileInput.files[0];
    
    // Simulate an upload process (no backend yet)
    fileStatus.innerText = `Uploading "${file.name}"...`;
    fileStatus.style.color = "blue";

    setTimeout(() => {
        fileStatus.innerText = `File "${file.name}" uploaded successfully!`;
        fileStatus.style.color = "green";
    }, 2000);
});
