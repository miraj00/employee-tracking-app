

INSERT INTO department ( department_name )
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Security');

INSERT INTO roles (job_title, salary, department_id)
VALUES
  ('Sales Lead', '100000', 1),
  ('Sales Person', '120000', 1),
  ('Lead Engineer', '150000', 2),
  ('Software Engineer', '130000', 2),
  ('Accountant', '125000', 3),
  ('Legal Team Lead', '250000', 4),
  ('Lawyer', '190000', 4),
  ('Guard', '90000', 5);

INSERT INTO employee (first_name, last_name, role_id, manager)
VALUES
  ('Miraj', 'Patel', 3, 'Jimmy Butler'),
  ('Aaron', 'Singh', 2, 'Rick Kuvo');





