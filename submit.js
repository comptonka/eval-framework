const submitForm = document.querySelector('answer-form');
const answer = document.getElementById('inputClusterUUID');

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    answer: answer.value;
  }

  alert(answer + " was received");
});

