export default async function getTodos(setTodos) {
  try {
    const resp = await fetch("http://localhost:8080/todos", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (!resp.ok) throw new Error("Failed to fetch todos");

    const data = await resp.json();

    if (resp.ok && data.length !== 0) {
      setTodos(data);
    }
  } catch (err) {
    console.error(err);
  }
}
