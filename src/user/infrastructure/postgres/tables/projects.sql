BEGIN TRANSACTION;

CREATE TABLE projects (
    id serial PRIMARY KEY,
    uuid VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    technologies VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    teamMembers TEXT
);

COMMIT TRANSACTION;
