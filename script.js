let calorieLimit = 1500;
let foods = JSON.parse(localStorage.getItem("foods")) || [];
let burnedCalories = parseInt(localStorage.getItem("burned")) || 0;

function updateDisplay() {
  const foodList = document.getElementById("food-list");
  foodList.innerHTML = "";
  let totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  foods.forEach((food, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${food.name} - ${food.calories} cal <button onclick="deleteFood(${index})">Delete</button>`;
    foodList.appendChild(li);
  });
  document.getElementById("limit").textContent = calorieLimit;
  document.getElementById("consumed").textContent = totalCalories;
  document.getElementById("burned").textContent = burnedCalories;
  document.getElementById("remaining").textContent = calorieLimit - totalCalories + burnedCalories;

  localStorage.setItem("foods", JSON.stringify(foods));
  localStorage.setItem("burned", burnedCalories);
}

function addFood() {
  const name = document.getElementById("food-name").value.trim();
  const calories = parseInt(document.getElementById("food-calories").value);
  if (!name || isNaN(calories) || calories <= 0) return;
  foods.push({ name, calories });
  document.getElementById("food-name").value = "";
  document.getElementById("food-calories").value = "";
  updateDisplay();
}

function deleteFood(index) {
  foods.splice(index, 1);
  updateDisplay();
}

function addBurnedCalories() {
  const burned = parseInt(document.getElementById("burned-calories").value);
  if (isNaN(burned) || burned <= 0) return;
  burnedCalories += burned;
  document.getElementById("burned-calories").value = "";
  updateDisplay();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

updateDisplay();
