import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeNav, removeBackdrop } from "../utilities/sidebarSlice";
import { addVideo, removeVideo } from "../utilities/librarySlice";
import { calculateViews } from "../utilities/useMathHelpers";
import useFetch from "../utilities/useFetch";
import Spinner from "./Spinner";
import SearchResultCard from "./SearchResultCard";
import SearchResultShimmer from "./SearchResultShimmer";

const ChannelBox = ({ chId }) => {
  const [info, setInfo] = useState();

  useEffect(() => {
    useFetch(`channels?part=snippet%2Cstatistics&id=${chId}`).then((data) => {
      // console.log(data);
      setInfo(data?.items[0]);
    });
  }, [chId]);

  return (
    <div className="channelBox">
      <div className="channelImg">
        <img
          src={info?.snippet?.thumbnails?.medium?.url}
          className="channelThumb"
        />
      </div>
      <div>
        <div className="chBoxTitle">{info?.snippet?.title}</div>
        <div className="channelSubs">
          {info?.snippet?.customUrl +
            " • " +
            calculateViews(info?.statistics?.subscriberCount) +
            " subscribers"}
        </div>
        <div className="videoBoxDesc">
          {(info?.snippet?.description).slice(0, 100) + "..."}
        </div>
      </div>
    </div>
  );
};

const SearchResult = () => {
  const [text] = useSearchParams();
  const keyword = text.get("search_query");
  const [searchData, setSearchData] = useState(null);
  const [pageToken, setPageToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showShimmer, setShowShimmer] = useState(true);

  const navState = useSelector((store) => store.sidebar.navState);
  const backdropState = useSelector((store) => store.sidebar.backdropState);
  const watchlater = useSelector((store) => store.library.watchlater);
  const dispatch = useDispatch();

  const fullScreen = window.matchMedia("(min-width: 1200px)");
  const medScreen = window.matchMedia(
    "(min-width: 900px)and (max-width: 1199px)"
  );
  const smScreen = window.matchMedia("(max-width: 899px)");

  if (fullScreen.matches && backdropState) dispatch(removeBackdrop());

  useEffect(() => {
    if (fullScreen.matches)
      document.getElementById("searchBody").style.marginLeft = navState
        ? "240px"
        : "80px";
  });

  useEffect(() => {
    if (medScreen.matches) {
      dispatch(closeNav());
      document.getElementById("searchBody").style.marginLeft = "80px";
    }
    if (smScreen.matches) {
      document.getElementsByClassName("header")[0].style.position = "sticky";
      document.getElementById("bottomMenu").style.display = "flex";
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      useFetch(
        `search?type=channel&type=video&maxResults=15&q=${keyword}`
      ).then((data) => {
        // console.log(data?.items);
        setSearchData(data?.items);
        setPageToken(data?.nextPageToken);
        setShowShimmer(false);
      });
    }, 5000);
  }, [text]);

  const fetchNextResults = () => {
    useFetch(
      `search?type=video&type=channel&maxResults=15&q=${keyword}&pageToken=${pageToken}`
    ).then((data) => {
      setSearchData((prev) => [...prev, ...data?.items]);
      setPageToken(data?.nextPageToken);
      setIsLoading(false);
    });
  };

  return (
    <>
      <div id="searchBody">
        <div className="searchContainer">
          {showShimmer ? (
            <SearchResultShimmer />
          ) : searchData?.length === 0 ? (
            <div className="centerDiv">No search result found</div>
          ) : (
            searchData?.map((data) => {
              return data?.id?.kind == "youtube#channel" ? (
                <Link
                  className="textNone"
                  key={data?.id?.channelId}
                  to={"/channel/" + data?.id?.channelId}
                >
                  <ChannelBox chId={data?.id?.channelId} />
                </Link>
              ) : (
                <SearchResultCard
                  vdoId={data?.id?.videoId}
                  watchLater={watchlater}
                  dispatch={dispatch}
                  addVideo={addVideo}
                  removeVideo={removeVideo}
                  key={data?.id?.videoId}
                />
              );
            })
          )}
          {!isLoading && pageToken && (
            <div className="loadBtnContainer">
              <div
                onClick={() => {
                  setIsLoading(true);
                  fetchNextResults();
                }}
                className="loadMoreBtn"
              >
                Load more search results
              </div>
            </div>
          )}
          {isLoading && <Spinner />}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
