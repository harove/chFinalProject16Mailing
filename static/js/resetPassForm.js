const form = document.querySelector('form')

form?.addEventListener('submit', async event => {
  event.preventDefault()

  const newPass = document.getElementById('newPass').value;
  const repeatPassword = document.getElementById('repeatPassword').value;

  const newPassError = document.getElementById('newPassError');
  const repeatPassError = document.getElementById('repeatPassError');
  newPassError.textContent = '';
  repeatPassError.textContent = '';
  
  if (newPass !== repeatPassword) {
    repeatPassError.textContent = 'Passwords do not match.';
    return;
  }
  try{
    const response = await fetch('/api/usuarios/resetPass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form))
    })

    if (response.status === 200) {
      alert(JSON.stringify(await response.json()))
    } else {
      const error = await response.json()
      alert(error.message)
    }
  }
  catch(error){
    console.log(error)
  }
})