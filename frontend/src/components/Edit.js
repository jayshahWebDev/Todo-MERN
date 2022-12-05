import { useContext } from "react";
import { TodoContext } from "../todoContext";
import axios from "axios";

const Edit = ({ value }) => {
  const {
    editDetail,
    setEditDetail,
    openEditModel,
    setOpenEditModel,
    todoId,
    setTodoId,
    setTitleData,
    taskIndex,
    setTaskIndex,
    setTaskData,
  } = useContext(TodoContext);

  const handleCancel = () => {
    setOpenEditModel(false);
  };

  const handleUpdate = async () => {
    try {
      if (value == "Title") {
        let updateData = await axios.put(
          `/title/updatetitle/${todoId}`,
          {
            title: editDetail,
          },
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
      } else {
        let updateTask = await axios.put(
          `/task/addUpdateTask/${todoId}`,
          {
            task: editDetail,
            index: taskIndex,
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
      console.log("handleUpdate Error::", error.message);
    } finally {
      setOpenEditModel(false);
    }
  };

  return (
    <div className="absolute p-[10px] bg-modelGray z-40 rounded-[10px] border-darkTheme top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] shadow-xl flex flex-col gap-y-[20px] w-[300px]">
      <input
        placeholder={`Enter Your ${value}`}
        value={editDetail}
        onChange={(e) => setEditDetail(e.target.value)}
        className="p-[5PX] border-[2px] rounded-[10px] outline-none focus:border-darkTheme font-Montserrat font-medium"
      />

      <div className="flex justify-around font-Montserrat font-medium">
        <button
          onClick={handleCancel}
          className="border-[1px] px-[10px] py-[4px] border-darkTheme"
        >
          CANCEL
        </button>
        <button
          onClick={handleUpdate}
          className="bg-darkTheme px-[10px] py-[4px] text-white uppercase"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default Edit;
