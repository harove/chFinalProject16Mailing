const form = document.querySelector('form')

form?.addEventListener('submit', async event => {
  event.preventDefault()
  try{
    const response = await fetch('/api/usuarios/forgotpass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form))
    })

    if (response.status === 200) {
      alert(JSON.stringify('enviamos un mail de recuperación a tu correo'))
    } else {
      const error = await response.json()
      alert(error.message)
    }
  }
  catch(error){
    console.log(error)
  }
})