import "./App.css";
import { useState } from "react";
import firebase, { auth, firestore, functions } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [todos] = useCollectionData(todosRef, { idField: "id" });

  const signOut = () => auth.signOut();

  const onSubmitTodo = (event) => {
    event.preventDefault();
    setTodo("");
    todosRef.add({
      text: todo,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <>
      <header>
        <button onClick={signOut}>Sign Out</button>
      </header>
      <main>
        <form onSubmit={onSubmitTodo}>
          <input
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="What's Next?"
          />
          <button type="submit">Add</button>
        </form>
        {todos && todos.map(() => <Todo {...todo} />)}
      </main>
    </>
  );
};

const Todo = ({ id, complete, text }) => {
  const onCompleteTodo = (id, complete) => {};
  const onDeleteTodo = (id) => {};

  return (
    <div key={id} className="todo">
      <button
        className={`todo-item ${complete ? "complete" : ""}`}
        tabIndex="0"
        onClick={() => onCompleteTodo(id, complete)}
      >
        {text}
      </button>
      <button onClick={() => onDeleteTodo(id)}>x</button>
    </div>
  );
};

export default Todos;
