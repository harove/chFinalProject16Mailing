const formLogin = document.querySelector('form')

formLogin?.addEventListener('submit', async event => {
  event.preventDefault()
  try{
    const response = await fetch('/api/sesiones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(formLogin))
    })

    if (response.status === 201) {
      const sesion = await response.json()
      alert(JSON.stringify(sesion))
      window.location.href = '/products'
    } else {
      const error = await response.json()
      alert(error.message)
    }
  }
  catch(error){
    console.log(error)
  }
})