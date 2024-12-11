BEGIN TRANSACTION;

CREATE TABLE portfolio (
    id serial PRIMARY KEY,
    uuid VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    technologies TEXT,
    members TEXT,
    deployment VARCHAR(255),
    github VARCHAR(255),
    image VARCHAR(255)
);


COMMIT TRANSACTION;