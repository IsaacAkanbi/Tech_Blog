async function newFormHandler(event) {
    event.preventDefault();

    const comment = document.querySelector('#comment-body').value;

    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
            comment
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/review');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('button[type=submit]').addEventListener('click', newFormHandler);