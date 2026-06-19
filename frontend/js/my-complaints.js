// my-complaints.js
const BASE_URL = 'https://smartcity-backend-e3xt.onrender.com';

window.onload = function () {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('❌ Please login first!');
        window.location.href = 'login.html';
        return;
    }
    loadMyComplaints(userId);
};

function loadMyComplaints(userId) {
    // GET /api/complaints/user/{userId}
    fetch(`${BASE_URL}/api/complaints/user/${userId}`)
        .then(res => res.json())
        .then(data => renderComplaints(data))
        .catch(() => alert('❌ Could not load complaints!'));
}

function renderComplaints(data) {
    const tbody = document.getElementById('complaintsBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--gray);padding:20px">No complaints filed yet! <a href="file-complaint.html" style="color:var(--blue2)">File your first complaint</a></td></tr>';
        return;
    }

    data.forEach(c => {
        // compId, compStatus, compCreation are the correct field names from Complaint.java
        const statusClass = (c.compStatus || 'filed').replace(/_/g, '_');
        const statusText  = (c.compStatus || 'filed').replace(/_/g, ' ');
        const dateStr     = c.compCreation ? new Date(c.compCreation).toLocaleDateString() : 'N/A';
        const deptName    = c.department ? c.department.dept_name : 'N/A';

        tbody.innerHTML += `
            <tr>
                <td>${c.compId}</td>
                <td>${c.title}</td>
                <td>${deptName}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
                <td>${dateStr}</td>
                <td><button class="btn btn-outline btn-sm" onclick="goTrack(${c.compId})">Track</button></td>
            </tr>
        `;
    });
}

function goTrack(id) {
    window.location.href = 'track-complaint.html';
    // Store id for auto-fill on track page
    localStorage.setItem('trackId', id);
}

// Search & filter
document.getElementById('searchInput').addEventListener('input', filterTable);
document.getElementById('statusFilter').addEventListener('change', filterTable);

function filterTable() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const status = document.getElementById('statusFilter').value.replace(/_/g, ' ');
    document.querySelectorAll('#complaintsBody tr').forEach(row => {
        const text = row.innerText.toLowerCase();
        const matchSearch = !search || text.includes(search);
        const matchStatus = !status || text.includes(status);
        row.style.display = matchSearch && matchStatus ? '' : 'none';
    });
}
