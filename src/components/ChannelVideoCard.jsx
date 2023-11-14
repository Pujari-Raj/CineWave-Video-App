import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTime,
  calculateViews,
  convertDuration,
} from "../utilities/useMathHelpers";
import { addVideo, removeVideo } from "../utilities/librarySlice";
import useFetch from "../utilities/useFetch";
import { ShareSVG, DotsSVG, ClockSVG } from "../utilities/SVG";

const ChannelVideoCard = ({ data }) => {
  const [vdoData, setVdoData] = useState(null);
  const [btnState, setBtnState] = useState(false);
  const watchlater = useSelector((store) => store.library.watchlater);
  const dispatch = useDispatch();
  useEffect(() => {
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${data?.snippet?.resourceId?.videoId}`
    ).then((data) => {
      setVdoData(data?.items[0]);
      // console.log(data);
    });
  }, []);

  return (
    <>
      <div className="chVideoCard">
        <div className="chVideoCardThumb">
          <Link
            to={"/watch?v=" + data?.snippet?.resourceId?.videoId}
            className="textNone"
          >
            <img
              src={data?.snippet?.thumbnails?.medium?.url}
              className="chVideoCardThumbImg"
            />
            {vdoData?.contentDetails?.duration && (
              <span className="videoCardDuration">
                {convertDuration(vdoData?.contentDetails?.duration)}
              </span>
            )}
          </Link>
        </div>
        <div className="chVideoCardDesc">
          <Link
            to={"/watch?v=" + data?.snippet?.resourceId?.videoId}
            className="textNone"
          >
            <div className="chVideoCardTitle">{data?.snippet?.title}</div>
            <div className="sidebarChannel chTitle">
              {data?.snippet?.channelTitle}
            </div>
            <div className="chVideoCardInfo">
              {vdoData?.statistics?.viewCount &&
                calculateViews(vdoData?.statistics?.viewCount) + " views  •  "}
              {data?.snippet?.publishedAt &&
                calculateTime(data?.snippet?.publishedAt)}
            </div>
          </Link>
        </div>
        <div className="vdOptionBtn" onClick={() => setBtnState(!btnState)}>
          <DotsSVG />
        </div>
        {btnState && (
          <div className="homeMenuBox">
            <div
              className="themeBoxMode"
              onClick={() => {
                watchlater?.includes(data?.snippet?.resourceId?.videoId)
                  ? dispatch(removeVideo(data.snippet?.resourceId?.videoId))
                  : dispatch(addVideo(data.snippet?.resourceId?.videoId));
                setBtnState(false);
              }}
            >
              <ClockSVG />
              {!watchlater?.includes(data?.snippet?.resourceId?.videoId)
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
    </>
  );
};

export default ChannelVideoCard;
