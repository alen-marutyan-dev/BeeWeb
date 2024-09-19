const {workspaceService} = require('../services');
const {response} = require("../utils");

const existWorkspace = (req, res, next) => {
    try {
        const workspaceId = req.params.id;
        const workspace = workspaceService.getWorkspace(workspaceId);

        if (!workspace) {
            response({res, status: 404, message: 'Workspace not found'});
        }

        next();
    } catch (error) {
        response({res, status: 500, message: error.message});
    }
}

module.exports = existWorkspace;