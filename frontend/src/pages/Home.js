import { useContext } from "react";
import AddTitle from "../components/AddTitle";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import { TodoContext } from "../todoContext";

const Home = () => {
  const { openTitleModel, setOpenTitleModel } = useContext(TodoContext);
  return (
    <div>
      <Navbar />
      <Title />
      {openTitleModel ? <AddTitle /> : ""}
    </div>
  );
};

export default Home;
