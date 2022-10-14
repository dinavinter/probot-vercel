const { createNodeMiddleware, createProbot } = require("probot");

const {OpenApiBundleProbot} = require("@api-io/bundle");
const probot = createProbot();

module.exports = createNodeMiddleware(OpenApiBundleProbot, { probot, webhooksPath: '/api/github/webhooks' });
