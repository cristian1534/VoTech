BEGIN TRANSACTION;

CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    plan VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    start_date DATE NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

COMMIT TRANSACTION;