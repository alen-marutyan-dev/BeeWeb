const {response} = require("../utils");
const {workspaceService} = require("../services");


const checkUserAccess = async (req, res, next) => {
    try {
        const workspaceId = req.params.id;
        const workspace = await workspaceService.getWorkspace(workspaceId);

        if (!workspace) {
            response({res, status: 404, message: 'Workspace not found'});
        }

        if (workspace.userId.toString() !== req.user._id.toString()) {
            response({res, status: 403, message: 'User does not have access to this workspace'});
        }

        next();
    } catch (error) {
        response({res, status: 500, message: error.message});
    }
}

module.exports = checkUserAccess