import React from "react";

import { INDEX_SLUG } from "../../common/constants";
import { Navigate, Route, Routes } from "react-router-dom";

import LoggedUserScreen from "./screens/LoggedUserScreen";
import TicketListScreen from "./screens/TicketListScreen";
import { FEATURE_ROUTES } from "./constants";

export const AuthenticationFeature: React.FC = () => {
  return (
    <Routes>
      <Route
        path={FEATURE_ROUTES.LOGGED_USER_SCREEN}
        element={<LoggedUserScreen />}
      />
      <Route path={FEATURE_ROUTES.TICKET_LIST} element={<TicketListScreen />} />
      <Route path="*" element={<Navigate to={INDEX_SLUG} />} />
    </Routes>
  );
};
