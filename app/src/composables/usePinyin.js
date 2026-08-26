export function matchTools(query, tools) {
  if (!query) return tools;
  const q = query.trim().toLowerCase();
  return tools.filter(
    (t) =>
      (t.name && t.name.toLowerCase().includes(q)) ||
      (t.py && t.py.toLowerCase().includes(q))
  );
}
