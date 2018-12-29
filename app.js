document.querySelector('.get-jokes').addEventListener('click', getJokes);

// Using external API
function getJokes(e) {
  const number = document.querySelector('input[type="number"]').value;
  if (number === '') {
    alert('You forgot to enter a number!')
  } else if (number === '0') {
    alert('Please enter a number greater than zero!')
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.icndb.com/jokes/random/${number}`,true);

  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);
      
      let output = '';

      if (response.type === 'success') {
        response.value.forEach(function(joke) {
          output += `<li>${joke.joke}</li>`
         });
      } else {
        output += '<li>Something went wrong<li>';
      }
      document.querySelector('.jokes').innerHTML = output;
    }
  }
  xhr.send();
  e.preventDefault();
}