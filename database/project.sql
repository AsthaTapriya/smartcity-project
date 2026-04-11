CREATE DATABASE smartcity;
USE smartcity;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_name VARCHAR(50),
    email VARCHAR(255) NOT NULL UNIQUE,
    user_pwd VARCHAR(255),
    phone_no VARCHAR(15),
    user_role ENUM('citizen', 'officer', 'admin'),
    is_active TINYINT DEFAULT 1,
    creation_date DATETIME DEFAULT NOW()
);

-- 2. DEPARTMENTS TABLE
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    dept_name VARCHAR(50) NOT NULL,
    sla_days INT NOT NULL
);
-- select * from department;

-- 3. OFFICERS TABLE
CREATE TABLE officers (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    officer_id INT,
    officer_dept_id INT,
    FOREIGN KEY (officer_id) REFERENCES users(id),
    FOREIGN KEY (officer_dept_id) REFERENCES department(id)
);

-- 4. COMPLAINTS TABLE
CREATE TABLE complaints (
    comp_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    comp_user_id INT,
    title VARCHAR(50),
    complaint_department_id INT,
    message VARCHAR(200),
    location VARCHAR(150),
    priority ENUM('high', 'medium', 'low'),
    photo VARCHAR(255),
    comp_status ENUM('filed', 'under_review', 'assigned', 'in_progress', 'resolved', 'closed'),
    assigned_to INT,
    comp_creation DATETIME DEFAULT NOW(),
    FOREIGN KEY (comp_user_id) REFERENCES users(id),
    FOREIGN KEY (complaint_department_id) REFERENCES department(id),
    FOREIGN KEY (assigned_to) REFERENCES officers(id)
);


-- 5. COMPLAINTS HISTORY TABLE
CREATE TABLE complaints_history (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    complaint_id INT,
    old_status VARCHAR(20),
    new_status VARCHAR(20),
    changed_by INT,
    remark VARCHAR(100),
    creation_date DATETIME DEFAULT NOW(),
    FOREIGN KEY (complaint_id) REFERENCES complaints(comp_id),
    FOREIGN KEY (changed_by) REFERENCES users(id)
);

-- 6. ANNOUNCEMENTS TABLE
CREATE TABLE announcements (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(50),
    msg VARCHAR(200),
    announce_user INT,
    creation_date DATETIME DEFAULT NOW(),
    FOREIGN KEY (announce_user) REFERENCES users(id)
);

-- 7. FEEDBACK TABLE
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_complaint_id INT,
    feedback_user_id INT,
    rating INT,
    message VARCHAR(200),
    creation_date DATETIME DEFAULT NOW(),
    FOREIGN KEY (user_complaint_id) REFERENCES complaints(comp_id),
    FOREIGN KEY (feedback_user_id) REFERENCES users(id)
);

insert into users(user_name, email, user_pwd, phone_no, user_role, is_active)
values('Admin', 'admin@smartcity.com', 'admin123', '8209904360', 'admin', 1);

select * from users;
insert into officers(id, officer_id, officer_dept_id) values(1,4,1);
select * from officers;
delete from users where id = 2;
DELETE FROM complaints WHERE comp_user_id = 2;
DELETE FROM complaints WHERE comp_id = 5;
select * from announcements;
select * from complaints;
DELETE FROM officers WHERE officer_id = 4;
select * from complaints_history;
