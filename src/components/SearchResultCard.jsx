import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  calculateViews,
  calculateTime,
  convertDuration,
} from "../utilities/useMathHelpers";
import useFetch from "../utilities/useFetch";
import { ShareSVG, DotsSVG, ClockSVG } from "../utilities/SVG";

const SearchResultCard = ({
  vdoId,
  watchlater,
  dispatch,
  addVideo,
  removeVideo,
}) => {
  // console.log("video-id-->" + vdoId);
  const [info, setInfo] = useState(null);
  const [btnState, setBtnState] = useState(false);

  useEffect(() => {
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${vdoId}`
    ).then((data) => {
      //   console.log(data?.items[0]);
      setInfo(data?.items[0]);
      // console.log("" + info);
    });
  }, [vdoId]);

  return (
    <>
      <div className="videoBox">
        <Link to={"/watch?v=" + info?.id} className="textNone">
          <div className="videoThumb">
            <img
              src={info?.snippet?.thumbnails?.medium?.url}
              className="videoThumbImg"
            />
            <span className="videoCardDuration">
              {info?.contentDetails?.duration &&
                convertDuration(info?.contentDetails?.duration)}
            </span>
          </div>
        </Link>
        <div className="videoBoxDescCont">
          <Link to={"/watch?v=" + info?.id} className="textNone">
            <div className="videoBoxTitle">{info?.snippet?.title}</div>
          </Link>
          <div className="mobSearchVideoBoxDesc">
            <Link to={"/watch?v=" + info?.id} className="textNone">
              <div className="videoBoxTime">
                {calculateViews(info?.statistics?.viewCount) +
                  " views • " +
                  calculateTime(info?.snippet?.publishedAt)}
              </div>
            </Link>
            <Link
              to={"/channel/" + info?.snippet?.channelId}
              className="textNone"
            >
              <div className="videoBoxChannelTitle boldText">
                {info?.snippet?.channelTitle}
                <div className="titleTimeSeperator">{" • "}</div>
              </div>
            </Link>
          </div>
          <div className="videoBoxDesc">
            {info?.snippet?.description + "..."}
          </div>
        </div>
        <div className="wlOptionBtn" onClick={() => setBtnState(!btnState)}>
          <DotsSVG />
        </div>
        {btnState && (
          <div className="homeMenuBox">
            <div
              className="themeBoxMode"
              onClick={() => {
                watchlater?.includes(info?.id)
                  ? dispatch(removeVideo(info?.id))
                  : dispatch(addVideo(info?.id));
                setBtnState(false);
              }}
            >
              <ClockSVG />
              {!watchlater?.includes(
                info?.id?.videoId ? info?.id?.videoId : info?.id
              )
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

export default SearchResultCard;
