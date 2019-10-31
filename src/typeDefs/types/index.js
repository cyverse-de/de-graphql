const { userType } = require("./User");
const { appType } = require("./App");
const { analysisType } = require("./Analysis");
const { toolType } = require("./Tool");
const { permissionType } = require("./Permission")
const { AVUType } = require('./AVU');
const { templateType } = require('./Template');
const { commentType } = require('./Comment');

module.exports = {
    userType,
    appType,
    analysisType,
    toolType,
    permissionType,
    AVUType,
    templateType,
    commentType,
};