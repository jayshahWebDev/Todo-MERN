import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { TodoContext } from "../todoContext";

const Task = () => {
  const { _id } = useParams();
  const {
    taskData,
    setTaskData,
    isTaskModel,
    setIsTaskModel,
    openTitleModel,
    setOpenTitleModel,
    todoId,
    setTodoId,
    editDetail,
    setEditDetail,
    taskIndex,
    setTaskIndex,
    openEditModel,
    setOpenEditModel,
    openDeleteModel,
    setOpenDeleteModel,
  } = useContext(TodoContext);

  const fetchTaskData = async () => {
    try {
      let taskDetails = await axios.get(`/task/getAllTask/${_id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("todoToken"),
        },
      });
      setTaskData(taskDetails.data.task);
      setTodoId(_id);
    } catch (error) {
      console.log("fetchTaskData Error::", error.message);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  const handleAddTask = () => {
    setIsTaskModel(true);
    setOpenTitleModel(true);
  };

  const handleEdit = (index, task) => {
    setEditDetail(task);
    setTaskIndex(index);
    setOpenEditModel(true);
  };

  const handleRemove = (index) => {
    setTaskIndex(index);
    setOpenDeleteModel(true);
  };

  return (
    <div
      className={`flex flex-col gap-y-[15px] justify-center items-center mt-[2%] mb-[2%] ${
        openTitleModel || openEditModel || openDeleteModel
          ? "opacity-[0.2]"
          : ""
      }`}
    >
      {taskData &&
        taskData.map((task, index) => (
          <div
            key={index}
            className="shadow-lg px-[10px] py-[15px] flex justify-between  gap-x-[10px] items-center w-[70%]"
          >
            <p className="font-Montserrat font-medium h-auto w-[80%]">{task}</p>
            <div className="flex gap-x-[10px]">
              <FiEdit
                size={"25px"}
                color={"#4169E1"}
                className="cursor-pointer"
                onClick={() => {
                  handleEdit(index, task);
                }}
              />
              <AiOutlineDelete
                size={"25px"}
                color={"#E21717"}
                className="cursor-pointer"
                onClick={() => {
                  handleRemove(index);
                }}
              />
            </div>
          </div>
        ))}

      <div
        onClick={handleAddTask}
        className="w-[50px] h-[50px] cursor-pointer fixed right-[4%] bottom-[6%] bg-darkTheme rounded-[50%] flex justify-center items-center"
      >
        <AiOutlinePlus size={"27px"} color={"#ffffff"} />
      </div>
    </div>
  );
};

export default Task;
