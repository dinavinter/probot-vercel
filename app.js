const createScheduler = require("probot-scheduler");
const { ProbotOctokit } = require("probot");

/**
 * @param {import('probot').Probot} app
 */
module.exports = (app, { getRouter }) => {
  app.log("Yay! The app was loaded!");

  // app.scheduler = createScheduler(app, {
  //   delay: !process.env.DISABLE_DELAY,
  //   interval: (parseInt(process.env.PULL_INTERVAL, 10) || 3600) * 1000
  // })
  const router = getRouter("/app");

  //   const octokit = new ProbotOctokit({
  //     // any options you'd pass to Octokit
  //     auth: {
  //       token: app.auth(),
  //     },
  //     // and a logger
  //     log: app.log.child({ name: "my-octokit" }),
  //   });
  // }
  router.use(require("express").static("public"));
  router.get("/installations", async (req, res) => {
    console.log(app.octokit);
    const octokit = await app.auth();
    res.json(await octokit.apps.listInstallations());
  });

  app.on(
    ["installation", "installation_repositories"],
    async ({ name, payload, log, context }) => {
      console.log("c");
      console.log(context);

      console.log(context.app?.octokit);
      console.log(context.octokit);

      const {
        action,
        repositories,
        repositories_added,
        repositories_removed,
        installation,
      } = payload;

      const repositoriesChange =
        action === "created"
          ? repositories.length
          : action === "deleted"
          ? -repositories.length
          : repositories_added
          ? repositories_added.length - repositories_removed.length
          : 0;

      const meta = {
        event: name,
        action,
        account: installation.account.id,
        accountType: installation.account.type.toLowerCase(),
        accountLogin: installation.account.login,
        installation: installation.id,
        selection: installation.repository_selection,
        repositoriesChange,
      };
      log.info(meta, `${meta.accountLogin}: ${name} ${action}`);
    }
  );
  // const routes = app.route()

  // routes.get('/', (req, res) => res.redirect(`https://pages.github.tools.sap/cdc-ciam/api-portal/draft`))

  // routes.get('/installations', async (req, res) => {
  //   if (req.query.key !== process.env.WEBHOOK_SECRET) {
  //     return res.status(403).end()
  //   }
  //   const repos = Object.assign({}, app.scheduler.repos)
  //   for (const key in repos) {
  //     if (repos[key] instanceof Date) {
  //       repos[key] = (repos[key].getTime() - new Date().getTime()) / 1000
  //     }
  //   }
  //   res.json(repos)
  // })

  app.on("issues.opened", async (context) => {
    return context.octokit.issues.createComment(
      context.issue({ body: "Hello, World!" })
    );
  });
};
