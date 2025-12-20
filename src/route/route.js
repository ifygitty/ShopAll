import { createBrowserRouter } from "react-router-dom";
import Product from "../page/product/ProductDetails";

import Root from "../page/Root";
import Home from "../page/home/Home";


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "product/:id",
        Component: Product,
      },
    ],
  },
]);

export default router;
