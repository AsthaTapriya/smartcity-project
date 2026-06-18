// file-complaint.js
const BASE_URL = 'https://smartcity-backend-e3xt.onrender.com';

window.onload = function () {
    loadDepartments();
};

function loadDepartments() {
    fetch(`${BASE_URL}/api/departments/all`)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById('fc_dept');
            select.innerHTML = '<option value="0">🤖 Auto Detect (AI Recommended)</option>';
            // dept_name is the correct field from Department.java
            data.forEach(dept => {
                select.innerHTML += `<option value="${dept.id}">${dept.dept_name}</option>`;
            });
        })
        .catch(() => console.log('Could not load departments'));
}

document.getElementById('complaintBtn').addEventListener('click', function () {
    const userId = localStorage.getItem('userId');
    const ui_name = document.getElementById('fc_name').value.trim();
    const userName = localStorage.getItem('userName');
    if (!userId) {
        alert('❌ Please login first to file a complaint!');
        window.location.href = 'login.html';
        return;
    }
    else if(ui_name !== userName){
        alert('You are not a logged in person. Login with your email');
        // window.location.href = 'login.html';
        return;
    }
    const title    = document.getElementById('fc_title').value.trim();
    const message  = document.getElementById('fc_message').value.trim();
    const location = document.getElementById('fc_location').value.trim();
    const priority = document.getElementById('fc_priority').value;
    const deptId   = document.getElementById('fc_dept').value;

    
    if (!title || !message || !location) {
        alert('❌ Please fill all required fields!');
        return;
    }

    if (deptId === '0') {
        // Call Python AI service first
        detectAndSubmit(title, message, location, priority, userId);
    } else {
        submitComplaint(parseInt(deptId), title, message, location, priority, userId);
    }
});

function detectAndSubmit(title, message, location, priority, userId) {
    fetch('https://smartcity-ai-0kf4.onrender.com/predict-department', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: title + ' ' + message })
    })
    .then(res => res.json())
    .then(data => {
        submitComplaint(data.department_id, title, message, location, priority, userId);
    })
    .catch(() => {
        // AI not running — default to dept 1
        submitComplaint(1, title, message, location, priority, userId);
    });
}

function submitComplaint(deptId, title, message, location, priority, userId) {
    // POST /api/complaints/file
    // Complaint.java fields: user, title, department, message, location, priority
    // Note: compStatus and compCreation are set by the backend automatically
    fetch(`${BASE_URL}/api/complaints/file`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user:       { id: parseInt(userId) },
            title:      title,
            message:    message,
            location:   location,
            priority:   priority,
            department: { id: parseInt(deptId) }
        })
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed');
    })
    .then(data => {
        // compId is the correct field name from Complaint.java
        const id = data.compId || data.id;
        alert('✅ Complaint filed successfully!\n\nYour Complaint ID: ' + id + '\n\nSave this ID to track your complaint!');
        window.location.href = 'my-complaints.html';
    })
    .catch(() => {
        alert('❌ Failed to file complaint! Please make sure you are logged in.');
    });
}