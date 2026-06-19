// settings.js
const BASE_URL = 'https://smartcity-backend-e3xt.onrender.com';

// Toggle switch handler
function toggleSetting(el) {
    el.classList.toggle('active');
}

// Save SLA deadlines
document.getElementById('saveSlaBtn').addEventListener('click', function () {
    // sla_days is the correct field name from Department.java
    const slaMap = {
        'Roads & Infrastructure': parseInt(document.getElementById('roads_sla').value),
        'Water Supply':           parseInt(document.getElementById('water_sla').value),
        'Electricity':            parseInt(document.getElementById('electricity_sla').value),
        'Sanitation & Waste':     parseInt(document.getElementById('sanitation_sla').value)
    };

    // GET all departments then update each
    fetch(`${BASE_URL}/api/departments/all`)
        .then(res => res.json())
        .then(depts => {
            // dept_name is the correct field name from Department.java
            const updates = depts
                .filter(d => slaMap[d.dept_name] !== undefined)
                .map(d => {
                    d.sla_days = slaMap[d.dept_name];
                    // PUT /api/departments/update
                    return fetch(`${BASE_URL}/api/departments/update`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(d)
                    });
                });
            return Promise.all(updates);
        })
        .then(() => alert('✅ SLA settings saved!'))
        .catch(() => alert('❌ Failed to save SLA settings!'));
});

// Save portal info (static — no backend needed)
document.getElementById('saveSettingsBtn').addEventListener('click', function () {
    alert('✅ Settings saved!');
});
