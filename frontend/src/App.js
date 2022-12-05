import { useState, useEffect } from "react";
import Home from "./pages/Home";
import TaskPage from "./pages/TaskPage";
import { TodoContext } from "./todoContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  const [openTitleModel, setOpenTitleModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [titleData, setTitleData] = useState([]);
  const [editDetail, setEditDetail] = useState("");
  const [todoId, setTodoId] = useState("");
  const [isTaskModel, setIsTaskModel] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [taskIndex, setTaskIndex] = useState("");

  useEffect(() => {
    document.body.style.overflow =
      openTitleModel || openEditModel || openDeleteModel ? "hidden" : "auto";
  }, [openTitleModel, openDeleteModel, openEditModel]);

  return (
    <BrowserRouter>
      <TodoContext.Provider
        value={{
          openTitleModel,
          setOpenTitleModel,
          titleData,
          setTitleData,
          openEditModel,
          setOpenEditModel,
          openDeleteModel,
          setOpenDeleteModel,
          editDetail,
          setEditDetail,
          todoId,
          setTodoId,
          isTaskModel,
          setIsTaskModel,
          taskData,
          setTaskData,
          taskIndex,
          setTaskIndex,
        }}
      >
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route
            path="/title"
            element={
              <Home className={`${openTitleModel ? "overflow-hidden" : ""}`} />
            }
          />
          <Route path="/task/:_id" element={<TaskPage />} />
        </Routes>
      </TodoContext.Provider>
    </BrowserRouter>
  );
}

export default App;
