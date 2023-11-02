export default function TodoItem({
  id,
  done,
  priority,
  name,
  toggleTodo,
  deleteTodo,
}) {
  // TODO: CONVERT DONE AND PRIORITY TO TRUE OR FALSE
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => {
            toggleTodo(id, e.target.checked);
          }}
        />
        {name}
      </label>
      {/* TODO: Change it to empty or full star SVG */}
      {priority ? <p>❗️</p> : null}
      <button onClick={(e) => deleteTodo(id)} className="btn btn-danger">
        Delete
      </button>
    </li>
  );
}
