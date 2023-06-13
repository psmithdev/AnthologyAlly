function loadHome() {
  const content = document.getElementById("content");
  content.innerHTML = `
        <div id="home">
            <h1>Welcome to Anthology Profiles</h1>
            <p>This website is designed to provide profiles of the residents of
            Anthology Senior Living community, helping staff members get to know
            residents better.</p>
            <img src="images/nursing_home.jpg" alt="A picture of Anthology Senior Living">
            <a href="#residents" onclick="loadResidents()">Meet our residents</a>
        </div>
    `;
}

function loadResidents() {
  const content = document.getElementById("content");
  content.innerHTML = `
        <div id="residents" class="container">
            <!-- Resident profiles will be loaded here -->
        </div>
    `;
  // Add resident profiles
  for (let i = 0; i < 6; i++) {
    addResident(i);
  }
}

function addResident(id) {
  const residents = document.getElementById("residents");
  residents.innerHTML += `
        <div class="profile">
            <div class="profile-img">&#128512;</div>
            <div class="profile-details">
                <div class="profile-name">Resident ${id + 1}</div>
                <div class="profile-interests">
                    <strong>Interests: </strong>Placeholder interests
                </div>
                <div class="profile-goodtoknow">
                    <strong>Good to know: </strong>Placeholder info
                </div>
            </div>
        </div>
    `;
}

// Create placeholders for the other sections
function loadContact() {
  const content = document.getElementById("content");
  content.innerHTML = `<h1>Contact</h1>`;
}

function loadLogin() {
  const content = document.getElementById("content");
  content.innerHTML = `<h1>Login</h1>`;
}

// Load the home section by default
loadHome();
