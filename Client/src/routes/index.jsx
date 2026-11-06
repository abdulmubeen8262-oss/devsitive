//yeh line comment hai import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";


// Layouts
//yeh line comment hai import UserLayout from "../layout/user.layout";


// Pages
//yeh line comment hai import HomePage from "../pages/home.page";
//yeh line comment hai import AboutPage from "../pages/about.page";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";

// yeh line comment hai const Router = () => {


    
   //yeh line comment hai const router = createBrowserRouter([
        // User Routes
      //yeh line comment hai  {
     //yeh line comment hai       element: <UserLayout />,
     //yeh line comment hai       path: "",
     //yeh line comment hai       children: [
    //yeh line comment hai            { path: "", element: <HomePage /> },
     //yeh line comment hai           { path: "/about", element: <AboutPage />},
                  
     //yeh line comment hai       ],

      //yeh line comment hai  },
        //Admin Routes
        //  {
        //     element: <AdminLayout />,
        //     path: "/admin",
        //     children: [
        //         { path: "/dashboard", element: <HomePage /> },
        //         { path: "/about", element: <AboutPage />},

        //     ],

        // },
        // {
        //     path: "/login",
        //     element: <Login />,
        // },
        // {
        //     path: "*",
        //     element: <NotFound />,
        // },


  //yeh line comment hai  ]);

 //yeh line comment hai   return <RouterProvider router={router} />;
// yeh line comment hai };







function Router() {
    return(
        <BrowserRouter>
        <Navbar/>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>

        </BrowserRouter>
    )
}

export default Router;