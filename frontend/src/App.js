import { useState, useEffect } from "react";
import Home from "./pages/Home";
import TaskPage from "./pages/TaskPage";
import { TodoContext } from "./todoContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [openTitleModel, setOpenTitleModel] = useState(false);
  const [titleData, setTitleData] = useState([]);

  useEffect(() => {
    document.body.style.overflow = openTitleModel ? "hidden" : "auto";
  }, [openTitleModel]);

  return (
    <BrowserRouter>
      <TodoContext.Provider
        value={{ openTitleModel, setOpenTitleModel, titleData, setTitleData }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                className={`z-0 ${openTitleModel ? "overflow-hidden" : ""}`}
              />
            }
          />
          <Route path="/task/:_id" element={<TaskPage />} />
        </Routes>
      </TodoContext.Provider>
    </BrowserRouter>
  );
}

export default App;
