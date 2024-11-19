const Project = require('../models/Project');

// Fetch all projects
const getProjects = async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
};

// Add a new project
const addProject = async (req, res) => {
    const { title, description, assignedTo } = req.body;
    const project = new Project({ title, description, assignedTo });
    await project.save();
    res.status(201).json(project);
};

module.exports = { getProjects, addProject };
