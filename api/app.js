const { createNodeMiddleware, createProbot } = require("probot");

const app = require("../../../app");
export default async function handler(req, res) {
  const probot = createProbot();

  const pApp = await probot.load(app);

  var octokit = await pApp.auth();

  res.json(await octokit.apps.listInstallations());
}
