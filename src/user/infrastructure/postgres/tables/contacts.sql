BEGIN TRANSACTION;

CREATE TABLE contacts (
    id serial PRIMARY KEY,
    uuid VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL
);

COMMIT TRANSACTION;