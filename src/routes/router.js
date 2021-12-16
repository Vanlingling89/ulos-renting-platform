import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "../resources/common/404.common";
import AuthPage, { AUTH_TYPE } from "../resources/views/auth_page/auth.page";
import BrowsePage from "../resources/views/browse_page/browse.page";
import FormSelectorPage from "../resources/views/form_page/form_selector.page";
import HomePage from "../resources/views/home_page/home.page";
import Layout from "../resources/views/layout";
import RequestPage from "../resources/views/request_page/request.page";
import UserItemPage from "../resources/views/user_items_page/user_item.page";

const MainRouter = () => {
  return (
    <React.Fragment>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route
              path="/signup"
              element={<AuthPage type={AUTH_TYPE.register} />}
            />
            <Route
              path="/login"
              element={<AuthPage type={AUTH_TYPE.login} />}
            />

            <Route index element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/my-lists" element={<UserItemPage />} />
            <Route path="/form/:type" element={<FormSelectorPage />} />

            <Route
              path="/signup"
              element={<AuthPage type={AUTH_TYPE.register} />}
            />
            <Route
              path="/login"
              element={<AuthPage type={AUTH_TYPE.login} />}
            />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </React.Fragment>
  );
};

export default MainRouter;
