import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute, Layout } from "..";
import { Home, Login, NotFound, Register } from "@/containers";

export const Router: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
