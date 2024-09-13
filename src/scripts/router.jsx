import { createBrowserRouter } from "react-router-dom";
import Drawer from "../components/drawer";
import AutoMatchDebug from "../components/views/autoMatchDebug";

const menu = [

  { title: "Configuration Management", link: "/configurationmanagement" },

];
const configManagementTabs = [

  { title: "Swagalicious", link: "/configurationmanagement/automatchdebug" },

];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Drawer tabList={menu} />,
    children: []
  },

  {

    path: "/configurationmanagement",
    element: <Drawer tabList={menu} />,
    children: [
      {
        path: "",
        element: <Drawer tabList={configManagementTabs} />,
        children: [

          {
            path: "automatchdebug",
            element: <AutoMatchDebug />,
          },

        ],
      },
    ],

}
  ]);

