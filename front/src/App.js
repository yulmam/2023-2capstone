/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Result from "./routes/Result";
import Notice_board from "./routes/Notice_board";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Notice_board" element={<Notice_board />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
