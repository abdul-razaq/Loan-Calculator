// Listen for submit event on the submit button
document.querySelector('.form').addEventListener('submit', function(e){
  e.preventDefault();
  // Hide results initially
  document.getElementById('results').style.display = 'none';
  // Show tne loader as soon as the submit button is clicked
  document.querySelector('.loading').style.display = 'block';
  // Call the calculateResult function after 2 seconds.
  setTimeout(calculateResult, 2000);
});

// calculateResult Function
function calculateResult() {
  // Grab all the stuffs that we need from the UI
  // UI Variables
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');

  // Results UI Inputs
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  // The principal is the amount of money
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute the monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // Check to see if monthly calculation is a finite number
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // Show the results and hide the loader
    document.getElementById('results').style.display = 'block';
    document.querySelector('.loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

// Show Errors
function showError(error) {
  // Hide the results and the loader when wrong numbers are inputed and the showError function is called
  document.getElementById('results').style.display = 'none';
  document.querySelector('.loading').style.display = 'none';
  // Create a div element
  const errorDiv = document.createElement('div');
  // Get elements
  // Grab the card as the parent element
  const card = document.querySelector('.card');
  // Grab the heading too
  const heading = document.querySelector('.card__content');
  // Add alert class
  errorDiv.className = 'alert--danger';
  // Add the text to the div element created
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above the heading in the card
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector('.alert--danger').remove();
}