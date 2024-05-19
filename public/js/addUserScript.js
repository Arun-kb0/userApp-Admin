const email = document.getElementById("email")
const password = document.getElementById("password")
const objectIdString = document.getElementById("objectid-string")
const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const signupForm = document.getElementById("signup-form")
const createBtn = document.getElementById("create-btn")
const updateBtn = document.getElementById("update-btn")


let isValidationSuccess = false
let isUpdateValidationSuccess = false

if (typeof createAlert === 'function') {
  console.log("create alert file loaded")
} else {
  console.log("create alert file not loaded")
}

// * update user 
const updateUser = (user) => {
  console.log("update user ")

  isUpdateValidationSuccess = (
    isEmail(user.email, true)
    && isPassword(user.password, true)
    && isFirstName(user.firstname, true)
    && isLastName(user.lastname, true)
  ) ? true : false

  console.log("isUpdateValidationSuccess", isUpdateValidationSuccess)
  if (!isUpdateValidationSuccess) {
    const message = 'update validation failed'
    const description = "for update keep fields empty or provide required value"
    createAlert(message, description)

    console.warn("update validation failed")
    return
  }

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
    .then((data) => createAlert(data.message))
    .catch((error) => console.log(error))
}

// *create user 
const createUser = (user) => {
  checkFirstName()
  checkLastName()
  checkEmail()
  checkPassword()
  if (!isValidationSuccess) {
    createAlert("validation failed")
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
      createAlert(data.message)
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
    setErrorFor(email, "email required to create user")
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
    setErrorFor(password, 'password required to create user')
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
    setErrorFor(firstName, 'firstname required to create user')
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
    setErrorFor(lastName, 'lastname required to create user')
  } else if (!isLastName(lastNameValue)) {
    setErrorFor(lastName, 'not valid last name')
  } else {
    setSuccessFor(lastName)
  }
}

// ***************** end ********************


// * helper functions 

const isEmail = (email, isUpdate) => {
  if (isUpdate && email === '') return true
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email)
}

const isPassword = (password, isUpdate) => {
  if (isUpdate && password === '') return true
  const passwordRegex = /^.{8,}$/
  return passwordRegex.test(password)
}

const isFirstName = (firstName, isUpdate) => {
  if (isUpdate && firstName === '') return true
  const firstNameRegex = /^[A-Z][a-zA-Z'-]{0,19}$/
  return firstNameRegex.test(firstName)
}

const isLastName = (lastName, isUpdate) => {
  if (isUpdate && lastName === '') return true
  const lastNameRegex = /^[A-Z][a-zA-Z'-]{0,19}$/
  return lastNameRegex.test(lastName)
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


// // * creating alert
// const createAlert = (message, description) => {
//   // Create the main alert section
//   const alertBox = document.createElement('section');
//   alertBox.className = 'alert alert-info alert-dismissible fade show d-flex';
//   alertBox.role = 'alert';

//   // Create the inner div
//   const innerDiv = document.createElement('div');
//   innerDiv.className = 'col-11';

//   // Create the alert title
//   const title = document.createElement('h3');
//   title.className = 'alert-heading';
//   title.innerText = message;

//   // Create the alert description
//   const desc = document.createElement('p');
//   if (description) {
//     desc.innerText = description;
//   } else {
//     desc.style.display = 'none';
//   }

//   // Create the close button
//   const closeButton = document.createElement('button');
//   closeButton.className = 'btn-close';
//   closeButton.setAttribute('data-bs-dismiss', 'alert');
//   closeButton.setAttribute('aria-label', 'Close');

//   innerDiv.appendChild(title);
//   innerDiv.appendChild(desc);
//   alertBox.appendChild(innerDiv);
//   alertBox.appendChild(closeButton);

//   const alertContainer = document.querySelector('#alert-container');
//   alertContainer.appendChild(alertBox);
//   alertContainer.classList.remove('d-none');
// }

// ***************** end ********************



// * event listeners

email.addEventListener('input', checkEmail)
password.addEventListener('input', checkPassword)
firstName.addEventListener('input', checkFirstName)
lastName.addEventListener('input', checkLastName)
signupForm.addEventListener('submit', submitSignup)

// ***************** end ********************

