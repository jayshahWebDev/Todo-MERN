import { useContext, useState } from "react";
import { TodoContext } from "../todoContext";
import axios from "axios";

const AddTitle = () => {
  const {
    openTitleModel,
    setOpenTitleModel,
    setTitleData,
    isTaskModel,
    setIsTaskModel,
    setTodoId,
    todoId,
    setTaskData,
  } = useContext(TodoContext);
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");

  const handleCancel = () => {
    setOpenTitleModel(false);
  };

  const handleAddTodo = async () => {
    try {
      if (isTaskModel) {
        let createTask = await axios.put(
          `/task/addUpdateTask/${todoId}`,
          {
            task,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("todoToken"),
            },
          }
        );
        let taskDetails = await axios.get(`/task/getAllTask/${todoId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("todoToken"),
          },
        });
        setTaskData(taskDetails.data.task);
      } else {
        let creatTodo = await axios.post(
          "/title/createTitle",
          { title, task },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("todoToken"),
            },
          }
        );

        let titleData = await axios.get("/title/getAlltitle", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("todoToken"),
          },
        });
        setTitleData(titleData.data.title);
      }
    } catch (error) {
      console.log("handleAddTodo Error::", error.message);
    } finally {
      setOpenTitleModel(false);
    }
  };

  return (
    <div className="absolute p-[10px] z-10 bg-modelGray rounded-[10px] border-darkTheme top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] shadow-xl flex flex-col gap-y-[20px] w-[300px]">
      <input
        placeholder="Enter Your Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`p-[5PX] border-[2px] rounded-[10px] outline-none focus:border-darkTheme ${
          isTaskModel ? "hidden" : "block"
        }`}
      />
      <input
        placeholder="Enter Your Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="p-[5PX] border-[2px] rounded-[10px] outline-none focus:border-darkTheme"
      />
      <div className="flex justify-around font-Montserrat font-medium">
        <button
          onClick={handleCancel}
          className="border-[1px] px-[10px] py-[4px] border-darkTheme"
        >
          CANCEL
        </button>
        <button
          onClick={handleAddTodo}
          className="bg-darkTheme px-[10px] py-[4px] text-white"
        >
          {isTaskModel ? "ADD TASK" : "ADD TODO"}
        </button>
      </div>
    </div>
  );
};

export default AddTitle;
