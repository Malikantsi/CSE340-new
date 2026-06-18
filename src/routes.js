import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireAdmin,
    showUsersPage
} from './controllers/users.js';
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
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
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

import {
    volunteerForProject,
    unvolunteerForProject
} from "./controllers/volunteers.js";


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/register', showUserRegistrationForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);


router.post(
    "/project/:id/volunteer",
    requireLogin,
    volunteerForProject
);

router.post(
    "/project/:id/unvolunteer",
    requireLogin,
    unvolunteerForProject
);

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
router.post('/register', processUserRegistrationForm);




router.get('/new-category',showNewCategoryForm);

router.post('/new-category',categoryValidation,processNewCategoryForm);

router.get('/edit-category/:id',showEditCategoryForm);

router.post('/edit-category/:id',categoryValidation,processEditCategoryForm);

// error-handling routes
router.get('/test-error', testErrorPage);

// Route for project details page
router.get('/project/:id', showProjectDetailsPage);
//add show new project form
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);


// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);


router.get('/dashboard', requireLogin, showDashboard);
router.get('/allusers', requireAdmin, showUsersPage);



export default router;