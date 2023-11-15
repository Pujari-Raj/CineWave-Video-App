import React, { useContext } from "react";
import { channelContext } from "../utilities/context";

const AboutChannel = () => {
  const dataSet = useContext(channelContext);
  console.log("channel-desc->", dataSet?.chDescription);
  const chDescription = dataSet?.chDescription;
  const chViews = parseInt(dataSet?.chViews)?.toLocaleString("en-US");
  const chDate = new Date(dataSet?.chDate)?.toDateString().slice(4);

  return (
    <>
      <div className="chAboutContainer">
        <div className="chDescSection">
          <div className="chDescTitle">Description</div>
          <div>
            <pre className="chDescInfo">
              {chDescription
                ? chDescription
                : "This channel has no Description"}
            </pre>
          </div>
        </div>
        <div className="chViewsSection">
          <div className="chViewsTitle">Stats</div>
          <div>{"Joined " + chDate}</div>
          <div>{chViews + " views"}</div>
        </div>
      </div>
    </>
  );
};

export default AboutChannel;
