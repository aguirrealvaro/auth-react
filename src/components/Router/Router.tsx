import { FunctionComponent } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "..";
import { Home, Login, Register } from "@/containers";
import { useSession } from "@/contexts";

export const Router: FunctionComponent = () => {
  const { isAuth } = useSession();

  console.log({ isAuth });

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
