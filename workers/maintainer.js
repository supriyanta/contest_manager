const { CronJob } = require("cron");
const fetchCodeforcesContests = require("./fetchCodeforcesContests.js");

new CronJob(
	"* */1 * * * *",
	fetchCodeforcesContests,
	null,
	true,
	"America/Los_Angeles"
);
