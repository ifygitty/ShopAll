import { createBrowserRouter } from "react-router-dom";
import Product from "../page/product/ProductDetails";

import Root from "../page/Root";
import Home from "../page/home/Home";
import AuthModal from "@/component/auth/AuthModal";
import Category from "@/page/category/Category";


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
      {
        path: "login",
        Component: AuthModal,
      },
      {
        path: "category/:title",
        Component: Category,
      },
    ],
  },
]);

export default router;
