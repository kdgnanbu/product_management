<script setup>
import { ref } from 'vue';
import { useValidators } from '@/composable/validators';
import { useStorage } from '@/composable/storage';
import { useShowItem,useEditState,useEditItem,useDeleteItem } from '@/composable/useCrud';

const { isFiveDigits, isName } = useValidators();
const { load, save } = useStorage();
const {isEdit,editId} = useEditState();
const { deleteItem } = useDeleteItem();

const name = ref('');
const id = ref('');
const errorMessage = ref('');

const users = ref(load('users'));

const handleDeleteUser = (id) => {
  deleteItem(users,id,user => `「ID:${user.id}/名前:${user.name}」を削除しますか`,list => save('users', list));
};
const editState = { isEdit, editId };
const { showItem: showUser } = useShowItem(users,{ name, id },editState);

const { applyEdit } = useEditItem(list => save('users', list));
const editUser = () => {
  errorMessage.value = "";
  const findUser = users.value.find((x) => x.id === editId.value);
  if (!findUser) return;
  const duplicate = users.value.some(
    (user) => user.id === id.value && user.id !== editId.value
  );
  if(!isName(name.value)) errorMessage.value += "※名前は漢字・ひらがな・カタカナで入力してください。\n";
  if (duplicate) {
    errorMessage.value += "※このユーザーIDは利用されています。\n";
  } else if(!isFiveDigits(id.value)) errorMessage.value += "※ユーザーIDは5桁の半角数字で入力してください。\n";
  if (errorMessage.value) {
    return;
  };
  applyEdit(users, editId, { name: name.value, id: id.value });
  name.value = "";
  id.value = "";
  isEdit.value = true;
};

const searchUser = () => {
    if (!name.value && !id.value) {
    const ls = localStorage.users;
    users.value = ls ? JSON.parse(ls) : [];
    return;
  }
   let filteredUsers = users.value.filter(user => {
    const matchName = name.value ? user.name.includes(name.value) : true;
    const matchId = id.value ? user.id === id.value : true;
    return matchName && matchId;
  });
  users.value = filteredUsers;
};
</script>

<template>
  <div class="add-area">
    <button class="back-btn" @click="$router.push('/new')">
      ← 戻る
    </button>
    <h1>登録されているアカウント
    </h1>

    <div class="form-item">
      <label>名前：</label>
      <input type="text" v-model="name" placeholder="例：山田たろう" />
    </div>
    <div class="form-item">
      <label>ユーザーID：</label>
      <input type="text" v-model="id" placeholder="例：12345" maxlength="5" />
    </div>
    <p v-if="errorMessage" class="error-msg" style="white-space: pre-line;">{{ errorMessage }}</p>
    <button class="submit-btn" @click="searchUser" v-if="isEdit">
      検索
    </button>
    <button class="submit-btn green" @click="editUser" v-else>
      変更
    </button>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>名前</th>
          <th>ID</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.id }}</td>
          <td>
            <button class="edit-btn" @click="showUser(user.id)">編集</button>
            <button class="delete-btn" @click="handleDeleteUser(user.id)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

