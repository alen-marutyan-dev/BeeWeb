const errorHandler = require('./errorHandler');
const validate = require('./validators/validate');
const {loginValidator, signupValidator} = require('./validators/authValidator');
const {workspaceValidator} = require('./validators/workspaceValidator');
const checkEmailDuplicate = require("./checkEmailDuplicate");
const authMiddleware = require("./authMiddleware");
const existWorkspace = require("./existWorkspace");
const checkUserAccess = require("./checkUserAccess");


module.exports = {
    errorHandler,
    validate,
    loginValidator,
    signupValidator,
    checkEmailDuplicate,
    authMiddleware,
    workspaceValidator,
    existWorkspace,
    checkUserAccess
}