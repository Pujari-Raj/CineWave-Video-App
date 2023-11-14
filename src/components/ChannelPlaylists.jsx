import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { channelContext } from "../utilities/context";
import { calculateTime } from "../utilities/useMathHelpers";
import useFetch from "../utilities/useFetch";
import ChannelPageShimmer from "./ChannelPageShimmer";
import Spinner from "./Spinner";

const VideoCard = ({ data }) => {
  // console.log(data);
  return data?.contentDetails?.itemCount > 0 ? (
    <div className="chVideoCard">
      <div className="chVideoCardThumb">
        <img
          src={data?.snippet?.thumbnails?.medium?.url}
          className="chVideoCardThumbImg"
        />
        <div className="chVideoCardVideoCount">
          <span>
            <svg viewBox="4 4 18 14" className="chVideoCardSVG">
              <path d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"></path>
            </svg>
          </span>
          <span>{data?.contentDetails?.itemCount + " videos"}</span>
        </div>
      </div>
      <div className="chVideoCardDesc">
        <div className="chVideoCardTitle">{data?.snippet?.title}</div>
        <div className="chVideoCardInfo">
          {"Created " + calculateTime(data?.snippet?.publishedAt)}
        </div>
        <div className="chVideoCardPlaylistBtn">View Full Playlist</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

const ChannelPlaylists = () => {
  const dataSet = useContext(channelContext);
  const channelId = dataSet?.channelId;
  const [playlistData, setPlaylistData] = useState();
  const [nextPageToken, setNextPageToken] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    useFetch(
      `playlists?part=snippet%2CcontentDetails&maxResults=15&channelId=${channelId}`
    ).then((data) => {
      setPlaylistData(data?.items);
      setNextPageToken(data?.nextPageToken);
      // console.log(data);
    });
  }, [channelId]);

  const fetchMorePlaylists = () => {
    useFetch(
      `playlists?part=snippet%2CcontentDetails&maxResults=15&channelId=${channelId}&pageToken=${nextPageToken}`
    ).then((data) => {
      setNextPageToken(data?.nextPageToken);
      setPlaylistData((prev) => [...prev, ...data?.items]);
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className="chHomeContainer">
        {playlistData ? (
          playlistData?.length > 0 ? (
            playlistData?.map((item) => {
              return (
                //getting playlist from(item?.id) and on-click redirecting user to particular playlist
                <Link key={item?.id} className="textNone" to={item?.id}>
                  <VideoCard data={item} />
                </Link>
              );
            })
          ) : (
            <div className="centerDiv">This channel has no playlists</div>
          )
        ) : (
          <ChannelPageShimmer />
        )}
      </div>
      {!isLoading && nextPageToken && (
        <div className="loadBtnContainer">
          <div
            onClick={() => {
              setIsLoading(true);
              fetchMorePlaylists();
            }}
            className="loadMoreBtn"
          >
            Load more playlists
          </div>
        </div>
      )}
      {isLoading && <Spinner />}
    </>
  );
};

export default ChannelPlaylists;
