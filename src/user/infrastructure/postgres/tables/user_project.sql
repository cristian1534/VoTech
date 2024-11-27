BEGIN TRANSACTION;

CREATE TABLE user_project_applications (
    user_email VARCHAR(255) NOT NULL,
    project_id INT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_email, project_id),
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

COMMIT TRANSACTION;
