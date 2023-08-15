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

const getViews = (apiKey) => {
    Youtuber.find({}).then((youtubers) => {
      youtubers?.map((youtuber) => {
        getChannelViewCount(youtuber.name, apiKey).then((viewCount) => {
          console.log("View count:", convert(viewCount));
        });
      });
    });
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
