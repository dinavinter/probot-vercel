const { createProbot } = require("probot");

const {OpenApiBundleProbot} = require("@api-io/bundle");
export default async function handler(req, res) {
  const probot = createProbot( {env:process.env});

  const pApp = await probot.load(OpenApiBundleProbot);

  var octokit = await probot.auth();

  res.json(await octokit.apps.listInstallations());
}
