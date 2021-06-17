  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // if sign up succeeds we will log them in
      // if (response.ok) {
      //   const response = await fetch('/api/users/login', {
      //     method: 'POST',
      //     body: JSON.stringify({ email, password }),
      //     headers: { 'Content-Type': 'application/json' },
      //   });
    
        if (response.ok) {
          document.location.replace('/post');
        } else {
          alert(response.statusText);
        }
      }
  };
   
  document
    .getElementById('.signup-form')
    .addEventListener('submit', signupFormHandler);