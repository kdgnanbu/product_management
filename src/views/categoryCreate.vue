<script setup>
import { ref } from 'vue'
import {  useRoute } from 'vue-router'
import { useStorage } from '@/composable/storage';
import { useShowItem,useEditState,useDeleteItem } from '@/composable/useCrud';

const { load, save } = useStorage();
const {isEdit,editId} = useEditState();
const { deleteItem } = useDeleteItem();

// const router = useRouter();
const route = useRoute();
const categoryName = ref('');
const errorMessage = ref("");
const category = ref(load('category'));

const saveCategory = () => {
    errorMessage.value = "";
    if (categoryName.value === "") {
        errorMessage.value = "※カテゴリー名を入力してください";
    }
    const findCategory = category.value.find((x) => x === categoryName.value);
    if (findCategory) {
        errorMessage.value = "※このカテゴリー名は既に存在します";
        categoryName.value = "";
    }
    if(errorMessage.value){
        return;
    }
    category.value.push(categoryName.value);
    save('category',category.value)
    alert('保存しました！');
    categoryName.value = "";
};
// 追加処理

const handleDeleteCategory = (cat) => {
  deleteItem(
    category,
    cat,
    c => `「${c}」を削除しますか`,
    list => save('category', list)
  );
};
// 削除処理

const editState = { isEdit, editId };
const { showItem: showCategory } = useShowItem(
  category,
  { categoryName},
  editState
);
// 表示処理

const editCategory = () => {
        errorMessage.value = "";
        const newName = categoryName.value;
        const duplicate = category.value.some(
        (cat) => cat === newName && cat !== editId.value
    );
        if (duplicate) {
        errorMessage.value += "※このカテゴリーは利用されています。\n";
    }
    if(errorMessage.value){
        return;
    }
    let findCategory = category.value.find((x) => x === editId.value);
    const idx = category.value.findIndex((x) => x === editId.value);
    if (findCategory) {
        findCategory = categoryName.value;
        category.value.splice(idx, 1, findCategory);
        save('category',category.value)
        categoryName.value = "";
        isEdit.value = true;
    }
}
// 編集処理
</script>

<template>
    <div class="add-area">
<button class="back-btn"
  @click="$router.push({ path: '/login-complete', query: { id: route.query.id } })">
  ← 戻る
</button>
        <h1>カテゴリー追加画面</h1>
        <div class="form-item">
            <label>カテゴリー名：</label>
            <input type="text" v-model="categoryName" />
        </div>
        <button class="submit-btn" @click="saveCategory" v-if="isEdit">
            新規登録
        </button>
        <button class="submit-btn green" @click="editCategory" v-else>
            変更
        </button>
         <p v-if="errorMessage" class="error-msg" style="white-space: pre-line;">{{ errorMessage }}</p>
        <h1>カテゴリー一覧</h1>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>カテゴリー名</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cat, index) in category" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ cat }}</td>
                    <td>
                        <button class="edit-btn" @click="showCategory(cat)">編集</button>
                        <button class="delete-btn" @click="handleDeleteCategory(cat)">削除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
