const axios = require("axios");
const Youtuber = require("./models/youtuber-model");

async function getChannelViewCount(channelName, apiKey) {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        q: channelName,
        maxResults: 1,
        type: "channel",
        key: apiKey,
      },
    }
  );

  const channelId = response?.data?.items[0]?.id?.channelId;
  const viewCount = await getChannelStatistics(channelId, apiKey);
  return viewCount;
}

async function getChannelStatistics(channelId, apiKey) {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/channels",
    {
      params: {
        part: "statistics",
        id: channelId,
        key: apiKey,
      },
    }
  );

  const viewCount = response?.data?.items[0]?.statistics?.viewCount;
  return viewCount;
}

const getViews = async () => {
  const apiKey = process.env.API_KEY;

  try {
    const youtubers = await Youtuber.find({});
    const promises = youtubers.map(async (youtuber) => {
      try {
        const viewCount = await getChannelViewCount(youtuber.name, apiKey);
        // Update the view field of the current youtuber
        youtuber.totalViews = convert(viewCount);

        // Save the updated youtuber to the database
        await youtuber.save();

        console.log(
          "View count updated for: ",
          youtuber.name + " " + youtuber.totalViews
        );
      } catch (err) {
        console.log("Error in finding view count", err);
        // Stop the program execution due to API limit error
        return;
      }
    });
    await Promise.all(promises);
  } catch (err) {
    console.log("Error in fetching YouTubers", err);
  }
};

const convert = (count) => {
  if (count > 1000000000) {
    return (count / 1000000000).toFixed(1) + " billion";
  } else if (count > 1000000) {
    return (count / 1000000).toFixed(1) + " million";
  } else {
    return count;
  }
};

module.exports = getViews;
