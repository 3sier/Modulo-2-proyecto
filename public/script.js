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
          

          const carInfo = document.createElement('div');
          carInfo.innerHTML = `
            <strong>Brand:</strong> ${car.brand}<br>
            <strong>Model:</strong> ${car.model}<br>
            <strong>Year:</strong> ${car.year}<br>
            <strong>Horsepower:</strong> ${car.horsepower}<br>
            <strong>Engine:</strong> ${car.engine}<br>
          `;
          carInfo.style.display = 'none';

          carImage.addEventListener('click', () => {
            if (carInfo.style.display === 'none') {
              carInfo.style.display = 'block';
              addButton.style.display = 'block';
            } else {
              carInfo.style.display = 'none';
              addButton.style.display = 'none';
            }
          });

          addButton.addEventListener('click', () => {
            addToFavorites(car);
          });

          carItem.appendChild(carImage);
          carItem.appendChild(addButton);
          carItem.appendChild(carInfo);
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

function signup() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const signupData = {
    name: name,
    email: email,
    password: password
  };

  fetch('http://127.0.0.1:3000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signupData)
  })
    .then((response) => response.json())
    .then((data) => {
      
      console.log('Signup successful:', data);
      window.location.href = '/login.html';
    })
    .catch((error) => console.error(error));
}


const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');


searchButton.addEventListener('click', function() {
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

    carImage.addEventListener('click', () => {
      if (carInfo.style.display === 'none') {
        carInfo.style.display = 'block';
        addButton.style.display = 'block';
      } else {
        carInfo.style.display = 'none';
        addButton.style.display = 'none';
      }
    });

    const addButton = document.createElement('button');
    addButton.textContent = 'Add to favourite';
    addButton.style.display = 'none';

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