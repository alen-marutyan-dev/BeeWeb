const express = require('express');
const router = express.Router();

// Routes
const authRoutes = require('./authRoutes');
const workspaceRoutes = require('./workspaceRoutes');


router.use('/auth', authRoutes);
router.use('/workspace', workspaceRoutes);

module.exports = router;
