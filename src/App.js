import React, { useState } from "react";
import { MdDelete, MdOutlineDone } from "react-icons/md";

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [done, setDone] = useState([]);
  const [error, seterror] = useState("")
  const changeInput = (e) => {
    setInput(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    seterror("")
    if (input.length > 28) {
      seterror("too many letters");
      setInput("");
      return
    }
    if (input.trim()) {
      const newItem = {
        id: Math.floor(Math.random() * 10000),
        value: input.trim(),
      };
      setList((prevList) => [...prevList, newItem]);
      setInput("");
    }
  };

  const markAsDone = (id) => {
    const selectedItem = list.find((item) => item.id === id);
    if (selectedItem) {
      setList((prevList) => prevList.filter((item) => item.id !== id));
      setDone((prevDone) => [...prevDone, selectedItem]);
    }
  };

  const deleteItem = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-800 flex items-center justify-center h-screen ">
      <div className="rounded bg-gray-700 flex flex-col items-center justify-center gap-10 text-white p-10 w-11/12 max-w-md lg:max-w-xl lg:p-16">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl">Todo List App</h1>
          <p className="text-gray-400 italic">Created by Tomás Sorgetti</p>
          {error && <span className="text-red-600">{error}</span>}
        </div>
        <div className="flex gap-2 justify-center w-full">
          <input
            className="rounded px-3 text-black w-full lg:text-2xl"
            type="text"
            placeholder="Add new ToDo..."
            value={input}
            onChange={changeInput}
          />
          <button
            className="bg-gray-500 
        py-2 rounded w-40 lg:py-4 hover:bg-gray-600 hover:shadow-xl hover:font-bold"
            onClick={addItem}
          >
            Add ToDo
          </button>
        </div>
        <div className=" w-full flex flex-col gap-2">
          {list.length > 0 && (
            <div className="flex flex-col gap-2 w-full">
              {list.map(({ id, value }) => (
                <div
                  key={id}
                  className="flex justify-between  px-4 p-3 bg-gray-600 rounded lg:py-4 lg:text-2xl lg:px-6"
                >
                  <div className="flex gap-2">
                    <p>{value}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => markAsDone(id)}>
                      <MdOutlineDone
                        size="1.4rem"
                        className="hover:scale-125"
                      />
                    </button>
                    <button onClick={() => deleteItem(id)}>
                      <MdDelete size="1.4rem" className="hover:scale-125" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div>
            {done.length > 0 && (
              <div className="flex flex-col gap-2 w-full">
                {done.map(({ id, value }) => (
                  <p
                    className="line-through text-gray-400 px-4 p-3 bg-gray-600 w-full rounded lg:text-2xl lg:px-6"
                    key={id}
                  >
                    {value}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
