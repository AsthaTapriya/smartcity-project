// sla-tracker.js
const BASE_URL = 'http://localhost:8080';

window.onload = function () {
    const userId   = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    if (!userId || userRole !== 'officer') {
        alert('❌ Access denied!');
        window.location.href = 'login.html';
        return;
    }

    // GET /api/officers/user/{userId}
    fetch(`${BASE_URL}/api/officers/user/${userId}`)
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Not found');
        })
        .then(officer => loadSlaData(officer.id))
        .catch(() => {
            document.getElementById('slaBody').innerHTML =
                '<tr><td colspan="4" style="text-align:center;color:var(--red);padding:20px">❌ Officer profile not found!</td></tr>';
        });
};

function loadSlaData(officerId) {
    // GET /api/complaints/officer/{officerId}
    fetch(`${BASE_URL}/api/complaints/officer/${officerId}`)
        .then(res => res.json())
        .then(data => renderSlaTable(data))
        .catch(() => alert('❌ Could not load SLA data!'));
}

function renderSlaTable(data) {
    const tbody = document.getElementById('slaBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--gray);padding:20px">No complaints assigned!</td></tr>';
        return;
    }

    data.forEach(c => {
        // compId, compStatus, compCreation — correct field names from Complaint.java
        const slaDays  = c.department ? c.department.sla_days : 7;
        const status   = c.compStatus || 'filed';

        let deadlineText, color, width;

        if (!c.compCreation) {
            deadlineText = 'N/A'; color = 'var(--gray)'; width = '0%';
        } else {
            const deadline = new Date(c.compCreation);
            deadline.setDate(deadline.getDate() + slaDays);
            const diff = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));

            if (diff < 0) {
                deadlineText = `${Math.abs(diff)} days overdue`;
                color = 'var(--red)'; width = '100%';
            } else if (diff <= 1) {
                deadlineText = `${diff} day(s) left`;
                color = 'var(--gold)'; width = '85%';
            } else {
                deadlineText = `${diff} days left`;
                color = 'var(--teal)';
                width = `${Math.max(Math.min(((slaDays - diff) / slaDays) * 100, 100), 5)}%`;
            }
        }

        tbody.innerHTML += `
            <tr>
                <td>${c.compId}</td>
                <td>
                    <div style="font-size:12px;margin-bottom:5px">${c.title}</div>
                    <div class="sla-bar"><div class="sla-fill" style="width:${width};background:${color}"></div></div>
                </td>
                <td><span style="color:${color};font-weight:500">${deadlineText}</span></td>
                <td><span class="badge ${status}">${status.replace(/_/g, ' ')}</span></td>
            </tr>
        `;
    });
}
