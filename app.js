function loadHome() {
  const content = document.getElementById("content");
  content.innerHTML = `
        <div id="home">
            <h1>Welcome to Anthology Profiles</h1>
            <p>This website is designed to provide profiles of
            Anthology Senior Living community, helping staff members get to know
            residents better.</p>
            <img src="images/nursing_home.jpg" alt="A picture of Anthology Senior Living">
            <div id="residents" class="container">
                <!-- Resident profiles will be loaded here -->
            </div>
            <a href="#residents" onclick="loadResidents()">Meet our residents</a>
        </div>
    `;

  // Add resident profiles
  let residents = JSON.parse(localStorage.getItem("residents")) || [];
  for (let i = 0; i < 6 && i < residents.length; i++) {
    addResidentToDOM(residents[i], document.getElementById("residents"));
  }
}

function loadResidents() {
  const content = document.getElementById("content");
  content.innerHTML = `
        <div id="residents" class="container">
            <!-- Resident profiles will be loaded here -->
        </div>
    `;
  // Load resident profiles from localStorage
  let residents = JSON.parse(localStorage.getItem("residents")) || [];
  residents.forEach((resident, index) =>
    addResidentToDOM(resident, document.getElementById("residents"), index)
  );
}

function addResidentToDOM(resident, parentElement, index) {
  parentElement.innerHTML += `
        <div class="profile">
            <div class="profile-img">&#128512;</div>
            <div class="profile-details">
                <div class="profile-name">${resident.name}</div>
                <div class="profile-interests">
                    <strong>Interests: </strong>${resident.interests}
                </div>
                <div class="profile-goodtoknow">
                    <strong>Good to know: </strong>${resident.goodToKnow}
                </div>
            </div>
            <div class="profile-actions">
                <button onclick="deleteResident(${index})">Delete</button>
                <button onclick="editResident(${index})">Edit</button>
            </div>
        </div>
    `;
}

function editResident(index) {
  // Get current residents from localStorage
  let residents = JSON.parse(localStorage.getItem("residents")) || [];

  // Fill the form with the resident data
  document.getElementById("name").value = residents[index].name;
  document.getElementById("interests").value = residents[index].interests;
  document.getElementById("goodToKnow").value = residents[index].goodToKnow;

  // Change form onsubmit event to update the resident
  document.querySelector("form").onsubmit = function (e) {
    e.preventDefault();
    updateResident(index, {
      name: document.getElementById("name").value,
      interests: document.getElementById("interests").value,
      goodToKnow: document.getElementById("goodToKnow").value,
    });
    loadResidents(); // Load the residents again
  };

  loadForm(); // Load the form again to see the changes
}

function loadContact() {
  const content = document.getElementById("content");
  content.innerHTML = `<h1>Contact</h1>`;
}

function loadLogin() {
  const content = document.getElementById("content");
  content.innerHTML = `<h1>Login</h1>`;
}

function loadForm() {
  const content = document.getElementById("content");
  content.innerHTML = `
        <div id="form">
            <h1>Add a new resident</h1>
            <form onsubmit="submitForm(event)">
                <label for="name">Name:</label><br>
                <input type="text" id="name" name="name"><br>
                <label for="interests">Interests:</label><br>
                <input type="text" id="interests" name="interests"><br>
                <label for="goodToKnow">Good to know:</label><br>
                <input type="text" id="goodToKnow" name="goodToKnow"><br>
                <input type="submit" value="Submit">
            </form> 
        </div>
    `;
}

function submitForm(e) {
  // Prevent form from submitting normally
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const interests = document.getElementById("interests").value;
  const goodToKnow = document.getElementById("goodToKnow").value;

  // Add new resident
  addResident({ name: name, interests: interests, goodToKnow: goodToKnow });

  // Load the residents page
  loadResidents();
}

function addResident(resident) {
  // Get current residents from localStorage
  let residents = JSON.parse(localStorage.getItem("residents")) || [];

  // Add new resident to array
  residents.push(resident);

  // Save updated residents array to localStorage
  localStorage.setItem("residents", JSON.stringify(residents));
}

function updateResident(index, updatedResident) {
  // Get current residents from localStorage
  let residents = JSON.parse(localStorage.getItem("residents")) || [];

  // Update resident at specified index
  residents[index] = updatedResident;

  // Save updated residents array to localStorage
  localStorage.setItem("residents", JSON.stringify(residents));
}

function deleteResident(index) {
  // Get current residents from localStorage
  let residents = JSON.parse(localStorage.getItem("residents")) || [];

  // Remove resident at specified index
  residents.splice(index, 1);

  // Save updated residents array to localStorage
  localStorage.setItem("residents", JSON.stringify(residents));

  // Load the residents again
  loadResidents();
}

// Search Functionality
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function (e) {
  let searchQuery = e.target.value.toLowerCase();
  let residents = JSON.parse(localStorage.getItem("residents")) || [];
  let filteredResidents = residents.filter((resident) => {
    return (
      resident.name.toLowerCase().includes(searchQuery) ||
      resident.interests.toLowerCase().includes(searchQuery) ||
      resident.goodToKnow.toLowerCase().includes(searchQuery)
    );
  });

  // Update the display of residents based on `filteredResidents`
  document.querySelector(".container").innerHTML = "";
  filteredResidents.forEach((resident, index) =>
    addResidentToDOM(resident, document.querySelector(".container"), index)
  );
});

// Load the home section by default
loadHome();
