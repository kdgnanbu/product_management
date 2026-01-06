<script setup>
import { ref } from 'vue'
import { useStorage } from '@/composable/storage'
import { useDeleteItem } from '@/composable/useCrud'

const { load, save } = useStorage()
const { deleteItem } = useDeleteItem()

const category = ref(load('category') || [])
const categoryName = ref('')
const errorMessage = ref('')

const showForm = ref(false)
const isAddMode = ref(true)
const editTarget = ref('')

// 追加フォーム表示
const openAddForm = () => {
    categoryName.value = ''
    errorMessage.value = ''
    isAddMode.value = true
    showForm.value = true
}

// 編集フォーム表示
const openEditForm = (cat) => {
    categoryName.value = cat
    editTarget.value = cat
    errorMessage.value = ''
    isAddMode.value = false
    showForm.value = true
}

// 保存（新規）
const saveCategory = () => {
    errorMessage.value = ''

    if (!categoryName.value) {
        errorMessage.value = '※カテゴリー名を入力してください'
        return
    }

    if (category.value.includes(categoryName.value)) {
        errorMessage.value = '※このカテゴリー名は既に存在します'
        return
    }

    category.value.push(categoryName.value)
    save('category', category.value)
    showForm.value = false
}

// 更新（編集）
const updateCategory = () => {
    errorMessage.value = ''

    if (!categoryName.value) {
        errorMessage.value = '※カテゴリー名を入力してください'
        return
    }

    if (
        category.value.includes(categoryName.value) &&
        categoryName.value !== editTarget.value
    ) {
        errorMessage.value = '※このカテゴリー名は既に存在します'
        return
    }

    const index = category.value.indexOf(editTarget.value)
    category.value.splice(index, 1, categoryName.value)
    save('category', category.value)
    showForm.value = false
}

// 削除
const handleDeleteCategory = (cat) => {
    deleteItem(
        category,
        cat,
        c => `「${c}」を削除しますか？`,
        list => save('category', list)
    )
}
</script>

<template>
    <div class="add-area">
        <!-- タイトル -->
        <div class="title">
            <span>カテゴリー管理</span>
            <button @click="openAddForm"><i class="fa-solid fa-plus"></i>追加する</button>
        </div>

        <!-- ポップアップ -->
        <div class="form-popup" v-if="showForm">
            <div class="form-content">
                <h2>{{ isAddMode ? 'カテゴリー追加' : 'カテゴリー編集' }}</h2>

                <div class="form-item">
                    <label>カテゴリー名</label>
                    <input type="text" v-model="categoryName" />
                </div>

                <button class="submit-btn" v-if="isAddMode" @click="saveCategory">
                    登録
                </button>

                <button class="submit-btn green" v-else @click="updateCategory">
                    変更
                </button>

                <button class="close-btn" @click="showForm = false">
                    キャンセル
                </button>

                <p v-if="errorMessage" class="error-msg">
                    {{ errorMessage }}
                </p>
            </div>
        </div>

        <!-- 一覧 -->

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
                        <button class="edit-btn" @click="openEditForm(cat)"><i
                                class="fa-regular fa-pen-to-square"></i></button>
                        <button class="delete-btn" @click="handleDeleteCategory(cat)"><i
                                class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
/* ===== タイトル ===== */
.title {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    font-size: 22px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title button {
    height: 34px;
    padding: 0 18px;
    border-radius: 17px;
    border: none;
    background-color: rgb(17, 137, 141);
    color: #fff;
    font-size: 13px;
    cursor: pointer;
}

/* ===== ポップアップ ===== */
.form-popup {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.form-content {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    width: 360px;
}

.form-content h2 {
    margin: 0 0 20px;
    text-align: center;
}

/* ===== フォーム ===== */
.form-item {
    margin-bottom: 18px;
}

.form-item label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
}

.form-item input {
    width: 100%;
    height: 38px;
    padding: 0 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
}

/* ===== ボタン ===== */
.submit-btn {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    border: none;
    background-color: rgb(17, 137, 141);
    color: #fff;
    cursor: pointer;
    margin-bottom: 10px;
}

.submit-btn.green {
    background-color: rgb(68, 160, 80);
}

.close-btn {
    width: 50%;
    height: 40px;
    display: block;
    /* ブロックにして margin auto が効くように */
    margin: 0 auto;
    background: none;
    border: none;
    font-size: 13px;
    cursor: pointer;
    background-color: #bbbbbb;
    border-radius: 20px;
    color: white;
}

/* ===== エラー ===== */
.error-msg {
    margin-top: 10px;
    color: #ff4d4f;
    background-color: #fff1f0;
    border: 1px solid #ffa39e;
    padding: 8px;
    border-radius: 6px;
    font-size: 13px;
}

table {
    width: calc(100% - 40px);
    margin: 20px;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 6px;
    overflow: hidden;
}

th {
    background-color: rgb(210, 242, 244);
    padding: 10px;
    text-align: left;
}


td {
    padding: 10px;
    border-top: 1px solid #eee;
}

th:first-child,
td:first-child {
    width: 50px;
    text-align: center;
}

th:last-child,
td:last-child {
    width: 120px;
    text-align: center;
}

/* テーブル偶数行の背景色 */
tbody tr:nth-child(even) {
    background-color: #f0f0f0;
    /* 薄いグレーなど見やすい色 */
}

thead tr {
    background-color: rgb(17, 137, 141);
}

thead th {
    background-color: transparent;
    color: white;
    /* 見やすくするため */
}


.edit-btn {
    background-color: #22c55e;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    margin-right: 6px;
    cursor: pointer;
    color: white;
}

.delete-btn {
    background-color: #f44336;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
}
</style>
