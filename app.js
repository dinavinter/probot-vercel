const createScheduler = require("probot-scheduler");
const { ProbotOctokit } = require("probot");
const {OpenApiBundleProbot} = require("@api-io/bundle").default;

/**
 * @param {import('probot').Probot} app
 */
module.exports = (app)=> OpenApiBundleProbot(app);