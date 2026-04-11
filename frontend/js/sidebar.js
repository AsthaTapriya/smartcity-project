// sidebar.js — updates logged-in user info in sidebar on every page
window.addEventListener('DOMContentLoaded', function () {
    const userName = localStorage.getItem('userName') || 'Guest';
    const userRole = localStorage.getItem('userRole') || '';
    const av = document.getElementById('sidebarAvatar');
    const nm = document.getElementById('sidebarName');
    const rl = document.getElementById('sidebarRole');
    if (av) av.innerText = userName.charAt(0).toUpperCase();
    if (nm) nm.innerText = userName;
    if (rl) rl.innerText = userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'Not logged in';
});
