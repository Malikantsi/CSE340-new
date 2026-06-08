import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    processNewProjectForm,
    showNewProjectForm,
    projectValidation, 
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';
import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import {
    showOrganizationDetailsPage,
    processEditOrganizationForm,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm
} from './controllers/organizations.js';



const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/edit-project/:id',showEditProjectForm);

router.post('/edit-project/:id',projectValidation,processEditProjectForm
);

// error-handling routes
router.get('/test-error', testErrorPage);




// Route for project details page
router.get('/project/:id', showProjectDetailsPage);
//add show new project form
router.get('/new-project', showNewProjectForm);
router.post('/new-project',projectValidation, processNewProjectForm);

export default router;