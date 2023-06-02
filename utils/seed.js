// utils/seed.js
const connection = require("../config/connection");
const { User, Thought } = require("../models");
const data = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  try {
    console.log("connected");

    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.insertMany(data.users);
    const thoughts = await Thought.insertMany(data.thoughts);

    console.log(users, thoughts);
    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
