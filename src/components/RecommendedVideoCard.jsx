import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addVideo, removeVideo } from "../utilities/librarySlice";
import useFetch from "../utilities/useFetch";
import {
  calculateTime,
  calculateViews,
  convertDuration,
} from "../utilities/useMathHelpers";
import { ShareSVG, DotsSVG, ClockSVG } from "../utilities/SVG";
import { useDispatch, useSelector } from "react-redux";

const RecommendedVideoCard = (data) => {
  const watchLater = useSelector((store) => store?.library?.watchLater);
  const [btnState, setBtnState] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${data?.id?.videoId}`
    ).then((data) => {
      setVideoData(data?.items[0]);
    });
  }, []);

  return (
    <div className="sideBarCards">
      <div className="sidebarThumb">
        <Link to={"/watch?v=" + data?.id?.videoId} className="textNone">
          <img
            src={data?.snippet?.thumbnails?.medium?.url}
            className="sidebarImg"
          />
          <span className="videoCardDuration">
            {videoData?.contentDetails?.duration &&
              convertDuration(videoData?.contentDetails?.duration)}
          </span>
        </Link>
      </div>
      <div className="sidebarDesc">
        <Link to={"/watch?v=" + data?.id?.videoId} className="textNone">
          <div className="sidebarTitle">{data?.snippet?.title}</div>
          <div className="sidebarChannel">
            {data?.snippet?.channelTitle}
            <div className="titleTimeSeperator">{" • "}</div>
          </div>
          <div className="sidebarInfo sidebarChannel">
            {videoData?.statistics?.viewCount &&
              calculateViews(videoData?.statistics?.viewCount) + " views  •  "}
            {data?.snippet?.publishedAt && calculateTime(data?.snippet?.publishedAt)}
          </div>
        </Link>
      </div>
      <div className="sbOptionBtn" onClick={() => setBtnState(!btnState)}>
        <DotsSVG />
      </div>
      {btnState && (
        <div className="homeMenuBox">
          <div
            className="themeBoxMode"
            onClick={() => {
              watchLater?.includes(data?.id?.videoId)
                ? dispatch(removeVideo(data?.id?.videoId))
                : dispatch(addVideo(data?.id?.videoId));
              setBtnState(false);
            }}
          >
            <ClockSVG />
            {!watchLater?.includes(data?.id?.videoId)
              ? "Save to Watch later"
              : "Remove from Watch later"}
          </div>
          <div className="themeBoxMode">
            <ShareSVG />
            Share
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedVideoCard;
