// // track-complaint.js
// const BASE_URL = 'http://localhost:8080';

// document.getElementById('trackBtn').addEventListener('click', function () {
//     const complaintId = document.getElementById('complaintIdInput').value.trim();
//     if (!complaintId) {
//         alert('❌ Please enter a Complaint ID!');
//         return;
//     }

//     // GET /api/complaints/{id}
//     fetch(`${BASE_URL}/api/complaints/${complaintId}`)
//         .then(res => {
//             if (res.ok) return res.json();
//             throw new Error('Not found');
//         })
//         .then(data => {
//             showComplaintDetails(data);
//             loadTimeline(complaintId);
//         })
//         .catch(() => {
//             alert('❌ Complaint not found! Please check the ID.');
//         });
// });

// function showComplaintDetails(data) {
//     document.getElementById('trackResult').style.display = 'block';
//     document.getElementById('compTitle').innerText    = '📋 ' + data.title;
//     // compStatus is the correct field name from Complaint.java
//     document.getElementById('compStatus').innerText   = 'Status: ' + (data.compStatus || '').replace(/_/g, ' ').toUpperCase();
//     document.getElementById('compDept').innerText     = 'Department: ' + (data.department ? data.department.dept_name : 'N/A');
//     document.getElementById('compPriority').innerText = 'Priority: ' + (data.priority ? data.priority.toUpperCase() : 'N/A');
// }

// function loadTimeline(complaintId) {
//     // GET /api/history/{complaintId}
//     fetch(`${BASE_URL}/api/history/${complaintId}`)
//         .then(res => res.json())
//         .then(history => {
//             const container = document.getElementById('timelineContainer');
//             container.innerHTML = '';

//             if (history.length === 0) {
//                 container.innerHTML = '<p style="color:var(--gray);font-size:12px">No history yet.</p>';
//                 return;
//             }

//             history.forEach((item, index) => {
//                 const isLast = index === history.length - 1;
//                 // new_status and creation_date are the correct field names from ComplaintHistory.java
//                 container.innerHTML += `
//                     <div class="tl-item">
//                         <div class="tl-dot ${isLast ? 'active' : ''}"></div>
//                         <div class="tl-name">${(item.new_status || '').replace(/_/g, ' ').toUpperCase()}</div>
//                         <div class="tl-time">${item.creation_date ? new Date(item.creation_date).toLocaleString() : ''}</div>
//                         <div class="tl-remark">${item.remark || ''}</div>
//                     </div>
//                 `;
//             });
//         })
//         .catch(() => {
//             document.getElementById('timelineContainer').innerHTML =
//                 '<p style="color:var(--gray);font-size:12px">Could not load timeline.</p>';
//         });
// }

const BASE_URL = 'https://smartcity-backend-e3xt.onrender.com';

document.getElementById('trackBtn').addEventListener('click', function () {
    const complaintId = document.getElementById('complaintIdInput').value.trim();
    if (!complaintId) {
        alert('❌ Please enter a Complaint ID!');
        return;
    }

    fetch(`${BASE_URL}/api/complaints/${complaintId}`)
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Not found');
        })
        .then(data => {
            showComplaintDetails(data);
            loadTimeline(data.compId);
            // Show feedback form only if resolved
            if (data.compStatus === 'resolved') {
                showFeedbackForm(data.compId);
            } else {
                document.getElementById('feedbackSection').style.display = 'none';
            }
        })
        .catch(() => {
            alert('❌ Complaint not found! Please check the ID.');
        });
});

function showComplaintDetails(data) {
    document.getElementById('trackResult').style.display = 'block';
    document.getElementById('compTitle').innerText    = '📋 ' + data.title;
    document.getElementById('compStatus').innerText   = 'Status: ' + (data.compStatus || '').replace(/_/g, ' ').toUpperCase();
    document.getElementById('compDept').innerText     = 'Department: ' + (data.department ? data.department.dept_name : 'N/A');
    document.getElementById('compPriority').innerText = 'Priority: ' + (data.priority ? data.priority.toUpperCase() : 'N/A');
}

function loadTimeline(complaintId) {
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

function showFeedbackForm(compId) {
    const section = document.getElementById('feedbackSection');
    section.style.display = 'block';
    section.innerHTML = `
        <div class="timeline-card" style="margin-top:14px;max-width:560px">
            <div class="timeline-card-title">⭐ Rate This Resolution</div>
            <p style="font-size:11px;color:var(--gray);margin-bottom:14px">
                Your complaint has been resolved! Please rate the resolution quality.
            </p>

            <!-- Star Rating -->
            <div style="margin-bottom:14px">
                <div style="font-size:11px;color:var(--gray);margin-bottom:8px;font-weight:600;text-transform:uppercase;letter-spacing:.8px">Rating</div>
                <div id="starContainer" style="display:flex;gap:8px">
                    ${[1,2,3,4,5].map(i => `
                        <span id="star${i}" onclick="setRating(${i})"
                            style="font-size:28px;cursor:pointer;color:rgba(255,255,255,0.2);transition:color .2s">★</span>
                    `).join('')}
                </div>
                <input type="hidden" id="ratingValue" value="0">
            </div>

            <!-- Message -->
            <div style="margin-bottom:14px">
                <div style="font-size:11px;color:var(--gray);margin-bottom:5px;font-weight:600;text-transform:uppercase;letter-spacing:.8px">Message (optional)</div>
                <textarea id="feedbackMsg"
                    placeholder="Tell us about your experience..."
                    style="width:100%;padding:9px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:7px;color:var(--white);font-size:12px;font-family:'Sora',sans-serif;outline:none;resize:none;height:70px;line-height:1.6"></textarea>
            </div>

            <button type="button" onclick="submitFeedback(${compId})"
                style="width:100%;padding:11px;background:linear-gradient(90deg,var(--blue),var(--blue2));border:none;border-radius:8px;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:'Sora',sans-serif">
                Submit Feedback
            </button>
        </div>
    `;
}

function setRating(value) {
    document.getElementById('ratingValue').value = value;
    for (let i = 1; i <= 5; i++) {
        const star = document.getElementById('star' + i);
        star.style.color = i <= value ? '#F5A623' : 'rgba(255,255,255,0.2)';
    }
}

function submitFeedback(compId) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('❌ Please login to submit feedback!');
        return;
    }

    const rating  = parseInt(document.getElementById('ratingValue').value);
    const message = document.getElementById('feedbackMsg').value.trim();

    if (rating === 0) {
        alert('❌ Please select a star rating!');
        return;
    }

    // POST /api/feedback/add
    fetch(`${BASE_URL}/api/feedback/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            complaint: { compId: compId },
            user:      { id: parseInt(userId) },
            rating:    rating,
            message:   message
        })
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed');
    })
    .then(() => {
        document.getElementById('feedbackSection').innerHTML = `
            <div style="background:rgba(10,191,163,0.1);border:1px solid rgba(10,191,163,0.25);border-radius:12px;padding:20px;text-align:center;max-width:560px;margin-top:14px">
                <div style="font-size:24px;margin-bottom:8px">🎉</div>
                <div style="font-size:14px;font-weight:600;color:var(--teal);margin-bottom:4px">Thank you for your feedback!</div>
                <div style="font-size:12px;color:var(--gray)">Your rating helps us improve city services.</div>
            </div>
        `;
    })
    .catch(() => {
        alert('❌ Failed to submit feedback! Please try again.');
    });
}
