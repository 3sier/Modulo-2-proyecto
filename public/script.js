function fetchCars() {
  fetch('http://127.0.0.1:3000/api/cars')
    .then((response) => response.json())
    .then((data) => {
      const carListContainer = document.getElementById('carListContainer');
      if (Array.isArray(data)) {
        carListContainer.innerHTML = data
          .map((car) => `
            <div class="car-item">
              <strong>Brand:</strong> ${car.brand}<br>
              <strong>Model:</strong> ${car.model}<br>
              <strong>Year:</strong> ${car.year}<br>
              <strong>Horsepower:</strong> ${car.horsepower}<br>
              <strong>Engine:</strong> ${car.engine}<br>
              <img src="${car.img}" alt="${car.brand} ${car.model}" style="max-width: 500px;">
            </div>
          `)
          .join('');
      } else {
        console.error('Data is not an array:', data);
      }
    })
    .catch((error) => console.error(error));
}
fetchCars();



function redirectToIndex() {
  window.location.href = "index.html";
}


function login(event) {
  event.preventDefault();

  console.log('login');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const loginData = {
    email: email,
    password: password
  };

  fetch('http://127.0.0.1:3000/auth/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('token', data.token);
      redirectToIndex();
    })
    .catch((error) => console.error(error));
}

var button = document.getElementById("login-button");
button.addEventListener('click', login);


function filterCars() {
  const brand = document.getElementById('brand').value;
  const year = document.getElementById('year').value;

  const filterData = {
    brand: brand,
    year: year,
  };

  fetch('http://localhost:3000/api/cars', {
    method: 'POST',
    body: JSON.stringify(filterData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const carList = document.getElementById('car-list');
      carList.innerHTML = data
        .map(
          (car) => `
          <li>
            <strong>Brand:</strong> ${car.brand}<br>
            <strong>Model:</strong> ${car.model}<br>
            <strong>Year:</strong> ${car.year}<br>
            <strong>Horsepower:</strong> ${car.horsepower}<br>
            <strong>Engine:</strong> ${car.engine}<br>
            <img src="${car.img}" alt="${car.brand} ${car.model}" style="max-width: 500px;">
          </li>
        `
        )
        .join('');
    })
    .catch((error) => console.error(error));
}

var button = document.getElementById('filter-button');
if (button) {
  button.addEventListener('click', filterCars);
}

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
          addButton.textContent = '🖤';
          addButton.style.display = 'none';
          addButton.style.border = 'none';
          addButton.style.fontSize = '24px';

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