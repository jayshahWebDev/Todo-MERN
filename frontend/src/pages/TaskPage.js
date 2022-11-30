import { useContext } from "react";
import AddTitle from "../components/AddTitle";
import Delete from "../components/Delete";
import Edit from "../components/Edit";
import Navbar from "../components/Navbar";
import Task from "../components/Task";
import { TodoContext } from "../todoContext";

const TaskPage = () => {
  const {
    openTitleModel,
    setOpenTitleModel,
    openEditModel,
    setOpenEditModel,
    openDeleteModel,
    setOpenDeleteModel,
  } = useContext(TodoContext);

  return (
    <div>
      <Navbar />
      <Task />
      {openTitleModel ? <AddTitle /> : ""}
      {openEditModel ? <Edit value={"Task"} /> : ""}
      {openDeleteModel ? <Delete value={"Task"} /> : ""}
    </div>
  );
};

export default TaskPage;
