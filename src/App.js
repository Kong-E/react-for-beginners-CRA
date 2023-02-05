import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState();
  const [toDos, setToDos] = useState([]);
  const onChange = (e) => setToDo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(toDo);
    setToDo("");
    setToDos((current) => [toDo, ...current]);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={toDo}
          type="text"
          placeholder="Write your todo ..."
          onChange={onChange}
        ></input>
        <button>Add To Do</button>
        <br />
        <ul>
          {toDos.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
