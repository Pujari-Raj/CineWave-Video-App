import React from "react";
import HomePageShimmer from "./HomePageShimmer";
import VideoCard from "./VideoCard";

const HomePage = ({ videoData }) => {
    console.log("video=data-",videoData);
  return (
    <>
      <div className="videoCardInnerContainer">
        {videoData ? (
          videoData?.map((data) => {
            return (
              <VideoCard
                info={data}
                key={data?.id?.videoId ? data?.id?.videoId : data?.id}
              />
            );
          })
        ) : (
          <HomePageShimmer />
        )}
      </div>
    </>
  );
};

export default HomePage;
