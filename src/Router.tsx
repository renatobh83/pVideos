import { Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { Home } from "./pages/Home";

export function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/video/:slug" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
