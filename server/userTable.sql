--user table where users basic information will kept.

CREATE TABLE user (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    user_type VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    contact VARCHAR(50),
    address VARCHAR(500),
    is_active boolean,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

--user_rule table where user rules will define, ex: Save access; Edit access; Delete access

CREATE TABLE user_rule (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    rule_name VARCHAR(300) NOT NULL,
    is_active boolean
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

-- user_rule_privilege table where Admin will give rule to user.
-- Users will access those, which admin will provide them.

CREATE TABLE user_rule_privilege (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(300) NOT NULL,
    rule_id VARCHAR(300) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

--blog_post table where user can create blog and post.

CREATE TABLE blog_post (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    post_body VARCHAR(3000) NOT NULL,
    user_id VARCHAR(300) NOT NULL,
    is_active boolean,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

--blog_post_comment table where user can post their comment on specific blog.

CREATE TABLE blog_post_comment (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    comment VARCHAR(300) NOT NULL,
    user_id VARCHAR(300) NOT NULL,
    blog_post_id VARCHAR(300) NOT NULL,
    is_archive boolean,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
