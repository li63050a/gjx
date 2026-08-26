export function getRecent(tools) {
  try {
    const arr = JSON.parse(localStorage.getItem('recent_tools') || '[]');
    return arr.map((h) => tools.find((t) => t.href === h)).filter(Boolean);
  } catch (e) {
    return [];
  }
}

export function addRecent(tool) {
  try {
    let arr = JSON.parse(localStorage.getItem('recent_tools') || '[]');
    arr = arr.filter((h) => h !== tool.href);
    arr.unshift(tool.href);
    arr = arr.slice(0, 8);
    localStorage.setItem('recent_tools', JSON.stringify(arr));
  } catch (e) {}
}
