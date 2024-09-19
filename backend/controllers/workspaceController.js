const {response} = require('../utils');
const {workspaceService} = require('../services');

class WorkspaceController {
    async createWorkspace(req, res) {
        try {
            const {name, slug} = req.body;

            const checkSlug = await workspaceService.getWorkspacesBySlug(req.user._id,slug);

            if (checkSlug) {
                response({res, status: 409, message: 'Workspace slug already exists!'});
            }

            const workspace = await workspaceService.creatWorkspace({name, slug, userId: req.user._id});

            response({res, status: 200, message: 'Workspace created successfully', data: workspace});
        } catch (error) {
            response({res, status: 500, message: error.message});
        }
    }

    async getWorkspace(req, res) {
        try {
            const workspaceId = req.params.id;
            const workspace = await workspaceService.getWorkspace(workspaceId);

            response({res, status: 200, message: 'Workspace fetched successfully', data: workspace});
        } catch (error) {
            response({res, status: 500, message: error.message});
        }
    }

    async getAllWorkspace(req, res) {
        try {


            const workspace = await workspaceService.getAllWorkspace(req.user._id);

            response({res, status: 200, message: 'Workspace fetched successfully', data: workspace});
        } catch (error) {
            response({res, status: 500, message: error.message});
        }
    }


    async updateWorkspace(req, res) {
        try {
            const workspaceId = req.params.id;
            const workspace = await workspaceService.updateWorkspace(workspaceId, req.body);

            response({res, status: 200, message: 'Workspace updated successfully', data: workspace});
        } catch (error) {
            response({res, status: 500, message: error.message});
        }
    }

    async deleteWorkspace(req, res) {
        try {
            const workspaceId = req.params.id;
            await workspaceService.deleteWorkspace(workspaceId);

            response({res, status: 200, message: 'Workspace deleted successfully'});
        } catch (error) {
            response({res, status: 500, message: error.message});
        }
    }

    async checkSlugAvailability(req, res) {
        try {
            const { slug } = req.query;

            const existingWorkspace = await workspaceService.getWorkspacesBySlug(req.user._id, slug);

            if (!existingWorkspace) {
                response({ res, status: 200, message: 'Slug is available', data: {
                        suggestedSlug: [],
                        isAvailable: true
                    } });
                return;
            }

            const suggestedSlug = await workspaceService.getAvailableSlug(req.user._id, slug);
            response({
                res,
                status: 200,
                message: 'Slug is taken. Suggested alternative:',
                data: {
                    suggestedSlug: suggestedSlug,
                    isAvailable: false
                }
            });
        } catch (error) {
            response({ res, status: 500, message: error.message });
        }
    }

}


module.exports = new WorkspaceController();