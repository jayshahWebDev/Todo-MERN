import { useContext } from "react";
import AddTitle from "../components/AddTitle";
import Delete from "../components/Delete";
import Edit from "../components/Edit";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import { TodoContext } from "../todoContext";

const Home = () => {
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
      <Title />
      {openTitleModel ? <AddTitle /> : ""}
      {openEditModel ? <Edit value={"Title"} /> : ""}
      {openDeleteModel ? <Delete value={"Title"} /> : ""}
    </div>
  );
};

export default Home;
