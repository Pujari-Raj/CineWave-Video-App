import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShareSVG, DotsSVG, ClockSVG } from "../utilities/SVG";
import useFetch from "../utilities/useFetch";
import { addVideo, removeVideo } from "../utilities/librarySlice";
import {
  calculateTime,
  calculateViews,
  convertDuration,
} from "../utilities/useMathHelpers";

const VideoCard = ({ info }) => {
  const watchlater  = useSelector((store) => store?.library?.watchlater);
  const dispatch = useDispatch();

  const [channelIcon, setChannelIcon] = useState();
  const [viewCount, setViewCount] = useState();
  const [videoDuration, setvideoDuration] = useState();
  const [watchLaterBtn, setWatchLaterBtn] = useState(false);

  useEffect(() => {
    useFetch(`channels?part=snippet&id=${info?.snippet?.channelId}`).then(
      (data) =>
        setChannelIcon(data?.items[0]?.snippet?.thumbnails?.default?.url)
    );

    if (!info?.statistics) {
      useFetch(
        `videos?part=statistics%2CcontentDetails&id=${info?.id?.videoId}`
      ).then((data) => {
        setViewCount(data?.items[0]?.statistics?.viewCount);
        setvideoDuration(data?.items[0]?.contentDetails?.duration);
      });
    }
  }, [info]);

  return (
    <div className="videoCard">
      <Link
        className="textNone"
        to={
          info.id.videoId
            ? "/watch?v=" + info?.id?.videoId
            : "/watch?v=" + info?.id
        }
      >
        <div className="videoBanner">
          <img
            src={info?.snippet?.thumbnails?.maxres?.url || info?.snippet?.thumbnails?.medium?.url }
            className="videoBannerImg"
          />
          <span className="videoCardDuration">
            {(videoDuration && convertDuration(videoDuration)) ||
              (info?.contentDetails?.duration &&
                convertDuration(info?.contentDetails?.duration))}
          </span>
        </div>
      </Link>
      <div className="videoDesc">
        <Link className="textNone" to={"/channel/" + info?.snippet?.channelId}>
          <div className="channelIcon">
            <img src={channelIcon} className="channelIconImg" alt="" />
          </div>
        </Link>
        <div style={{ position: "relative", width: "95%" }}>
          <Link
            className="textNone"
            to={
              info.id.videoId
                ? "/watch?v=" + info?.id?.videoId
                : "/watch?v=" + info?.id
            }
          >
            <div className="videoTitle">{info?.snippet?.title}</div>
          </Link>
          <Link
            className="textNone"
            to={"/channel/" + info?.snippet?.channelId}
          >
            <div className="channelName">
              {info?.snippet?.channelTitle}
              <div className="titleTimeSeperator">{" • "}</div>
            </div>
          </Link>
          <Link
            className="textNone"
            to={
              info.id.videoId
                ? "/watch?v=" + info?.id?.videoId
                : "/watch?v=" + info?.id
            }
          >
            <div className="videoViews">
              {calculateViews(info?.statistics?.viewCount || viewCount) +
                " views  .  "}
              {info?.snippet?.publishedAt &&
                calculateTime(info?.snippet?.publishedAt)}
            </div>
          </Link>
        </div>
        <div
          className="vdOptionBtn"
          onClick={() => {
            // console.log("watchlater btn clicked");
            setWatchLaterBtn(!watchLaterBtn)
          }}
        >
          <DotsSVG />
        </div>
        {/* watchlater videos code */}
        {watchLaterBtn && (
          <div className="homeMenuBox">
            <div
              className="themeBoxMode"
              onClick={() => {
                watchlater?.includes(
                  info?.id?.videoId ? info?.id?.videoId : info?.id
                )
                  ? dispatch(
                      removeVideo(
                        info?.id?.videoId ? info?.id?.videoId : info?.id
                      )
                    )
                  : dispatch(
                      addVideo(info?.id?.videoId ? info?.id?.videoId : info?.id)
                    );
                setWatchLaterBtn(false);
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
    </div>
  );
};

export default VideoCard;
