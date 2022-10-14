const { createNodeMiddleware, createProbot } = require("probot");

const {OpenApiBundleProbot} = require("@api-io/bundle");
const probot = createProbot({env:process.env});

module.exports = createNodeMiddleware(OpenApiBundleProbot, { probot, webhooksPath: '/api/github/webhooks' });
