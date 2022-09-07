import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "..";
import { Home, Login, NotFound, Register } from "@/containers";

export const Router: FunctionComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
