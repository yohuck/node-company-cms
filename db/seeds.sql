INSERT INTO departments (dept_name)
VALUES  ("Engineering"),
        ("Operations"),
        ("Marketing"),
        ("Sales");

INSERT INTO ROLES (title, salary, department_id)
VALUES  ("Developer 1", 85000, 1),
        ("Developer 2", 120000, 1),
        ("Customer Service Manager", 85000, 2),
        ("Customer Service Agent", 60000, 2),
        ("Copywriter", 100000, 3),
        ("SEO Expert", 110000, 3),
        ("SDR", 80000, 4 ),
        ("Territory Manager", 110000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Homer", "Simpson", 7, NULL),
        ("Mr", "Burns", 8, 1),
        ("Apu", "Nahasapeem", 6, 2),
        ("Edna", "Krabappel", 3, 2),
        ("Waylon", "Smithers", 7, 2),
        ("Patty", "Bouvier", 1, 2),
        ("Lenny", "Leonard", 1, 2),
        ("Lisa", "Simpson", 2, 2);