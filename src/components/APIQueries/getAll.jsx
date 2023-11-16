export default async function getTodos() {
  const response = await fetch("http://localhost:8080/todos", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

  const data = await response.json();
  setTodos(data);
}
