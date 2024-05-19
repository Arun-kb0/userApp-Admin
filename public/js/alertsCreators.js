
// * creating alert
const createAlert = (message, description) => {
  // Create the main alert section
  const alertBox = document.createElement('section');
  alertBox.className = 'alert alert-info alert-dismissible fade show d-flex justify-content-center';
  alertBox.role = 'alert';

  // Create the inner div
  const innerDiv = document.createElement('div');
  innerDiv.className = 'col-11';

  // Create the alert title
  const title = document.createElement('h3');
  title.className = 'alert-heading';
  title.innerText = message;

  // Create the alert description
  const desc = document.createElement('p');
  if (description) {
    desc.innerText = description;
  } else {
    desc.style.display = 'none';
  }

  // Create the close button
  const closeButton = document.createElement('button');
  closeButton.className = 'btn-close';
  closeButton.setAttribute('data-bs-dismiss', 'alert');
  closeButton.setAttribute('aria-label', 'Close');

  innerDiv.appendChild(title);
  innerDiv.appendChild(desc);
  alertBox.appendChild(innerDiv);
  alertBox.appendChild(closeButton);

  const alertContainer = document.querySelector('#alert-container');
  alertContainer.appendChild(alertBox);
  alertContainer.classList.remove('d-none');
}


window.createAlert = createAlert