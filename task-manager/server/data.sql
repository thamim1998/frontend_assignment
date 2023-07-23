-- copy paste the following into pgAdmin to create the database and tables

-- updated by Hung LE, 21Jul

CREATE TABLE tasks (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  title VARCHAR(30),
  urgency INT,
  date VARCHAR(300),
  description VARCHAR(1000),
  completion VARCHAR(20)
);

CREATE TABLE users (
  email VARCHAR(50) PRIMARY KEY,
  hashed_password VARCHAR(255),
  name VARCHAR(80),
  dob VARCHAR(30)
);

INSERT INTO tasks (id, user_email, title, urgency, date, description, completion) VALUES
  ('1', 'name@email.com', 'Do the dishes', 1, '2020-01-01', 'this is a test', 'processing')
