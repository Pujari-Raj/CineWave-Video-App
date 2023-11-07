import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Body from "./components/Body";
import Header from "./components/Header";

const AppLayout = () => {
  return (
    <>
    <h1>demo</h1>
    <Outlet/>
  </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/main",
        element: <Body/>,
      },
      // {
      //   path: "/watch",
      //   element: <VideoPage />,
      // },
      // {
      //   path: "/results",
      //   element: <SearchPage />,
      // },
      // {
      //   path: "/resSearch",
      //   element: <ResSearchPage />,
      // },
      // {
      //   path: "/watchLater",
      //   element: <WatchLaterPage />,
      // },
      // {
      //   path: "/channel/:channelId",
      //   element: (
      //     <Suspense>
      //       <ChannelPage />
      //     </Suspense>
      //   ),
      //   children: [
      //     {
      //       path: "/channel/:channelId/",
      //       element: <ChannelHomePage />,
      //     },
      //     {
      //       path: "/channel/:channelId/playlists",
      //       element: <ChannelPlaylist />,
      //     },
      //     {
      //       path: "/channel/:channelId/playlists/:playlistId",
      //       element: <VideoPlaylist />,
      //     },
      //     { path: "/channel/:channelId/about", element: <ChannelAbout /> },
      //   ],
      // },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
