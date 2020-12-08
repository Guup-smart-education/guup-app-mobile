export const buildMxVideoUrl = (playbackID: string) => {
  if (!playbackID) {
    return false;
  }
  return `https://stream.mux.com/${playbackID}.m3u8`;
};
