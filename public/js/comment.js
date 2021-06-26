async function newFormHandler(event) {
    event.preventDefault();

    const content = document.querySelector('#comment-body').value;
    const post_id = document.querySelector('#post-id').value;

    if (content && post_id) {
        await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    console.log(content, post_id)

        // document.location.reload();
    }
    // const response = await 

    // if (response.ok) {
    // } else {
    //     alert(response.statusText);
    // }
}

document.querySelector('button[type=submit]').addEventListener('click', newFormHandler);