// storage.js
export function useStorage() {

  // 指定したキーから読み込み
  const load = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  // 指定したキーに保存
  const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return { load, save };
}
