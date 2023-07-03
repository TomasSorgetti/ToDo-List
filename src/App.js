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
    <div>
      <h1>Todo List App</h1>
      <p>Created by Tomás Sorgetti</p>
      <div>
        <input
          type="text"
          placeholder="Create new web page"
          value={input}
          onChange={changeInput}
        />
        <button onClick={addItem}>Add ToDo</button>
      </div>
      <div>
        {list.length > 0 && (
          <div>
            {list.map(({ id, value }, i) => (
              <div key={id}>
                <div>
                  <p>{i + 1}</p>
                  <p>{value}</p>
                </div>
                <button onClick={() => markAsDone(id)}>
                  <MdOutlineDone />
                </button>
                <button onClick={() => deleteItem(id)}>
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>
        )}
        {done.length > 0 && (
          <div>
            {done.map(({id, value }) => (
              <p key={id}>{value}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
