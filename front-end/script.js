function fetchCars() {
  fetch('http://localhost:3000/api/cars')
    .then((response) => response.json())
    .then((data) => {
      const carList = document.getElementById('car-list');
      carList.innerHTML = data
        .map((car) => `<li>${car.make} ${car.model}</li>`)
        .join('');
    })
    .catch((error) => console.error(error));
}
