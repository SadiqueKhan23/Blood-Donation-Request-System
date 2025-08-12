


// ✅ BASE URL of Spring Boot backend
const BASE_URL = "http://localhost:8080/api/donors";

// ✅ Select the donor form element
const donorForm = document.getElementById("donor-form");

// ✅ Add submit listener to donor form
donorForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Form default reload roko

  // 📝 Get form values
  const name = document.getElementById("donor-name").value;
  const bloodGroup = document.getElementById("donor-bloodGroup").value;
  const city = document.getElementById("donor-city").value;
  const contact = document.getElementById("donor-contact").value;

  // 📦 Create data object
  const donorData = {
    name: name,
    bloodGroup: bloodGroup,
    city: city,
    contact: contact,
    available: true, // by default available
    userId: localStorage.getItem("userId") // logged-in user
  };
  console.log("✅ Donor being added:", donorData);



  // 🚀 Send POST request to backend
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(donorData)
  })
    .then(response => {
      if (response.ok) {
        alert("✅ Donor added successfully!");
        donorForm.reset(); // Form clear
      } else {
        alert("❌ Failed to add donor.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("❌ Something went wrong while adding donor.");
    });
});

// 🔎 Donor Search Function
function searchDonors() {
  const bloodGroup = document.getElementById("search-bloodGroup").value;
  const city = document.getElementById("search-city").value;

  const url = `${BASE_URL}/search?bloodGroup=${encodeURIComponent(bloodGroup)}&city=${encodeURIComponent(city)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      renderDonorTable(data);
    })
    .catch(error => {
      console.error("Search error:", error);
      alert("❌ Error while searching donors.");
    });
}
// 
function loadMyDonations() {
  const userId = localStorage.getItem("userId");

  fetch(`${BASE_URL}/user/${userId}`)
    .then(res => res.json())
    .then(data => {
      renderDonorTable(data, true); // true = enable controls
    })
    .catch(err => {
      console.error("Error loading my donations:", err);
      alert("❌ Could not load your donations.");
    });
}


//
// 📊 Render Donor Table
// 📊 Render Donor Table (for both search and My Donations)
function renderDonorTable(donors, isMyDonation = false) {
  const tableId = isMyDonation ? "my-donor-table" : "donor-table";
  const table = document.getElementById(tableId);
  table.innerHTML = "";

  const header = `
    <tr>
      <th>Name</th>
      <th>Blood Group</th>
      <th>City</th>
      <th>Contact</th>
      <th>Status</th>
      ${isMyDonation ? "<th>Actions</th>" : ""}
    </tr>
  `;
  table.innerHTML += header;

  donors.forEach(donor => {
    let row = `
      <tr>
        <td>${donor.name}</td>
        <td>${donor.bloodGroup}</td>
        <td>${donor.city}</td>
        <td>${donor.contact}</td>
        <td>${donor.available ? "Available" : "Unavailable"}</td>
    `;

    if (isMyDonation) {
      row += `
        <td>
          <button onclick="deleteDonor(${donor.id})">🗑 Delete</button>
          <button onclick="toggleAvailability(${donor.id}, ${!donor.available})">
            ${donor.available ? "Set Unavailable" : "Set Available"}
          </button>
        </td>
      `;
    }

    row += `</tr>`;
    table.innerHTML += row;
  });

  if (donors.length === 0) {
    const colspan = isMyDonation ? 6 : 5;
    table.innerHTML += `<tr><td colspan="${colspan}">No donors found</td></tr>`;
  }
}


// 🗑 Delete Donor
function deleteDonor(id) {
  if (confirm("Are you sure you want to delete this donor?")) {
    fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
      .then(res => {
        if (res.ok) {
          alert("✅ Donor deleted.");
          loadMyDonations(); // reload list
        } else {
          alert("❌ Failed to delete donor.");
        }
      });
  }
}

// 🔁 Toggle Availability
function toggleAvailability(id, newStatus) {
  fetch(`${BASE_URL}/${id}/status?available=${newStatus}`, {
    method: "PUT"
  })
    .then(res => {
      if (res.ok) {
        alert("✅ Availability updated.");
        loadMyDonations(); // reload list
      } else {
        alert("❌ Failed to update status.");
      }
    });
}


  //Request:

  // ✅ BASE URL for requests
const REQUEST_URL = "http://localhost:8080/api/requests";

// ✅ Select the request form
const requestForm = document.getElementById("request-form");

// ✅ Add submit event listener
requestForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Form reload roko

  // 🔍 Get values from form fields
  const name = document.getElementById("request-name").value;
  const bloodGroup = document.getElementById("request-bloodGroup").value;
  const city = document.getElementById("request-city").value;
  const contact = document.getElementById("request-contact").value;
  const reason = document.getElementById("request-reason").value;

  // 🧠 Create object to send
  const requestData = {
    name: name,
    bloodGroup: bloodGroup,
    city: city,
    contact: contact,
    reason: reason,
    fulfilled: false, // default value
    userId: localStorage.getItem("userId")
  };

  // 🚀 Send POST request to backend
  fetch(REQUEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  })
    .then(res => {
      if (res.ok) {
        alert("✅ Blood request submitted!");
        requestForm.reset();
      } else {
        alert("❌ Failed to submit request.");
      }
    })
    .catch(err => {
      console.error("Request error:", err);
      alert("❌ Error while submitting request.");
    });
});

// 🔍 Blood Request Search Function
function searchRequests() {
  // 📥 Get filter inputs
  const bloodGroup = document.getElementById("search-req-bloodGroup").value;
  const city = document.getElementById("search-req-city").value;

  // 🧠 Encode values for safe URL
  const encodedBloodGroup = encodeURIComponent(bloodGroup);
  const encodedCity = encodeURIComponent(city);

  // 🔗 Make full URL with parameters
  const url = `${REQUEST_URL}/search?bloodGroup=${encodedBloodGroup}&city=${encodedCity}`;

  // 🚀 Fetch search results
  fetch(url)
    .then(response => response.json())
    .then(data => {
      renderRequestTable(data); // 📊 Pass data to render
    })
    .catch(error => {
      console.error("Search error:", error);
      alert("❌ Error while searching requests.");
    });
}


// 📊 Render Request Table
function renderRequestTable(requests) {
  const table = document.getElementById("request-table");

  // 🧹 Clear old content
  table.innerHTML = "";

  // 📌 Header Row
  const header = `
    <tr>
      <th>Name</th>
      <th>Blood Group</th>
      <th>City</th>
      <th>Contact</th>
      <th>Reason</th>
      <th>Status</th>
    </tr>
  `;
  table.innerHTML += header;

  // 📥 Add Rows
  requests.forEach(req => {
    const row = `
      <tr>
        <td>${req.name}</td>
        <td>${req.bloodGroup}</td>
        <td>${req.city}</td>
        <td>${req.contact}</td>
        <td>${req.reason}</td>
        <td>${req.fulfilled ? "Fulfilled" : "Pending"}</td>
      </tr>
    `;
    table.innerHTML += row;
  });

  // ❗If no data
  if (requests.length === 0) {
    table.innerHTML += `<tr><td colspan="6">No requests found</td></tr>`;
  }
}

//
// 📥 Load Requests of Logged-In User
function loadMyRequests() {
  const userId = localStorage.getItem("userId");

  fetch(`${REQUEST_URL}/user/${userId}`)
    .then(res => res.json())
    .then(data => {
      renderMyRequestsTable(data); // Call table render function
    })
    .catch(err => {
      console.error("Error loading my requests:", err);
      alert("❌ Could not load your requests.");
    });
}

// 📊 Render My Requests Table with Actions
function renderMyRequestsTable(requests) {
  const table = document.getElementById("my-request-table");
  table.innerHTML = "";

  const header = `
    <tr>
      <th>Name</th>
      <th>Blood Group</th>
      <th>City</th>
      <th>Contact</th>
      <th>Reason</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  `;
  table.innerHTML += header;

  requests.forEach(req => {
    const row = `
      <tr>
        <td>${req.name}</td>
        <td>${req.bloodGroup}</td>
        <td>${req.city}</td>
        <td>${req.contact}</td>
        <td>${req.reason}</td>
        <td>${req.fulfilled ? "Fulfilled" : "Pending"}</td>
        <td>
          <button onclick="deleteRequest(${req.id})">🗑 Delete</button>
          <button onclick="toggleFulfilled(${req.id}, ${!req.fulfilled})">
            ${req.fulfilled ? "Mark Pending" : "Mark Fulfilled"}
          </button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });

  if (requests.length === 0) {
    table.innerHTML += `<tr><td colspan="7">No requests found</td></tr>`;
  }
}

//
// ❌ Delete Request
function deleteRequest(id) {
  if (confirm("Are you sure you want to delete this request?")) {
    fetch(`${REQUEST_URL}/${id}`, { method: "DELETE" })
      .then(res => {
        if (res.ok) {
          alert("✅ Request deleted.");
          loadMyRequests(); // reload list
        } else {
          alert("❌ Failed to delete request.");
        }
      });
  }
}

// 🔁 Toggle Fulfilled Status
function toggleFulfilled(id, newStatus) {
  fetch(`${REQUEST_URL}/${id}/fulfilled?fulfilled=${newStatus}`, {
    method: "PUT"
  })
    .then(res => {
      if (res.ok) {
        alert("✅ Status updated.");
        loadMyRequests(); // reload list
      } else {
        alert("❌ Failed to update status.");
      }
    });
}
