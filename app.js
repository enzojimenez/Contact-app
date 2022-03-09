const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./routes/contact.route");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRoute);
const { DB_ADMIN, DB_PASSWORD } = process.env;
const PORT = process.env.PORT || 8080;
// home route
app.get("/", (req, res) => {
	res.render("home",{title: "Home"})
});

// not found page
app.use((req, res, err) => {
	res.json({
		msg: "Page is not found!",
		errMsg: err,
	});
});

// listening port
mongoose
	.connect(
		`mongodb://process.env.MONGODB/contacts`,
		{
			authSource: "admin",
			user: DB_ADMIN,
			pass: DB_PASSWORD
		}
	)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running at http://localhost:${PORT}`);
		});
	})
	.catch((err) => console.log("Main Error: " + err));
