import { ref } from 'vue';

export function useEditState() {
  const isEdit = ref(true);
  const editId = ref(null);
  return { isEdit, editId };
}

export function useShowItem(listRef, formRefs, editState) {
  const { isEdit, editId } = editState;
  const showItem = (id) => {
    const item = listRef.value.find(x => x.id === id || x === id);
    if (!item) return;
    for (const key in formRefs) {
      formRefs[key].value = item[key] ?? item;
    }
    isEdit.value = false;
    editId.value = id;
  };
  return { showItem };
}

export function useEditItem(saveFn) {
  const applyEdit = (list, editId, updatedFields) => {
    const idx = list.value.findIndex(item => item.id === editId.value);
    if (idx === -1) return false;
    const updated = { ...list.value[idx], ...updatedFields };
    list.value.splice(idx, 1, updated);
    saveFn(list.value);
    return true;
  };
  return { applyEdit };
}

export function useDeleteItem() {
  const deleteItem = (list, item, displayFn, saveFn) => {
    const findItem = list.value.find(x => x === item || x.id === item);
    const idx = list.value.findIndex(x => x === item || x.id === item);
    if (!findItem) return;
    const delMsg = displayFn(findItem);
    if (!confirm(delMsg)) return;
    list.value.splice(idx, 1);
    if (saveFn) saveFn(list.value);
  };
  return { deleteItem };
}

