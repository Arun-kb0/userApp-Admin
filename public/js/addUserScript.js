const email = document.getElementById("email")
const password = document.getElementById("password")
const objectIdString = document.getElementById("objectid-string")
const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const signupForm = document.getElementById("signup-form")
const createBtn = document.getElementById("create-btn")
const updateBtn = document.getElementById("update-btn")

let isValidationSuccess = false



// * update user 
const updateUser = (user) => {
  console.log("update user ")
  user._id = objectIdString.value.trim()
  console.log(user)
  fetch('/edit/update', {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((data)=> alert(data.message))
    .catch((error) => console.log(error))
}

// *create user 
const createUser = (user) => {
  checkFirstName()
  checkLastName()
  checkEmail()
  checkPassword()
  if (!isValidationSuccess) {
    console.warn("validation failed")
    return
  }
  console.log("create user")
  fetch('/edit/create', {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message)
    })
    .catch((error) => console.log(error))
}


// * event Listener functions

// * submit
const submitSignup = (e) => {
  e.preventDefault()

  const user = {
    firstname: firstName.value.trim(),
    lastname: lastName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
  }

  if (e.submitter.value === 'update') {
    updateUser(user)
  } else {
    createUser(user)
  }
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
    setErrorFor(password, 'password required create user')
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
  createBtn.disabled = true
  isValidationSuccess = false
  console.log(isValidationSuccess)
}

setSuccessFor = (input) => {
  const inputParent = input.parentElement
  const small = inputParent.querySelector('small')
  small.classList = 'form-text text-danger opacity-0'
  createBtn.disabled = false
  isValidationSuccess = true
  console.log(isValidationSuccess)
}

// ***************** end ********************



// * event listeners

email.addEventListener('input', checkEmail)
password.addEventListener('input', checkPassword)
firstName.addEventListener('input', checkFirstName)
lastName.addEventListener('input', checkLastName)
signupForm.addEventListener('submit', submitSignup)

// ***************** end ********************

