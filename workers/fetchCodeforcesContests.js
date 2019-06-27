const fetch = require("node-fetch");
const { promisify } = require("util");
const redis = require("redis");

const client = redis.createClient();
const setAsync = promisify(client.set).bind(client);
const url = `https://codeforces.com/api/contest.list`;

const fetchCodeforcesContests = async () => {
	const res = await fetch(url);
	let { result: contests } = await res.json();
	console.log(`fetched ${contests.length} contests`);
	// Filter
	contests = contests.filter(contest => contest.phase === "BEFORE");
	console.log(`extracted ${contests.length} contests`);

	await setAsync("codeforces", JSON.stringify(contests));
};

// fetchCodeforcesContests();

// TODO: add filter:
// * active contests

module.exports = fetchCodeforcesContests;

/*
[ { id: 1178,
       name: 'Codeforces Global Round 4',
       type: 'CF',
       phase: 'BEFORE',
       frozen: false,
       durationSeconds: 7200,
       startTimeSeconds: 1563636900,
       relativeTimeSeconds: -2091182 },
     { id: 1184,
       name:
        'Helvetic Coding Contest 2019 online mirror (teams allowed, unrated)',
       type: 'ICPC',
       phase: 'BEFORE',
       frozen: false,
       durationSeconds: 18000,
       startTimeSeconds: 1562483100,
       relativeTimeSeconds: -937382 },
     { id: 1187,
       name: 'Educational Codeforces Round 67 (Rated for Div. 2)',
       type: 'IOI',
       phase: 'BEFORE',
       frozen: false,
       durationSeconds: 7200,
       startTimeSeconds: 1561905300,
       relativeTimeSeconds: -359582 },
     { id: 1186,
       name: 'Codeforces Round #571 (Div. 2)',
       type: 'CF',
       phase: 'BEFORE',
       frozen: false,
       durationSeconds: 8100,
       startTimeSeconds: 1561709100,
       relativeTimeSeconds: -163382 },
     { id: 1183,
       name: 'Codeforces Round #570 (Div. 3)',
       type: 'ICPC',
       phase: 'BEFORE',
       frozen: false,
       durationSeconds: 7200,
       startTimeSeconds: 1561559700,
       relativeTimeSeconds: -13984 },
     { id: 1179,
       name: 'Codeforces Round #569 (Div. 1)',
       type: 'CF',
       phase: 'FINISHED',
       frozen: false,
       durationSeconds: 7200,
       startTimeSeconds: 1561136700,
       relativeTimeSeconds: 409018 },
     { id: 1180,
       name: 'Codeforces Round #569 (Div. 2)',
       type: 'CF',
       phase: 'FINISHED',
       frozen: false,
       durationSeconds: 7200,
       startTimeSeconds: 1561136700,
       relativeTimeSeconds: 409018 },
*/
