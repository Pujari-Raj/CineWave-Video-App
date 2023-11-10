import React, { useState, useEffect } from "react";
import useFetch from "../utilities/useFetch";
import RecommendedVideoCard from "../components/RecommendedVideoCard";
import RecommendedShimmer from "../components/RecommendedShimmer";

const RecommendedVideos = ({ videoID, title }) => {
  const [reccVideoData, setReccVideoData] = useState(null);

  useEffect(() => {
    if (title)  
      useFetch(
        `search?part=snippet&type=video&maxResults=25&videoDuration=medium&q=${title.slice(
          0,
          40
        )}`
      ).then((dataSet) => {
        setReccVideoData(dataSet?.items);
      });
  }, [title]);

  return (
    <>
      <div className="recommendedSection">
        {reccVideoData ? (
          reccVideoData?.length > 0 ? (
            reccVideoData?.map((reccVideoData) => {
              return (
                <RecommendedVideoCard
                  {...reccVideoData}
                //   key={reccVideoData?.id?.videoId}
                key={videoID}
                />
              );
            })
          ) : (
            <div className="centerDiv">No related video found</div>
          )
        ) : (
          <RecommendedShimmer />
        )}
      </div>
    </>
  );
};

export default RecommendedVideos;
