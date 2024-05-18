const signupBtn = document.getElementById("signup-btn")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirm-password")
const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const signupForm = document.getElementById("signup-form")


// * 
let isValidationSuccess = false

// * event Listener functions

// * submit
const submitSignup = (e) => {
  e.preventDefault()
  
  checkFirstName()
  checkLastName()
  checkEmail()
  checkPassword()
  checkConfirmPwd()

  if (!isValidationSuccess) {
    console.warn("validation failed")
    return 
  }

  const data = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
  }
  console.log(data)

  fetch("/auth/signup", {
    method: 'POST',
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
        alert(data.message)
      }
    })
    .catch((err) => {
      console.log(err.message)
    })
}



// * email
const checkEmail = () => {
  const emailValue = email.value.trim()
  if (emailValue === "") {
    setErrorFor(email, "cannot be empty")
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'invalid email')
  } else {
    setSuccessFor(email)
  }
}

// * password
const checkPassword = () => {
  const passwordValue = password.value.trim()
  if (passwordValue === "") {
    setErrorFor(password, 'cannot be empty')
  } else if (!isPassword(passwordValue)) {
    setErrorFor(password, 'must be 8 characters')
  } else {
    setSuccessFor(password)
  }
}

// * firstName
const checkFirstName = () => {
  const firstNameValue = firstName.value.trim()
  if (firstNameValue === "") {
    setErrorFor(firstName, 'cannot be empty')
  } else if (!isFirstName(firstNameValue)) {
    setErrorFor(firstName, 'not a valid first name')
  } else {
    setSuccessFor(firstName)
  }
}

// * lastName
const checkLastName = () => {
  const lastNameValue = lastName.value.trim()
  if (lastNameValue === "") {
    setErrorFor(lastName, 'cannot be empty')
  } else if (!isLastName(lastNameValue)) {
    setErrorFor(lastName, 'not valid last name')
  } else {
    setSuccessFor(lastName)
  }
}

// * confirm password
const checkConfirmPwd = () => {
  const pwdValue = password.value.trim()
  const confirmPwdValue = confirmPassword.value.trim()
  if (confirmPwdValue === '') {
    setErrorFor(confirmPassword, 'cannot be empty')
  } else if (!isPasswordSame(pwdValue, confirmPwdValue)) {
    setErrorFor(confirmPassword, 'password miss match')
  } else {
    setSuccessFor(confirmPassword)
  }
}

// ***************** end ********************


// * helper functions 

const isEmail = (email) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email)
}

const isPassword = (password) => {
  const passwordRegex = /^.{8,}$/
  return passwordRegex.test(password)
}

const isFirstName = (firstName) => {
  const firstNameRegex = /^[A-Z][a-zA-Z'-]{0,19}$/
  return firstNameRegex.test(firstName)
}

const isLastName = (lastName) => {
  const lastNameRegex = /^[A-Z][a-zA-Z'-]{0,19}$/
  return lastNameRegex.test(lastName)
}

const isPasswordSame = (pwd, confirmPwd) => {
  return pwd === confirmPwd
}

setErrorFor = (input, msg) => {
  console.log(input)
  console.log(msg)
  const inputParent = input.parentElement
  const small = inputParent.querySelector('small')
  small.classList = "form-text text-danger opacity-1"
  small.textContent = msg
  signupBtn.disabled = true
  isValidationSuccess=false
  console.log(isValidationSuccess)
}

setSuccessFor = (input) => {
  const inputParent = input.parentElement
  const small = inputParent.querySelector('small')
  small.classList = 'form-text text-danger opacity-0'
  signupBtn.disabled = false
  isValidationSuccess=true
  console.log(isValidationSuccess)
}

// ***************** end ********************



// * event listeners

email.addEventListener('input', checkEmail)
password.addEventListener('input', checkPassword)
confirmPassword.addEventListener('input', checkConfirmPwd)
firstName.addEventListener('input', checkFirstName)
lastName.addEventListener('input', checkLastName)
signupForm.addEventListener('submit', submitSignup)

// ***************** end ********************

