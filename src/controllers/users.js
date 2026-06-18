import bcrypt from 'bcrypt';
import { createUser, authenticateUser, getAllUsers } from '../models/users.js';
import router from '../routes.js';
import { getUserVolunteeredProjects } from '../models/volunteers.js';




const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        // Redirect to the home page after successful registration
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        
        if (user) {
            // Store user info in session
            req.session.user = user;
            req.flash('success', 'Login successful!');
            return res.redirect('/dashboard');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            res.redirect('/');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};

/*const showDashboard = async (req, res) => {
    
    console.log("=== showDashboard function START ===");
    
    try {
        console.log("1. Checking session user...");
        const user = req.session.user;
        console.log("2. User object:", JSON.stringify(user, null, 2));
        
        if (!user) {
            console.log("3. No user found in session!");
            req.flash('error', 'You must be logged in');
            return res.redirect('/login');
        }
        
        console.log("4. Calling getVolunteerProjects with user_id:", user.user_id);
        const volunteerProjects = await getVolunteerProjects(user.user_id);
        console.log("5. getVolunteerProjects returned:", volunteerProjects);
        console.log("6. Type of volunteerProjects:", typeof volunteerProjects);
        console.log("7. Is array?", Array.isArray(volunteerProjects));
        
        console.log("8. About to render dashboard...");
        res.render('dashboard', {
            title: 'Dashboard',
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            volunteerProjects: volunteerProjects || []
        });
        console.log("9. Dashboard rendered successfully!");
        
    } catch (error) {
        console.error("=== ERROR in showDashboard ===");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        
        // IMPORTANT: DO NOT throw the error again!
        // Send a response instead
        console.log("Sending fallback response...");
        
        // Try to render with default values
        try {
            res.render('dashboard', {
                title: 'Dashboard',
                name: req.session.user?.name || 'User',
                email: req.session.user?.email || '',
                role_id: req.session.user?.role_id || 1,
                volunteerProjects: []  // Empty array as fallback
            });
        } catch (renderError) {
            console.error("Fallback render also failed:", renderError);
            res.status(500).send("Unable to load dashboard");
        }
    }
    
    console.log("=== showDashboard function END ===");
};*/

const showDashboard = async (req, res) => {

    const user = req.session.user;

    const volunteerProjects = await getUserVolunteeredProjects(user.user_id);

    return res.render('dashboard', {
        title: 'THIS IS THE NEW DASHBOARD',
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        testVariable: 'HELLO',
        volunteerProjects
    });
};




const requireAdmin = (req, res, next) => {
     req.flash('error', req.session.user.role_id);
    if (!req.session || !req.session.user || req.session.user.role_id!==2) {
        req.flash('error', 'You do not have permission to access that page.');
        return res.redirect('/dashboard');
    }
    next();
}

const showUsersPage = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.render("users", {
      title: "Registered Users",
      users
    });
  } catch (error) {
    console.error(error);

    req.flash("error", "Unable to retrieve users.");

    return res.redirect("/dashboard");
  }
};



export { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireAdmin, showUsersPage };