const logoutBtn = document.getElementById('logout-btn')
const searchForm = document.getElementById("nav-screen-form")
const searchInput = document.getElementById("search-input")
const navCollapseLogout = document.getElementById('nav-collapse-logout-btn')

// * search
searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchString = searchInput.value.trim()
  if (searchString === '') {
  createAlert('cannot be empty')
    return
  }
  const url = new URL('/search', window.location.origin)
  url.searchParams.append('searchString', searchString)

  fetch(url, {
    method: 'GET',
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 200) {
        window.location.href = url
      } else {
        return res.json()
          .then(data => createAlert(data.message))
      }
    })
    .catch(error => {
      createAlert(error.message)
      console.log(error.message)
    })
})

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
        createAlert('logout failed')
      }
    })
    .catch(error => {
      console.log("logout error", error)
      createAlert('an error occurred during logout')
    })
}

const getUser = (email) => {
  console.log(email)
}


logoutBtn.addEventListener('click', handleLogout)
navCollapseLogout.addEventListener('click', handleLogout)


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
          window.location.href = url
        } else {
          createAlert('get user failed')
          console.log("error")
        }
      })
      .catch(error => {
        createAlert(error.message)
        console.warn(error)

      })
  }

  userRows.forEach(row => {
    row.addEventListener('click', getUser)
  })
})