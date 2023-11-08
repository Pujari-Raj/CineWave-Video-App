const apiKey = "AIzaSyC2BRCFzXzmvZIYEBUtWS0kSfo6_6GuIm4";

const useFetch = async(
  options,
  baseURL = "https://youtube.googleapis.com/youtube/v3"
) => {
    const response = await fetch(`${baseURL}/${options}&key=${apiKey}`);
    const data = response.json();
    console.log("usefetch data-"+data);
    return data;
};

export default useFetch;