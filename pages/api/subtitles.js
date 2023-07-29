import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  const { showId, season } = req.query; // Get the show ID and season from the query parameters

  try {
    // Make a request to the OpenSubtitles.com API to search for subtitles by show ID and season
    const response = await axios.get(
      "https://api.opensubtitles.com/api/v1/subtitles",
      {
        params: {
          imdbid: showId,
          season,
        },
        headers: {
          "Api-Key": process.env.OPENSUBTITLES_COM_KEY,
        },
      }
    );

    // Process the response and download the subtitles for each episode
    const subtitles = response.data.data;

    for (const subtitle of subtitles) {
      const subtitleUrl = subtitle.attributes.download;

      // Use your preferred method to download the subtitle file
      // For example, you could use the 'axios' library again
      const subtitleResponse = await axios.get(subtitleUrl, {
        responseType: "stream",
      });

      // Set the appropriate headers for the response
      res.setHeader("Content-Type", subtitleResponse.headers["content-type"]);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${subtitle.attributes.filename}`
      );

      // Stream the subtitle file to the client
      subtitleResponse.data.pipe(res);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
