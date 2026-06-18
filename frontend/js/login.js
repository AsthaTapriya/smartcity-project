// login.js
const BASE_URL = 'https://smartcity-backend-e3xt.onrender.com';

document.getElementById('loginBtn').addEventListener('click', function () {
    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPwd').value.trim();
    const role     = document.getElementById('loginRole').value;

    if (!email || !password) {
        alert('❌ Please fill all fields!');
        return;
    }

    // POST /api/users/login?email=X&password=X  (from your UserController)
    fetch(`${BASE_URL}/api/users/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'POST'
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Invalid credentials');
    })
    .then(data => {
        // user_role is the correct field name from your User.java
        if (data.user_role !== role) {
            alert('❌ Wrong role selected!\nYour registered role is: ' + data.user_role);
            return;
        }
        if (data.is_active === 0) {
            alert('❌ Your account has been blocked! Contact admin.');
            return;
        }

        // Save to localStorage — use exact field names from User.java
        localStorage.setItem('userId',   data.id);
        localStorage.setItem('userName', data.user_name);
        localStorage.setItem('userRole', data.user_role);
        localStorage.setItem('userEmail', data.email);

        alert('✅ Welcome, ' + data.user_name + '!');

        // Redirect based on role
        if (data.user_role === 'citizen')       window.location.href = 'my-complaints.html';
        else if (data.user_role === 'officer')  window.location.href = 'officer-complaints.html';
        else if (data.user_role === 'admin')    window.location.href = 'admin-dashboard.html';
    })
    .catch(() => {
        alert('❌ Invalid email or password!');
    });
});
