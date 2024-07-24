import App from "./App"
import SignIn from "./SignIn"
import LoginPage from "./LoginPage"
import Admin from "./Admin.js"
import { BrowserRouter, Routes, Route,Redirect } from "react-router-dom"
import Advertiser from "./Advertiser.js"
function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    
                </Route>
                <Route path="/signup" element={<SignIn />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/home" element={<App />} />
                <Route path="/advertiser" element={<Advertiser />} />

                {/* <Route path="/" element={<App/>}/> */}
            </Routes>
        </BrowserRouter>
    )
}

export default Main


// import React from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
// import SignIn from "./SignIn";
// import LoginPage from "./LoginPage";
// import Admin from "./Admin.js";
// import Advertiser from "./Advertiser.js";
// import ProtectedRoute from './Protected.js';

// function Main() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/signup" element={<SignIn />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route
//                     path="/admin"
//                     element={
//                         <ProtectedRoute>
//                             <Admin />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route path="/home" element={<App />} />
//                 <Route path="/advertiser" element={<Advertiser />} />
//                 {/* <Route path="/" element={<App/>}/> */}
//             </Routes>
//         </BrowserRouter>
//     )
// }

// export default Main;
