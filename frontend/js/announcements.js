// announcements.js
const BASE_URL = 'http://localhost:8080';

window.onload = function () {
    const userRole = localStorage.getItem('userRole');
    // Show post form only to admin
    if (userRole === 'admin') {
        document.getElementById('postCard').style.display = 'block';
    }
    loadAnnouncements();
};

function loadAnnouncements() {
    // GET /api/announcements/all
    fetch(`${BASE_URL}/api/announcements/all`)
        .then(res => res.json())
        .then(data => renderAnnouncements(data))
        .catch(() => {
            document.getElementById('announcementsList').innerHTML =
                '<p style="color:var(--gray);text-align:center;padding:18px;font-size:12px">No announcements yet!</p>';
        });
}

function renderAnnouncements(data) {
    const list     = document.getElementById('announcementsList');
    const userRole = localStorage.getItem('userRole');
    list.innerHTML = '';

    if (data.length === 0) {
        list.innerHTML = '<p style="color:var(--gray);text-align:center;padding:18px;font-size:12px">No announcements yet!</p>';
        return;
    }

    data.forEach(a => {
        // title, msg, creation_date — correct field names from Announcement.java
        const delBtn = userRole === 'admin'
            ? `<button class="ann-del" onclick="deleteAnnouncement(${a.id})">Delete</button>`
            : '';
        const dateStr = a.creation_date ? new Date(a.creation_date).toLocaleDateString() : '';

        list.innerHTML += `
            <div class="ann-item">
                <div class="ann-dot"></div>
                <div class="ann-content">
                    <div class="ann-title">${a.title}</div>
                    <div class="ann-msg">${a.msg}</div>
                    <div class="ann-date">Posted · ${dateStr}</div>
                </div>
                ${delBtn}
            </div>
        `;
    });
}

document.getElementById('announceBtn').addEventListener('click', function () {
    const userId = localStorage.getItem('userId');
    const title  = document.getElementById('ann_title').value.trim();
    const msg    = document.getElementById('ann_msg').value.trim();

    if (!title || !msg) {
        alert('❌ Please fill all fields!');
        return;
    }

    // POST /api/announcements/add
    // Announcement.java fields: title, msg, announceUser
    // announceUser is the correct field name
    fetch(`${BASE_URL}/api/announcements/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title:        title,
            msg:          msg,
            announceUser: { id: parseInt(userId) }
        })
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed');
    })
    .then(() => {
        alert('✅ Announcement posted!');
        document.getElementById('ann_title').value = '';
        document.getElementById('ann_msg').value   = '';
        loadAnnouncements();
    })
    .catch(() => alert('❌ Failed to post announcement!'));
});

function deleteAnnouncement(id) {
    if (!confirm('Delete this announcement?')) return;
    // DELETE /api/announcements/delete/{id}
    fetch(`${BASE_URL}/api/announcements/delete/${id}`, { method: 'DELETE' })
        .then(() => { alert('✅ Deleted!'); loadAnnouncements(); })
        .catch(() => alert('❌ Failed!'));
}
