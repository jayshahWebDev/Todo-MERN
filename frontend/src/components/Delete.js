import axios from "axios";
import { useContext } from "react";
import { TodoContext } from "../todoContext";

const Delete = ({ value }) => {
  const {
    openDeleteModel,
    setOpenDeleteModel,
    todoId,
    setTodoId,
    setTitleData,
    taskIndex,
    setTaskIndex,
    setTaskData,
  } = useContext(TodoContext);

  const handleCancel = () => {
    setOpenDeleteModel(false);
  };

  const handleRemove = async () => {
    try {
      if (value == "Title") {
        let removetitle = await axios.delete(`/title/removeTitle/${todoId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("todoToken"),
          },
        });

        let titleData = await axios.get("/title/getAlltitle", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("todoToken"),
          },
        });
        setTitleData(titleData.data.title);
      } else {
        let removeTask = await axios.delete(
          `/task/removeTask/${todoId}`,
          {
            data: { index: taskIndex },
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
      }
    } catch (error) {
      console.log("handleRemove Error::", error.message);
    } finally {
      setOpenDeleteModel(false);
    }
  };

  return (
    <div className="absolute p-[10px] bg-modelGray z-40 rounded-[10px] border-darkTheme top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] shadow-xl flex flex-col gap-y-[20px] w-[300px]">
      <p className="font-Montserrat font-medium">
        Are you sure you want to delete {value} ?
      </p>

      <div className="flex justify-around font-Montserrat font-medium">
        <button
          onClick={handleCancel}
          className="border-[1px] px-[10px] py-[4px] border-darkTheme"
        >
          CANCEL
        </button>
        <button
          onClick={handleRemove}
          className="bg-darkTheme px-[10px] py-[4px] text-white uppercase"
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default Delete;
