import {
    addVolunteer,
    removeVolunteer
} from "../models/volunteers.js";

const volunteerForProject = async (req, res) => {

    try {

        const userId = req.session.user.user_id;
        const projectId = req.params.id;

        await addVolunteer(userId, projectId);

        req.flash(
            "success",
            "You have successfully volunteered for this project."
        );

        return res.redirect(`/project/${projectId}`);

    } catch (error) {

        console.error(
            "Error volunteering for project:",
            error
        );

        req.flash(
            "error",
            "Unable to volunteer for project."
        );

        return res.redirect(`/project/${req.params.id}`);
    }
};

const unvolunteerForProject = async (req, res) => {

    try {

        const userId = req.session.user.user_id;
        const projectId = req.params.id;

        await removeVolunteer(userId, projectId);

        req.flash(
            "success",
            "You have been removed as a volunteer."
        );

        return res.redirect(`/project/${projectId}`);

    } catch (error) {

        console.error(
            "Error removing volunteer:",
            error
        );

        req.flash(
            "error",
            "Unable to remove volunteer."
        );

        return res.redirect(`/project/${req.params.id}`);
    }
};

export {
    volunteerForProject,
    unvolunteerForProject
};