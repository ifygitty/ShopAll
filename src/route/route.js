import { createBrowserRouter as Router } from "react-router-dom";

import Home from "../page/home/Home";
import Root from "../page/Root";


const router = Router([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            // {
            //     path: "about",
            //     Component: AboutUsRoute
            // },
            // {
            //     path: "shop",
            //     Component: ShopRoute
            // },
            // {
            //     path: "blog",
            //     Component: BlogPage
            // },
            // {
            //     path: "/product-detail/:id",
            //     Component: ProductDetailRoute
            // },
            // {
            //     path: "cart",
            //     Component: CartRoute,
            //     children: [
            //         {
            //           index: true, 
            //           Component: ShoppingCart,
            //         },
            //         {
            //           path: "checkout", 
            //           Component: CheckoutDetails,
            //         },
            //         {
            //           path: "order", 
            //           Component: Order,
            //         },
            //     ],
            // }
        ]
    }
]);

export default router;