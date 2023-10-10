INSERT INTO department (id, department_name)
VALUES (1, "Billing"),
       (2, "Finace"),
       (3, "Legal"),
       (4, "Sales"),
       (5, "Operations");

INSERT INTO department_role (job_title, salary, department_id)
VALUES ("Medical Coder", 60000.00, 1),
       ("Accountant", 85000.00, 2),
       ("Lawyer", 90000.00, 3),
       ("Salesman", 80000.00, 4),
       ("Purchasing Coordinator", 65000.00, 5),
       ("Attorney", 85000.00, 3),
       ("Billing Manager", 70000.00, 1),
       ("Controller", 90000.00, 2),
       ("Sales Representative", 70000.00, 4),
       ("Fulfillment Person", 35000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Meredith", "Grey", 1, 1),
       ("Rachel", "Green", 2, 2),
       ("Marshall", "Erikson", 2, 2),
       ("Ted", "Mosby", 4, 4),
       ("Chandler", "Bing", 5, 5),
       ("Jerry", "Seinfeld", 6, 6),
       ("Tyrion", "Lannister", 7, 7),
       ("Micheal", "Scott", 8, 8),
       ("Ross", "Geller", 9, 9),
       ("Rick", "Sanchez", 10, 10);