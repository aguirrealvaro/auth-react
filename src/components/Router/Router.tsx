import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "@/containers";

export const Router: FunctionComponent = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<PrivateRoute component={Home} />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
