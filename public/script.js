function fetchCars() {
  fetch('http://127.0.0.1:3000/api/cars')
    .then((response) => response.json())
    .then((data) => {
      const carListContainer = document.getElementById('carListContainer');
      if (Array.isArray(data)) {
        data.forEach((car) => {
          const carItem = document.createElement('div');
          carItem.classList.add('car-item');

          const carImage = document.createElement('img');
          carImage.src = car.img;
          carImage.alt = `${car.brand} ${car.model}`;
          carImage.style.maxWidth = '500px';

          const addButton = document.createElement('button');
          addButton.textContent = 'Add to favourite';
          addButton.style.display = 'none';
          addButton.style.marginTop = '10px';
          addButton.style.marginBottom = '10px';
          addButton.style.marginLeft = 'auto';
          addButton.style.marginRight = 'auto';

          const carInfo = document.createElement('div');
          carInfo.innerHTML = `
            <strong>Brand:</strong> ${car.brand}<br>
            <strong>Model:</strong> ${car.model}<br>
            <strong>Year:</strong> ${car.year}<br>
            <strong>Horsepower:</strong> ${car.horsepower}<br>
            <strong>Engine:</strong> ${car.engine}<br>
          `;
          carInfo.style.display = 'none';
          carInfo.style.textAlign = 'center';

          carImage.addEventListener('click', () => {
            if (carInfo.style.display === 'none') {
              carInfo.style.display = 'block';
              addButton.style.display = 'block';
              carImage.style.maxWidth = '100%';
              carImage.style.marginLeft = 'auto';
              carImage.style.marginRight = 'auto';
            } else {
              carInfo.style.display = 'none';
              addButton.style.display = 'none';
              carImage.style.maxWidth = '500px';
              carImage.style.marginLeft = '';
              carImage.style.marginRight = '';
            }
          });

          addButton.addEventListener('click', () => {
            addToFavorites(car);
          });

          carItem.appendChild(carImage);
          carItem.appendChild(carInfo);
          carItem.appendChild(addButton);
          carListContainer.appendChild(carItem);
        });
      } else {
        console.error('Data is not an array:', data);
      }
    })
    .catch((error) => console.error(error));
}

function addToFavorites(car) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(car);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

fetchCars();

document.getElementById('signup-button').addEventListener("click", function(event){
  event.preventDefault()
  signup();
});



function signup() {
  console.log('Signup button clicked');
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const signupData = {
    name: name,
    email: email,
    password: password
  };
  if (signupData.name === '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Insert a correct name!'
    })
    return;
  }
  if (signupData.email === '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Insert a correct email!'
    })
    return;
  }
  if (signupData.password === '') {
    alert('Please enter your password');
    return;
  }
  if (signupData.password.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password must be at least 6 characters long!'
    })
    return;
  }
  if (signupData.email.indexOf('@') === -1) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a valid email!'
    })
    return;
  }
  if (signupData.email.indexOf('.') === -1) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a valid email!'
    })
    return;
  }

  fetch('http://127.0.0.1:3000/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signupData)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error!',
        })
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        text: 'You have successfully signed up!'
      }).then(function() {
        window.location.href = 'login.html';
      });

    })
    .catch((error) => console.error(error));
}

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function(event) {
  const filterValue = searchInput.value.toLowerCase();

  fetch('http://127.0.0.1:3000/api/cars')
    .then((response) => response.json())
    .then((data) => {
      const filteredCars = data.filter((car) => car.brand.toLowerCase().includes(filterValue));
      displayCarImages(filteredCars);
    })
    .catch((error) => console.error(error));
});

function displayCarImages(cars) {
  const carListContainer = document.getElementById('carListContainer');
  carListContainer.innerHTML = '';

  cars.forEach((car) => {
    const carItem = document.createElement('div');
    carItem.classList.add('car-item');

    const carImage = document.createElement('img');
    carImage.src = car.img;
    carImage.alt = `${car.brand} ${car.model}`;
    carImage.style.maxWidth = '500px';

    const carInfo = document.createElement('div');
    carInfo.innerHTML = `
      <strong>Brand:</strong> ${car.brand}<br>
      <strong>Model:</strong> ${car.model}<br>
      <strong>Year:</strong> ${car.year}<br>
      <strong>Horsepower:</strong> ${car.horsepower}<br>
      <strong>Engine:</strong> ${car.engine}<br>
    `;
    carInfo.style.display = 'none';
    carInfo.style.textAlign = 'center';

    carImage.addEventListener('click', () => {
      if (carInfo.style.display === 'none') {
        carInfo.style.display = 'block';
        addButton.style.display = 'block';
        carImage.style.maxWidth = '100%';
        carImage.style.marginLeft = 'auto';
        carImage.style.marginRight = 'auto';
      } else {
        carInfo.style.display = 'none';
        addButton.style.display = 'none';
        carImage.style.maxWidth = '500px';
        carImage.style.marginLeft = '';
        carImage.style.marginRight = '';
      }
    });

    const addButton = document.createElement('button');
    addButton.textContent = 'Add to favourite';
    addButton.style.display = 'none';
    addButton.style.marginTop = '10px';
    addButton.style.marginBottom = '10px';
    addButton.style.marginLeft = 'auto';
    addButton.style.marginRight = 'auto';

    addButton.addEventListener('click', () => {
      addToFavorites(car);
    });

    carItem.appendChild(carImage);
    carItem.appendChild(carInfo);
    carItem.appendChild(addButton);
    carListContainer.appendChild(carItem);
  });
}

function addToFavorites(car) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(car);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
