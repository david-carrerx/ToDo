CREATE DATABASE QuickTask;

USE QuickTask;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) 
);

CREATE TABLE tasks(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);

CREATE TABLE shared(
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (shared_with_id) REFERENCES users(id)
);

INSERT INTO users (name, email, password) VALUES ('David','david@gmail.com','12345678');
INSERT INTO users (name, email, password) VALUES ('Messi','messi@gmail.com','12345678');

INSERT INTO tasks (title, user_id) VALUES ("Watch a movie", 1),("Do the homework", 1), ("Take care of the pets", 1);

INSERT INTO shared (task_id, user_id, shared_with_id) VALUES (1,1,2);