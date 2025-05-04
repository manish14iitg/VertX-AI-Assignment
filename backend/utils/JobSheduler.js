const cron = require("node-cron");
const Post = require("../models/Post");
const { fetchRedditPosts } = require("./redditFeed");

cron.schedule("0 1 * * *", async () => {
  
  try {
    console.log("job started")
    const redditPosts = await fetchRedditPosts();
    console.log("Fetched Reddit posts:", JSON.stringify(redditPosts, null, 2));

    await Post.insertMany(
      redditPosts.map((post) => ({
        source: "reddit",
        data: post,
      }))
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
});
