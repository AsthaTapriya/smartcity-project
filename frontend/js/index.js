// index.js
// API base URL
const BASE_URL = 'http://localhost:8080';

window.onload = function () {
    loadStats();
};

function loadStats() {
    // Total and resolved complaint counts
    fetch(`${BASE_URL}/api/complaints/all`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('totalComplaints').innerHTML =
                data.length + '<span>+</span>';
            // compStatus is the correct field name from your Complaint.java
            const resolved = data.filter(c => c.compStatus === 'resolved').length;
            document.getElementById('resolvedComplaints').innerHTML =
                resolved + '<span>+</span>';
        })
        .catch(() => {
            document.getElementById('totalComplaints').innerHTML = '0<span>+</span>';
            document.getElementById('resolvedComplaints').innerHTML = '0<span>+</span>';
        });

    // Department count
    fetch(`${BASE_URL}/api/departments/all`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('totalDepts').innerText = data.length;
        })
        .catch(() => {
            document.getElementById('totalDepts').innerText = '0';
        });
}
