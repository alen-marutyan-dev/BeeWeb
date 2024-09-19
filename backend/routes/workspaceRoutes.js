const express = require('express');
const {authMiddleware, workspaceValidator, validate, existWorkspace, checkUserAccess} = require("../middleware");
const router = express.Router();
const { workspaceController } = require('../controllers');


router.post('/', workspaceValidator, validate, authMiddleware, workspaceController.createWorkspace );
router.put('/:id', workspaceValidator, validate, authMiddleware, checkUserAccess, existWorkspace, workspaceController.updateWorkspace );
router.delete('/:id', authMiddleware, checkUserAccess, existWorkspace, workspaceController.deleteWorkspace );
router.get('/check-slug-availability', authMiddleware, workspaceController.checkSlugAvailability);
router.get('/all', authMiddleware, workspaceController.getAllWorkspace)
router.get('/:id', authMiddleware, checkUserAccess, existWorkspace, workspaceController.getWorkspace);



module.exports = router;