function registerFace() {
    var name = document.getElementById("name").value;
    var id = document.getElementById("id").value;

    fetch('/register', {
        method: 'POST',
        body: JSON.stringify({ name: name, id: id }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        var messageDiv = document.getElementById('message');
        if (data.success) {
            messageDiv.style.color = 'green';
        } else {
            messageDiv.style.color = 'red';
        }
        messageDiv.innerText = data.message;
    });
}
