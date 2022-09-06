import { FunctionComponent } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "..";
import { Home, Login, Register } from "@/containers";

export const Router: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
