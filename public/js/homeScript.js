const logoutBtn = document.getElementById('logout-btn')

// * logout
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
      console.log("logout error", error)
      alert('an error occurred during logout')
    })
}

const getUser = (email) => {
  console.log(email)
}


logoutBtn.addEventListener('click', handleLogout)

// * adding event to user row 
// * get user data
document.addEventListener('DOMContentLoaded', (event) => {
  const userRows = document.querySelectorAll('.user-row')

  function getUser(event) {
    const userId = this.getAttribute('data-user-id')
    console.log(userId)
    const url = new URL('/getuser', window.location.origin)
    url.searchParams.append('userId', userId)
    fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        if (res.status == 200) {
          window.location.href=url
        } else {
          console.log("error")
        }
      })
      .catch(error => console.warn(error))
  }

  userRows.forEach(row => {
    row.addEventListener('click', getUser)
  })
})