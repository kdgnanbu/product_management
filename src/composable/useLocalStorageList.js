import { ref } from 'vue';

export function useLocalStorageList(key) {
  const list = ref([]);

  const load = () => {
    const ls = localStorage[key];
    list.value = ls ? JSON.parse(ls) : [];
  };

  const save = () => {
    localStorage[key] = JSON.stringify(list.value);
  };

  const remove = (id) => {
    const idx = list.value.findIndex(item => item.id === id);
    if (idx !== -1) {
      list.value.splice(idx, 1);
      save();
    }
  };

  load();

  return {
    list,
    load,
    save,
    remove
  };
}
