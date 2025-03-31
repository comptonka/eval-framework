const submitForm = document.querySelector('.answer-form');
const answer = document.getElementById('inputClusterUUID');
const fs = require('fs');

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();

  fs.writeFile("answer.txt",answer.value, err => {
    if (err){
      console.error(err);
    }
    else{
      console.log("Successfully wrote " + answer + " to answer.txt");
    }
  }
  alert(answer + " was received");
});

