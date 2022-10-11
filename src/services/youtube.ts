export const getVideoUrl = async (songTitle: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${new URLSearchParams({
        q: `the beatles - ${songTitle}`,
        part: "snippet",
        maxResults: "1",
        key: process.env.YOUTUBE_API_KEY ?? "",
      })}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    const id = json.items[0]?.id?.videoId;
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};
