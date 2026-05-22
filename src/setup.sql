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