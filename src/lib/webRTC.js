const getMediaDevices = async (receiveMyStream, dispatch) => {
  navigator.getWebcam =
    navigator.getUserMedia ||
    navigator.webKitGetUserMedia ||
    navigator.moxGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  if (navigator.mediaDevices.getUserMedia) {
    try {
      const myStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      dispatch(receiveMyStream(myStream));
    } catch (e) {
      console.warn(`${e.name}: ${e.message}`);
    }
  } else {
    try {
      const myStream = await navigator.getWebcam({ audio: true, video: true });
      dispatch(receiveMyStream(myStream));
    } catch (e) {
      console.warn(`${e.name}: ${e.message}`);
    }
  }
};

export default getMediaDevices;
