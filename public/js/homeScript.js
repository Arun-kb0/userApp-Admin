const logoutBtn = document.getElementById('logout-btn')


const handleLogout = (e) => {
  e.preventDefault()
  console.log("logout called")
  fetch('/auth/logout', {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => {
      console.log(res.ok)
      if (res.ok) {
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload(true)
      } else {
        alert('logout failed')
      }
    })
    .catch(error => {
      console.log("logout error" , error)
      alert('an error occurred during logout')
  })
}

const getImages = () => {
  
}


logoutBtn.addEventListener('click', handleLogout)
window.onload = getImages