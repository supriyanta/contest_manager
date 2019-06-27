const express = require("express");
const cors = require("cors");
const { promisify } = require("util");
const redis = require("redis");

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

const app = express();

app.get("/contests", async (req, res) => {
	try {
		const data = await getAsync("codeforces");
		const contests = JSON.parse(data);
		return res.json({ contests });
	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ msg: "Internal Server error" });
	}
});

const PORT = 8000;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

// Start redis server
// sudo systemctl start redis
