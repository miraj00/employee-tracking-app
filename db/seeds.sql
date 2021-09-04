

INSERT INTO department ( department_name )
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Security');

INSERT INTO roles (job_title, salary, department_id)
VALUES
  ('Sales Lead', '100000', '1'),
  ('Sales Person', '120000', 1),
  ('Lead Engineer', '150000', 2),
  ('Software Engineer', '130000', 2),
  ('Accountant', '125000', 3),
  ('Legal Team Lead', '250000', 4),
  ('Lawyer', '190000', 4);

INSERT INTO manager ( manager_name)
VALUES
  ('Miraj'),
  ('Rahil');

INSERT INTO employee (first_name, last_name, job_title, manager_id)
VALUES
  ('Miraj', 'Patel', 'Accountant', 2),
  ('Aaron', 'Singh', 'Lawyer', 2);








