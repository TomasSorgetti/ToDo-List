import React, { useState } from "react";
import { MdDelete, MdOutlineDone } from "react-icons/md";

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [done, setDone] = useState([]);

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
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
      <div className=" bg-gray-700 flex flex-col items-center justify-center gap-10 text-white p-10">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-6xl">Todo List App</h1>
          <p className="text-gray-300">Created by Tomás Sorgetti</p>
        </div>
        <div className="flex gap-6">
          <input
            className="rounded-xl px-3 text-black"
            type="text"
            placeholder="Add new ToDo..."
            value={input}
            onChange={changeInput}
          />
          <button
            className="bg-gray-500 
        p-2 px-3 rounded-xl"
            onClick={addItem}
          >
            Add ToDo
          </button>
        </div>
        <div className=" w-full">
          {list.length > 0 && (
            <div className="flex flex-col gap-2 w-full">
              {list.map(({ id, value }, i) => (
                <div key={id} className="flex justify-between  px-4 p-3 bg-gray-600 ">
                  <div className="flex">
                    <p>{i + 1}</p>
                    <p>{value}</p>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => markAsDone(id)}>
                      <MdOutlineDone />
                    </button>
                    <button onClick={() => deleteItem(id)}>
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {done.length > 0 && (
            <div>
              {done.map(({ id, value }) => (
                <p key={id}>{value}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
