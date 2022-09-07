import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { Home, Login, Register } from "@/containers";

export const Router: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute component={Home} />} />
    </Routes>
  );
};
