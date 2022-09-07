import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { Home, Login, NotFound, Register } from "@/containers";

export const Router: FunctionComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
