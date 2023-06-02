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

    for (let thought of data.thoughts) {
      const { username } = thought;
      const user = users.find(user => user.username === username);
      if (user) {
        const createdThought = await Thought.create(thought);
        await User.findOneAndUpdate(
          { username: user.username },
          { $push: { thoughts: createdThought._id } },
          { runValidators: true, new: true }
        );
      }
    }

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
