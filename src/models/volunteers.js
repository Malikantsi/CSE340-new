import db from './db.js';

// Add volunteer
export const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING *;
    `;
    const result = await db.query(query, [userId, projectId]);
    return result.rows[0];
};

// Remove volunteer
export const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteers
        WHERE user_id = $1 AND project_id = $2;
    `;
    await db.query(query, [userId, projectId]);
};

// Check if user is volunteering
export const isVolunteer = async (userId, projectId) => {
    const query = `
        SELECT 1 FROM volunteers
        WHERE user_id = $1 AND project_id = $2;
    `;
    const result = await db.query(query, [userId, projectId]);
    return result.rowCount > 0;
};

// Get all projects for a user
export const getUserVolunteeredProjects= async (userId) => {
    const query = `
        SELECT p.*
        FROM service_projects p
        JOIN volunteers pv ON p.project_id = pv.project_id
        WHERE pv.user_id = $1;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
};