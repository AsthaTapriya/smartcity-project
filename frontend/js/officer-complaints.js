// officer-complaints.js
const BASE_URL = 'https://smartcity-backend-e3xt.onrender.com';

window.onload = function () {
    const userId   = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');

    if (!userId || userRole !== 'officer') {
        alert('❌ Access denied! Officers only.');
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('officerName').innerText = userName;

    // GET /api/officers/user/{userId} — get officer record by userId
    fetch(`${BASE_URL}/api/officers/user/${userId}`)
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Officer not found');
        })
        .then(officer => {
            loadOfficerComplaints(officer.id);
        })
        .catch(() => {
            document.getElementById('officerBody').innerHTML =
                '<tr><td colspan="7" style="text-align:center;color:var(--red);padding:20px">❌ Officer profile not set up! Ask admin to create your officer record.</td></tr>';
        });
};

function loadOfficerComplaints(officerId) {
    // GET /api/complaints/officer/{officerId}
    fetch(`${BASE_URL}/api/complaints/officer/${officerId}`)
        .then(res => res.json())
        .then(data => renderOfficerComplaints(data))
        .catch(() => alert('❌ Could not load complaints!'));
}

function renderOfficerComplaints(data) {
    const tbody = document.getElementById('officerBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--gray);padding:20px">No complaints assigned yet!</td></tr>';
        return;
    }

    data.forEach(c => {
        // compId, compStatus, compCreation are correct field names from Complaint.java
        const slaDays  = c.department ? c.department.sla_days : 7;
        const deadline = calcDeadline(c.compCreation, slaDays);
        const citizen  = c.user ? c.user.user_name : 'N/A';
        const status   = c.compStatus || 'filed';

        tbody.innerHTML += `
            <tr>
                <td>${c.compId}</td>
                <td>${c.title}</td>
                <td>${citizen}</td>
                <td><span class="badge ${c.priority}">${c.priority || ''}</span></td>
                <td>${deadline}</td>
                <td><span class="badge ${status}">${status.replace(/_/g, ' ')}</span></td>
                <td style="display:flex;gap:5px;flex-wrap:wrap">
                    <button class="btn btn-outline btn-sm" onclick="updateStatus(${c.compId},'${status}','in_progress')">▶ Start</button>
                    <button class="btn btn-teal btn-sm"    onclick="updateStatus(${c.compId},'${status}','resolved')">✅ Resolve</button>
                </td>
            </tr>
        `;
    });
}

function calcDeadline(compCreation, slaDays) {
    if (!compCreation) return 'N/A';
    const deadline = new Date(compCreation);
    deadline.setDate(deadline.getDate() + slaDays);
    const diff = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
    if (diff < 0)  return `<span style="color:var(--red);font-weight:600">Overdue (${Math.abs(diff)}d)</span>`;
    if (diff === 0) return `<span style="color:var(--gold)">Due Today</span>`;
    if (diff === 1) return `<span style="color:var(--gold)">Tomorrow</span>`;
    return `<span style="color:var(--teal)">${diff} days left</span>`;
}

function updateStatus(compId, oldStatus, newStatus) {
    const userId = localStorage.getItem('userId');

    // First GET the complaint, then update compStatus
    fetch(`${BASE_URL}/api/complaints/${compId}`)
        .then(res => res.json())
        .then(complaint => {
            // compStatus is the correct field name
            complaint.compStatus = newStatus;
            return fetch(`${BASE_URL}/api/complaints/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(complaint)
            });
        })
        .then(() => {
            // POST /api/history/add — ComplaintHistory fields: complaint, old_status, new_status, changedBy, remark
            return fetch(`${BASE_URL}/api/history/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    complaint:  { compId: compId },
                    old_status: oldStatus,
                    new_status: newStatus,
                    changedBy:  { id: parseInt(userId) },
                    remark:     'Status updated by officer'
                })
            });
        })
        .then(() => {
            alert('✅ Status updated to: ' + newStatus.replace(/_/g, ' '));
            location.reload();
        })
        .catch(() => alert('❌ Failed to update status!'));
}
