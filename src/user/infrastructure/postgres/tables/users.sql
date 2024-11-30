BEGIN TRANSACTION;

CREATE TABLE users (
    id serial PRIMARY KEY,
    uuid VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

COMMIT TRANSACTION;