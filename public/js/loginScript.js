const email = document.getElementById('email')
const password = document.getElementById('password')
const submitBtn = document.getElementById('submit-btn')
const form = document.getElementById("login-form")


// * submit lister
form.addEventListener('submit', (e) => {
  e.preventDefault()
  checkEmail()
  checkPassword()

  const data = {
    email: email.value.trim(),
    password: password.value.trim()
  }
  fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
        window.location.href = '/'
      } else {
        createAlert(data.message)
      }
    })
    .catch((err) => {
      createAlert(err.message)
    })
})

// ***************** end ********************


// * check email and password
const checkEmail = () => {
  const emailValue = email.value.trim()
  if (emailValue === "") {
    setErrorFor(email, "cannot be empty")
    console.log("error")
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'invalid email')
  } else {
    setSuccess(email)
  }
}

const checkPassword = () => {
  const passwordValue = password.value.trim()
  if (passwordValue === "") {
    setErrorFor(password, "cannot be empty")
    console.log("error")
  } else if (!isPassword(passwordValue)) {
    setErrorFor(password, 'invalid password')
  } else {
    setSuccess(password)
  }
}


const setErrorFor = (input, msg) => {
  const inputParent = input.parentElement
  const small = inputParent.querySelector('small')
  small.classList = "form-text text-danger opacity-1"
  small.textContent = msg
  submitBtn.disabled = true
}


const setSuccess = (input) => {
  const inputParent = input.parentElement
  const small = inputParent.querySelector('small')
  small.classList = "form-text text-danger opacity-0"
  submitBtn.disabled = false
}


const isEmail = (email) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email)
}

const isPassword = (password) => {
  const passwordRegex = /^.{8,}$/
  return passwordRegex.test(password)
}


// ***************** end ********************





//  * event listeners

email.addEventListener('input', checkEmail)
password.addEventListener('input', checkPassword)
// ***************** end ********************

