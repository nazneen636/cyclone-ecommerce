import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/Homepage";
import Category from "./HomeComponent/Category";
import CreateBanner from "./HomeComponent/banner/CreateBanner";
import AllBanner from "./HomeComponent/banner/AllBanner";
import Registration from "./auth/registration";
import Login from "./auth/login";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route
            path="/create-banner"
            element={
              <ProtectedRoute>
                <CreateBanner />
              </ProtectedRoute>
            }
          />
          <Route path="/all-banner" element={<AllBanner />} />
          {/* <Route path="/category" element={<Category />} /> */}
        </Route>
        <Route>
          <Route path="/sigh-up" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
