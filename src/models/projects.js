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



const createProject = async (
    title,
    description,
    location,
    date,
    organizationId
) => {
    const query = `
        INSERT INTO service_projects
        (
            title,
            description,
            location,
            project_date,
            organization_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

    const queryParams = [
        title,
        description,
        location,
        date,
        organizationId
    ];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error("Failed to create project");
    }

    return result.rows[0].project_id;
};  

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {

    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM service_projects sp
        JOIN organizations o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date ASC
        LIMIT $1;
    `;

    const queryParams = [numberOfProjects];

    const result = await db.query(query, queryParams);

    return result.rows;
};


const getProjectDetails = async (projectId) => {

    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM service_projects sp
        JOIN organizations o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0
        ? result.rows[0]
        : null;
};



const updateProject = async (
    projectId,
    organizationId,
    title,
    description,
    location,
    projectDate
) => {
    const query = `
        UPDATE service_projects
        SET
            organization_id = $1,
            title = $2,
            description = $3,
            location = $4,
            project_date = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [
        organizationId,
        title,
        description,
        location,
        projectDate,
        projectId
    ];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to update project');
    }

    return result.rows[0].project_id;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.category_name
        FROM categories c
        JOIN project_categories pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.category_name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};


// Export the model functions
export {
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    getCategoriesByProjectId,
    createProject,
    updateProject
};