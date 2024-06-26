const formLogout = document.querySelector('form')
const spans = document.querySelectorAll('span')

formLogout?.addEventListener('submit', async event => {
  event.preventDefault()

  const response = await fetch('/api/sesiones/current', {
    method: 'DELETE'
  })

  // document.cookie = 'authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost; Secure; SameSite=None;';
  document.cookie = 'authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None;';

  if (response.status === 204) {
    window.location.href = '/login'
  } else {
    const error = await response.json()
    alert(error.message)
  }
})


window.addEventListener('load', async ()=>{
  const response = await fetch('/api/usuarios/current')

  if (response.status === 401) {
    alert('necesitas loguearte para ver esta info!')
    return (window.location.href = '/login')
  }

  const result = await response.json()
  const usuario = result

  spans[0].innerHTML = usuario.first_name
  spans[1].innerHTML = usuario.last_name
  spans[2].innerHTML = usuario.email

})