function fetchCars() {
  fetch('http://127.0.0.1:3000/api/cars')
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
        `,
        )
        .join('');
    })
    .catch((error) => console.error(error));
}

fetchCars();



function redirectToIndex() {
  
  window.location.href = "index.html";
}
