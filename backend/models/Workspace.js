const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true},
}, {
    timestamps: true
});

module.exports = mongoose.model('Workspace', WorkspaceSchema);
