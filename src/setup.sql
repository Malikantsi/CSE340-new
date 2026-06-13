-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
-- ========================================
-- creating service projects table
-- ========================================
CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES organizations(organization_id) ON DELETE CASCADE
);
-- ========================================
-- service_projects INSERT
-- ========================================
INSERT INTO service_projects (
        organization_id,
        title,
        description,
        location,
        project_date
    )
VALUES -- BrightFuture Builders (organization_id = 1)
    (
        1,
        'Community Playground Build',
        'Building a safe playground for local children.',
        'Johannesburg',
        '2026-06-10'
    ),
    (
        1,
        'School Roof Repair',
        'Repairing damaged roofing at a primary school.',
        'Pretoria',
        '2026-06-15'
    ),
    (
        1,
        'Bridge Restoration',
        'Restoring a pedestrian bridge for community access.',
        'Durban',
        '2026-07-01'
    ),
    (
        1,
        'Water Well Construction',
        'Installing a sustainable community water well.',
        'Polokwane',
        '2026-07-12'
    ),
    (
        1,
        'Housing Renovation',
        'Renovating homes for disadvantaged families.',
        'Cape Town',
        '2026-08-01'
    ),
    -- GreenHarvest Growers (organization_id = 2)
    (
        2,
        'Urban Garden Workshop',
        'Teaching urban gardening techniques.',
        'Johannesburg',
        '2026-06-20'
    ),
    (
        2,
        'Community Farm Setup',
        'Creating a local community farming area.',
        'Soweto',
        '2026-07-05'
    ),
    (
        2,
        'Food Sustainability Seminar',
        'Educational seminar about sustainable farming.',
        'Pretoria',
        '2026-07-18'
    ),
    (
        2,
        'Neighborhood Tree Planting',
        'Planting trees to improve local green spaces.',
        'Durban',
        '2026-08-03'
    ),
    (
        2,
        'School Vegetable Garden',
        'Building a vegetable garden for students.',
        'Cape Town',
        '2026-08-20'
    ),
    -- UnityServe Volunteers (organization_id = 3)
    (
        3,
        'Charity Food Drive',
        'Collecting food donations for local shelters.',
        'Johannesburg',
        '2026-06-25'
    ),
    (
        3,
        'Senior Care Visit',
        'Volunteers visiting elderly community members.',
        'Pretoria',
        '2026-07-10'
    ),
    (
        3,
        'Beach Cleanup',
        'Cleaning litter along the beachfront.',
        'Durban',
        '2026-07-22'
    ),
    (
        3,
        'Clothing Donation Event',
        'Distributing donated clothing to families.',
        'Cape Town',
        '2026-08-05'
    ),
    (
        3,
        'Community Health Fair',
        'Providing free wellness resources and screenings.',
        'Polokwane',
        '2026-08-18'
    );
SELECT *
FROM service_projects;
SELECT service_projects.title,
    organizations.name
FROM service_projects
    JOIN organizations ON service_projects.organization_id = organizations.organization_id;
-- ========================================
-- creating categories table
-- ========================================
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);
-- ========================================
-- Create Junction Table
-- ========================================
CREATE TABLE project_categories (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES service_projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);
-- ========================================
-- Insert Categories
-- ========================================
INSERT INTO categories (category_name)
VALUES ('Environmental'),
    ('Educational'),
    ('Community Service'),
    ('Health and Wellness');
-- ========================================
-- Associate Projects with Categories
-- ========================================
INSERT INTO project_categories (project_id, category_id)
VALUES (1, 3),
    (2, 3),
    (3, 3),
    (4, 3),
    (5, 3),
    (6, 2),
    (6, 1),
    (7, 1),
    (8, 2),
    (9, 1),
    (10, 2),
    (11, 3),
    (12, 3),
    (13, 1),
    (14, 3),
    (15, 4);
-- ========================================
-- verify
-- ========================================
SELECT sp.title,
    c.category_name
FROM service_projects sp
    JOIN project_categories pc ON sp.project_id = pc.project_id
    JOIN categories c ON c.category_id = pc.category_id
ORDER BY sp.project_id;
-- ========================================
-- Creating Roles table
-- ========================================
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);
INSERT INTO roles (role_name, role_description)
VALUES ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');
-- ========================================
-- Creating users table
-- ========================================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);