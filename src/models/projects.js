// In src/models/projects.js
import db from "./db.js"


export const getAllProjects = async () => {
    try {
        const query = `
            SELECT
                service_projects.project_id,
                service_projects.title,
                service_projects.description,
                service_projects.location,
                service_projects.project_date,
                organizations.name AS organization_name
            FROM service_projects
            JOIN organizations
            ON service_projects.organization_id = organizations.organization_id
            ORDER BY service_projects.project_date;
        `
        
        const result = await db.query(query)
        return result.rows
        
    } catch (error) {
        console.error('Error in getAllProjects:', error.message)
        return []
    }
}