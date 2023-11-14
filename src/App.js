import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import VideoPage from "./components/VideoPage";
import { Provider } from "react-redux";
import store from "./utilities/store";
import Sidebar from "./components/Sidebar";
import WatchLaterPage from "./components/WatchLaterPage";
import SearchResult from "./components/SearchResult";
import MobileSearchPage from "./components/MobileSearchPage";

const AppLayout = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("themeMode") || "lightTheme"
  );

  useEffect(() => {
    document.body.className = localStorage.getItem("themeMode") || "lightTheme";
  }, [theme]);

  return (
    <>
      <Provider store={store}>
        <Header theme={theme} setTheme={setTheme} />
        <Sidebar theme={theme} />
        <Outlet />
      </Provider>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/watch",
        element: <VideoPage />,
      },
      {
        path:"/watchLater",
        element: <WatchLaterPage/>
      },
      {
        path: "/results",
        element: <SearchResult />,
      },
      {
        path: "/resSearch",
        element: <MobileSearchPage />,
      },
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
