CREATE TABLE IF NOT EXISTS employees (
  employee_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  employee_name varchar(250) NOT NULL,
  employee_age INT NOT NULL,
  employee_salary DECIMAL(10, 2) NOT NULL,
  employee_designation varchar(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_user (
  user_email varchar(250) NOT NULL,
  user_password varchar(250) NOT NULL,
  PRIMARY KEY (user_email)
);