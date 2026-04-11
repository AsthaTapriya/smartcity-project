// admin-dashboard.js
const BASE_URL = 'http://localhost:8080';

window.onload = function () {
    if (localStorage.getItem('userRole') !== 'admin') {
        alert('❌ Access denied! Admins only.');
        window.location.href = 'login.html';
        return;
    }
    loadDashboard();
};

function loadDashboard() {
    // GET /api/complaints/all
    fetch(`${BASE_URL}/api/complaints/all`)
        .then(res => res.json())
        .then(data => {
            const total      = data.length;
            // compStatus is the correct field name from Complaint.java
            const resolved   = data.filter(c => c.compStatus === 'resolved').length;
            const inProgress = data.filter(c => c.compStatus === 'in_progress').length;
            const pending    = data.filter(c => c.compStatus === 'filed').length;

            document.getElementById('statTotal').innerText    = total;
            document.getElementById('statResolved').innerText = resolved;
            document.getElementById('statProgress').innerText = inProgress;
            document.getElementById('statPending').innerText  = pending;

            const rPct = total ? Math.round((resolved   / total) * 100) : 0;
            const iPct = total ? Math.round((inProgress / total) * 100) : 0;
            const pPct = total ? Math.round((pending    / total) * 100) : 0;

            document.getElementById('resolvedPercent').innerText = rPct + '%';
            document.getElementById('progressPercent').innerText = iPct + '%';
            document.getElementById('pendingPercent').innerText  = pPct + '%';
            document.getElementById('resolvedBar').style.width   = rPct + '%';
            document.getElementById('progressBar').style.width   = iPct + '%';
            document.getElementById('pendingBar').style.width    = pPct + '%';

            loadChart(data);
            renderTable(data);
        })
        .catch(err => {
            console.error('Dashboard error:', err);
            alert('❌ Could not load dashboard!');
        });
}

function loadChart(complaints) {
    fetch(`${BASE_URL}/api/departments/all`)
        .then(res => res.json())
        .then(depts => {
            const ctx = document.getElementById('deptChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: depts.map(d => d.dept_name),
                    datasets: [{
                        data: depts.map(d =>
                            // department.id matches — correct
                            complaints.filter(c => c.department && c.department.id === d.id).length
                        ),
                        backgroundColor: ['#3B8BF5','#0ABFA3','#F5A623','#F56565','#8892A4','#9B59B6'],
                        borderRadius: 6,
                        borderSkipped: false
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, ticks: { color: '#8892A4', stepSize: 1 }, grid: { color: 'rgba(255,255,255,0.04)' } },
                        x: { ticks: { color: '#8892A4', maxRotation: 30, font: { size: 10 } }, grid: { display: false } }
                    }
                }
            });
        });
}

function renderTable(data) {
    const tbody = document.getElementById('adminBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--gray);padding:20px">No complaints yet!</td></tr>';
        return;
    }

    data.forEach(c => {
        // compId, compStatus — correct field names
        const citizen  = c.user            ? c.user.user_name                         : 'N/A';
        const dept     = c.department      ? c.department.dept_name                   : 'N/A';
        // assignedOfficer.user.user_name — Officer.java has user field → User.java has user_name
        const officer  = c.assignedOfficer ? c.assignedOfficer.user.user_name         : '—';
        const status   = c.compStatus || 'filed';

        tbody.innerHTML += `
            <tr>
                <td>${c.compId}</td>
                <td>${c.title}</td>
                <td>${citizen}</td>
                <td>${dept}</td>
                <td>${officer}</td>
                <td><span class="badge ${c.priority}">${c.priority || ''}</span></td>
                <td><span class="badge ${status}">${status.replace(/_/g, ' ')}</span></td>
                <td><button class="btn btn-outline btn-sm" onclick="assignComplaint(${c.compId})">Assign</button></td>
            </tr>
        `;
    });
}

// function assignComplaint(compId) {
//     const officerId = prompt('Enter Officer ID to assign this complaint:');
//     if (!officerId || isNaN(officerId)) return;

//     const adminId = localStorage.getItem('userId');

//     fetch(`${BASE_URL}/api/complaints/${compId}`)
//         .then(res => res.json())
//         .then(complaint => {
//             // assignedOfficer and compStatus are correct field names
//             complaint.assignedOfficer = { id: parseInt(officerId) };
//             complaint.compStatus      = 'assigned';
//             return fetch(`${BASE_URL}/api/complaints/update`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(complaint)
//             });
//         })
//         .then(() => {
//             // Add history record
//             return fetch(`${BASE_URL}/api/history/add`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     complaint:  { compId: compId },
//                     old_status: 'filed',
//                     new_status: 'assigned',
//                     changedBy:  { id: parseInt(adminId) },
//                     remark:     'Assigned to officer by admin'
//                 })
//             });
//         })
//         .then(() => {
//             alert('✅ Complaint assigned successfully!');
//             loadDashboard();
//         })
//         .catch(() => alert('❌ Failed! Make sure Officer ID is correct.'));
// }
function assignComplaint(compId) {
    // First fetch all officers to show dropdown
    fetch(`${BASE_URL}/api/officers/all`)
        .then(res => res.json())
        .then(officers => {
            if (officers.length === 0) {
                alert('❌ No officers found! Register officers first.');
                return;
            }

            // Build a readable list for admin to choose from
            let message = 'Select Officer (enter number):\n\n';
            officers.forEach((o, index) => {
                const name = o.user ? o.user.user_name : 'Unknown';
                const dept = o.department ? o.department.dept_name : 'No dept';
                message += `${index + 1}. ${name} — ${dept} (ID: ${o.id})\n`;
            });

            const choice = prompt(message);
            if (!choice || isNaN(choice)) return;

            const selectedIndex = parseInt(choice) - 1;
            if (selectedIndex < 0 || selectedIndex >= officers.length) {
                alert('❌ Invalid selection!');
                return;
            }

            const selectedOfficer = officers[selectedIndex];
            const adminId = localStorage.getItem('userId');

            fetch(`${BASE_URL}/api/complaints/${compId}`)
                .then(res => res.json())
                .then(complaint => {
                    complaint.assignedOfficer = { id: selectedOfficer.id };
                    complaint.compStatus = 'assigned';
                    return fetch(`${BASE_URL}/api/complaints/update`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(complaint)
                    });
                })
                .then(() => {
                    return fetch(`${BASE_URL}/api/history/add`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            complaint:  { compId: compId },
                            old_status: 'filed',
                            new_status: 'assigned',
                            changedBy:  { id: parseInt(adminId) },
                            remark:     'Assigned to officer ' + selectedOfficer.user.user_name + ' by admin'
                        })
                    });
                })
                .then(() => {
                    alert('✅ Assigned to ' + selectedOfficer.user.user_name + ' successfully!');
                    loadDashboard();
                })
                .catch(() => alert('❌ Failed to assign!'));
        })
        .catch(() => alert('❌ Could not load officers!'));
}