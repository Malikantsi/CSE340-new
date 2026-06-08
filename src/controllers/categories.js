// Import any needed model functions
import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    updateCategoryAssignments,
    getCategoriesByServiceProjectId,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { body, validationResult } from 'express-validator';

import {
    getProjectDetails,
    getCategoriesByProjectId
} from '../models/projects.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

const showCategoryDetailsPage = async (req, res) => {

    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = category.category_name;

    res.render('category', {
        title,
        category,
        projects
    });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

//Category Validation
const categoryValidation = [
    body('categoryName')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];


//Show New Category Form
const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', {
        title
    });
};

//Process New Category Form
const processNewCategoryForm = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { categoryName } = req.body;

    const categoryId =
        await createCategory(categoryName);

    req.flash(
        'success',
        'Category created successfully!'
    );

    return res.redirect(`/category/${categoryId}`);
};

//Show Edit Category Form
const showEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id;

    const category =
        await getCategoryById(categoryId);

    const title = 'Edit Category';

    res.render('edit-category', {
        title,
        category
    });
};

//Process Edit Category Form
const processEditCategoryForm = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect(
            `/edit-category/${req.params.id}`
        );
    }

    const categoryId = req.params.id;
    const { categoryName } = req.body;

    await updateCategory(
        categoryId,
        categoryName
    );

    req.flash(
        'success',
        'Category updated successfully!'
    );

    return res.redirect(
        `/category/${categoryId}`
    );
};


// Export any controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    processAssignCategoriesForm,
    showAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};