// track-complaint.js
const BASE_URL = 'http://localhost:8080';

document.getElementById('trackBtn').addEventListener('click', function () {
    const complaintId = document.getElementById('complaintIdInput').value.trim();
    if (!complaintId) {
        alert('❌ Please enter a Complaint ID!');
        return;
    }

    // GET /api/complaints/{id}
    fetch(`${BASE_URL}/api/complaints/${complaintId}`)
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Not found');
        })
        .then(data => {
            showComplaintDetails(data);
            loadTimeline(complaintId);
        })
        .catch(() => {
            alert('❌ Complaint not found! Please check the ID.');
        });
});

function showComplaintDetails(data) {
    document.getElementById('trackResult').style.display = 'block';
    document.getElementById('compTitle').innerText    = '📋 ' + data.title;
    // compStatus is the correct field name from Complaint.java
    document.getElementById('compStatus').innerText   = 'Status: ' + (data.compStatus || '').replace(/_/g, ' ').toUpperCase();
    document.getElementById('compDept').innerText     = 'Department: ' + (data.department ? data.department.dept_name : 'N/A');
    document.getElementById('compPriority').innerText = 'Priority: ' + (data.priority ? data.priority.toUpperCase() : 'N/A');
}

function loadTimeline(complaintId) {
    // GET /api/history/{complaintId}
    fetch(`${BASE_URL}/api/history/${complaintId}`)
        .then(res => res.json())
        .then(history => {
            const container = document.getElementById('timelineContainer');
            container.innerHTML = '';

            if (history.length === 0) {
                container.innerHTML = '<p style="color:var(--gray);font-size:12px">No history yet.</p>';
                return;
            }

            history.forEach((item, index) => {
                const isLast = index === history.length - 1;
                // new_status and creation_date are the correct field names from ComplaintHistory.java
                container.innerHTML += `
                    <div class="tl-item">
                        <div class="tl-dot ${isLast ? 'active' : ''}"></div>
                        <div class="tl-name">${(item.new_status || '').replace(/_/g, ' ').toUpperCase()}</div>
                        <div class="tl-time">${item.creation_date ? new Date(item.creation_date).toLocaleString() : ''}</div>
                        <div class="tl-remark">${item.remark || ''}</div>
                    </div>
                `;
            });
        })
        .catch(() => {
            document.getElementById('timelineContainer').innerHTML =
                '<p style="color:var(--gray);font-size:12px">Could not load timeline.</p>';
        });
}
