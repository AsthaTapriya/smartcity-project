// user-management.js
const BASE_URL = 'https://smartcity-backend-e3xt.onrender.com';

window.onload = function () {
    if (localStorage.getItem('userRole') !== 'admin') {
        alert('❌ Access denied!');
        window.location.href = 'login.html';
        return;
    }
    loadUsers();
};

function loadUsers() {
    // GET /api/users/all
    fetch(`${BASE_URL}/api/users/all`)
        .then(res => res.json())
        .then(data => renderUsers(data))
        .catch(() => alert('❌ Could not load users!'));
}

function renderUsers(data) {
    const tbody = document.getElementById('usersBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--gray);padding:20px">No users found!</td></tr>';
        return;
    }

    data.forEach(u => {
        // user_name, user_role, phone_no, is_active — correct field names from User.java
        tbody.innerHTML += `
            <tr>
                <td>${u.user_name}</td>
                <td>${u.email}</td>
                <td>${u.phone_no || '—'}</td>
                <td><span class="badge ${u.user_role}">${u.user_role}</span></td>
                <td style="color:${u.is_active ? 'var(--teal)' : 'var(--red)'}">
                    ${u.is_active ? '● Active' : '● Blocked'}
                </td>
                <td>
                    <button class="btn ${u.is_active ? 'btn-danger' : 'btn-teal'} btn-sm"
                        onclick="toggleBlock(${u.id}, ${u.is_active})">
                        ${u.is_active ? 'Block' : 'Unblock'}
                    </button>
                </td>
            </tr>
        `;
    });
}

function toggleBlock(userId, isActive) {
    if (!confirm(`Are you sure you want to ${isActive ? 'block' : 'unblock'} this user?`)) return;

    // GET user then update is_active
    fetch(`${BASE_URL}/api/users/${userId}`)
        .then(res => res.json())
        .then(user => {
            user.is_active = isActive ? 0 : 1;
            return fetch(`${BASE_URL}/api/users/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
        })
        .then(() => {
            alert(`✅ User ${isActive ? 'blocked' : 'unblocked'} successfully!`);
            loadUsers();
        })
        .catch(() => alert('❌ Failed!'));
}

// Search filter
document.getElementById('searchInput').addEventListener('input', function () {
    const search = this.value.toLowerCase();
    document.querySelectorAll('#usersBody tr').forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(search) ? '' : 'none';
    });
});

// Role filter
document.getElementById('roleFilter').addEventListener('change', function () {
    const role = this.value.toLowerCase();
    document.querySelectorAll('#usersBody tr').forEach(row => {
        row.style.display = !role || row.innerText.toLowerCase().includes(role) ? '' : 'none';
    });
});
