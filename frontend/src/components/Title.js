import { useState, useEffect, useContext } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { TodoContext } from "../todoContext";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Title = () => {
  const [searchInput, setSearchInput] = useState("");
  const {
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
  } = useContext(TodoContext);

  const openModel = () => {
    setIsTaskModel(false);
    setOpenTitleModel(true);
  };

  const fetchTitleData = async () => {
    try {
      let titleData = await axios.get("/title/getAlltitle", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("todoToken"),
        },
      });
      setTitleData(titleData.data.title);
    } catch (error) {
      console.log("fetchTitleData Error::", error.message);
    }
  };

  const fetchTitleFromSearch = async () => {
    try {
      let fetchData = await axios.get(
        `/title/searchTitle?search=${searchInput}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("todoToken"),
          },
        }
      );
      setTitleData(fetchData.data.task);
    } catch (error) {
      console.log("fetchTitleFromSearch Error::", error.message);
    }
  };

  useEffect(() => {
    if (searchInput.length <= 0) {
      fetchTitleData();
      return;
    }
    fetchTitleFromSearch();
  }, [searchInput]);

  const handleEdit = (_id, title) => {
    setOpenEditModel(true);
    setEditDetail(title);
    setTodoId(_id);
  };

  const handleRemove = (_id) => {
    setOpenDeleteModel(true);
    setTodoId(_id);
  };

  return (
    <div
      className={`mx-[3%] my-[2%] flex flex-col gap-y-[20px] ${
        openTitleModel || openEditModel || openDeleteModel
          ? "opacity-[0.2] pointer-events-none"
          : ""
      }`}
    >
      <div className="flex justify-center">
        <input
          placeholder="Search title here..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="p-[10px] border-[2px] rounded-[10px] outline-none focus:border-darkTheme w-[60%]"
        />
      </div>

      <div className="flex flex-wrap gap-y-[15px] gap-x-[15px] justify-center">
        {titleData &&
          titleData.map((title) => (
            <div
              key={title._id}
              className="shadow-lg w-[270px] px-[10px] py-[15px] flex gap-x-[10px] items-center"
            >
              <NavLink
                to={`/task/${title._id}`}
                className="font-Montserrat font-medium h-auto w-[200px]"
              >
                {title.title}
              </NavLink>
              <div className="flex gap-x-[10px]">
                <FiEdit
                  size={"25px"}
                  color={"#4169E1"}
                  className="cursor-pointer"
                  onClick={() => {
                    handleEdit(title._id, title.title);
                  }}
                />
                <AiOutlineDelete
                  size={"25px"}
                  color={"#E21717"}
                  className="cursor-pointer"
                  onClick={() => {
                    handleRemove(title._id);
                  }}
                />
              </div>
            </div>
          ))}
      </div>
      <div
        onClick={openModel}
        className="w-[50px] h-[50px] cursor-pointer fixed right-[4%] bottom-[6%] bg-darkTheme rounded-[50%] flex justify-center items-center"
      >
        <AiOutlinePlus size={"27px"} color={"#ffffff"} />
      </div>
    </div>
  );
};

export default Title;
