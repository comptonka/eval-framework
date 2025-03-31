const submitForm = document.querySelector('');
const answer = document.getElementById('answer');

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    answer: answer.value;
  }

  alert(answer + " was received");
});

