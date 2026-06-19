// register.js
const BASE_URL = 'https://smartcity-backend-e3xt.onrender.com';

document.getElementById('registerBtn').addEventListener('click', function () {
    const user_name = document.getElementById('regName').value.trim();
    const phone_no  = document.getElementById('regPhone').value.trim();
    const email     = document.getElementById('regEmail').value.trim();
    const user_role = document.getElementById('regRole').value;
    const user_pwd  = document.getElementById('regPwd').value.trim();
    const confirm   = document.getElementById('regConfirm').value.trim();

    const phone = document.getElementById('regPhone').value.trim();

    // 🔥 ADD VALIDATION HERE
    const regex = /^[0-9]{10}$/;
    if (!regex.test(phone)) {
        alert('❌ Invalid mobile number! Enter exactly 10 digits.');
        return;
    }

    if (!user_name || !phone_no || !email || !user_pwd) {
        alert('❌ Please fill all fields!');
        return;
    }
    if (user_pwd !== confirm) {
        alert('❌ Passwords do not match!');
        return;
    }

    // POST /api/users/register — send field names matching User.java
    fetch(`${BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name, email, user_pwd, phone_no, user_role })
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Registration failed');
    })
    .then(data => {
        // If registering as officer, also create officer record automatically
        if (data.user_role === 'officer') {
            // POST /api/officers/add — Officer.java has user and department fields
            return fetch(`${BASE_URL}/api/officers/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: { id: data.id },
                    department: { id: 1 }   // default dept — admin can reassign
                })
            }).then(() => {
                alert('✅ Registered as Officer successfully!\nPlease login.\nNote: Admin will assign you to the correct department.');
                window.location.href = 'login.html';
            });
        } else {
            alert('✅ Registered successfully!\nPlease login.');
            window.location.href = 'login.html';
        }
    })
    .catch(() => {
        alert('❌ Registration failed! Email may already be registered.');
    });
});
