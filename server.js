const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;
let intial_path = require("path").join(__dirname, "public");
let Youtuber = require("./models/youtuber-model");
const bcrypt = require("bcrypt");
const getViews = require("./updateView");

// Configure Middlewares
require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(intial_path));

// Connecting the database
const mongoose = require("mongoose");
const fs = require("fs");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
app.get("/", async (req, res) => {
  try {
    const youtubers = await Youtuber.find({}); // Fetch all YouTubers from the database
    return res.render("home", {
      youtubers: youtubers, // Pass the fetched data to the EJS view
    });
  } catch (err) {
    console.error("Error fetching YouTubers:", err);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/addYoutuber", (req, res) => {
  res.render("addYoutuber.ejs", { errorMessage: "" });
});

app.get("/removeYoutuber", (req, res) => {
  res.render("removeYoutuber.ejs", { errorMessage: "" });
});

app.get("/updateViews", () => {
  getViews()
    .then((res) => res.json("Updated views!"))
    .catch((err) => res.json(`Error Updating ${err}`));
});

app.post("/add", (req, res) => {
  const { category, name, birthday, totalViews, link } = req.body;
  Youtuber.findOne({ name: name })
    .then((existingYoutuber) => {
      if (existingYoutuber) {
        // If the Youtuber with the same name already exists, show the error
        const errorMessage = "Youtuber with this name already exists!";
        return res.render("addYoutuber.ejs", { errorMessage });
      } else {
        // Create a new instance of the Youtuber model with the data
        const newYoutuber = new Youtuber({
          category,
          name,
          birthday,
          totalViews,
          link,
        });

        // Save the new YouTuber to the database
        newYoutuber
          .save()
          .then(() => {
            // Refresh or Udpate views for all youtubers
            getViews();
            // Redirect back to the home page
            return res.status(200).redirect("/");
          })
          .catch((err) => {
            console.log("Error adding YouTuber:", err);
            return res.status(500).send("Internal Server Error");
          });
      }
    })
    .catch((err) => {
      console.log("Error checking for duplicate name:", err);
      return res.status(500).send("Internal Server Error");
    });
});

app.post("/remove", (req, res) => {
  const { key, name } = req.body;

  bcrypt
    .compare(key, process.env.SECRET_KEY)
    .then((isMatch) => {
      // If the key matches delete the youtuber
      if (isMatch) {
        Youtuber.findOneAndDelete({ name: name })
          .then(() => {
            return res.status(200).redirect("/");
          })
          .catch(() => res.status(400).json("Error!"));
      } else {
        // If the key doesn't match, set the errorMessage
        const errorMessage = "Key does not match!";
        return res.render("removeYoutuber.ejs", { errorMessage });
      }
    })
    .catch((err) => console.log("Error comparing key", err));
});

// Listening on port
app.listen(port, () => {
  console.log("Listening at port", port);
});
