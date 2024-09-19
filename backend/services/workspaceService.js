const { WorkspaceModel } = require('../models');

class WorkspaceService {
    creatWorkspace(data) {
        return WorkspaceModel.create({ ...data });
    }

    getWorkspacesBySlug(userId, slug) {
        return WorkspaceModel.findOne({ userId, slug });
    }

    getWorkspace(id) {
        return WorkspaceModel.findById(id);
    }

    getAllWorkspace(userId) {
        return WorkspaceModel.find({userId});
    }

    updateWorkspace(id, data) {
        return WorkspaceModel.findByIdAndUpdate(id, { ...data }, { new: true });
    }

    deleteWorkspace(id) {
        return WorkspaceModel.findByIdAndDelete(id);
    }

    async getAvailableSlug(userId, baseSlug) {
        const suggestions = [];
        let counter = 1;

        while (suggestions.length < 3) {
            const slug = `${baseSlug}${counter}`;
            const existingWorkspace = await WorkspaceModel.findOne({ userId, slug });

            if (!existingWorkspace) {
                suggestions.push(slug);
            }
            counter++;
        }

        return suggestions;
    }
}

module.exports = new WorkspaceService();
