import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserSearch from "./pages/UserSearch";
import Liked from "./pages/Liked";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

const container = document.getElementById("root");
const root = createRoot(container);
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Dashboard />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route element={<ProtectedRoute />}>
                <Route path="liked" element={<Liked />} />
                <Route path="usersearch" element={<UserSearch />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
