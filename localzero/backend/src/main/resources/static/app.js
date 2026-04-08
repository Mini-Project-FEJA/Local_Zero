fetch('/app/something')
    .then(response => response.text())
    .then(something => {
        const container = document.getElementById('something');
        container.innerHTML = JSON.stringify(something);
    })
    .catch(err => console.error(err))