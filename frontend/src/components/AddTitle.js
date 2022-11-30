import { useContext, useState } from "react";
import { TodoContext } from "../todoContext";
import axios from "axios";

const AddTitle = () => {
  const { openTitleModel, setOpenTitleModel, setTitleData } =
    useContext(TodoContext);
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");

  const handleCancel = () => {
    setOpenTitleModel(false);
  };

  const handleAddTodo = async () => {
    try {
      let creatTodo = await axios.post("/createTitle", { title, task });
      console.log("data::", creatTodo.data);

      let titleData = await axios.get("/getAlltitle");
      setTitleData(titleData.data.title);
      setOpenTitleModel(false);
    } catch (error) {
      console.log("handleAddTodo Error::", error.message);
    }
  };

  return (
    <div className="absolute p-[10px] bg-modelGray z-40 rounded-[10px] border-darkTheme top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] shadow-xl flex flex-col gap-y-[20px] w-[300px]">
      <input
        placeholder="Enter Your Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-[5PX] border-[2px] rounded-[10px] outline-none focus:border-darkTheme"
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
          ADD TODO
        </button>
      </div>
    </div>
  );
};

export default AddTitle;
