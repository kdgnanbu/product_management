<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useValidators } from '@/composable/validators';
import { useStorage } from '@/composable/storage';
import { useShowItem,useEditState,useEditItem,useDeleteItem  } from '@/composable/useCrud'; 

const { isFiveDigits, isNumber} = useValidators();
const { load, save } = useStorage();
const {isEdit,editId} = useEditState()
const { deleteItem } = useDeleteItem();

const router = useRouter();
const route = useRoute();

const name = ref('');
const id = ref('');
const selectedCategory = ref('');
const unitPrice = ref('');
// const minLot = ref('');
// const remarks = ref('');
const errorMessage = ref('');

const category = ref(load('category'));
const product = ref(load('product'));

const showForm = ref(false)
const isAddMode = ref(true)
const editTarget = ref('')

const openAddForm = () => {
    id.value = ''
    errorMessage.value = ''
    isAddMode.value = true
    showForm.value = true
}

// 編集フォーム表示
const openEditForm = (cat) => {
    id.value = cat
    editTarget.value = cat
    errorMessage.value = ''
    isAddMode.value = false
    showForm.value = true
}


const saveProduct = () => {
    errorMessage.value = "";
    if (name.value === "" || id.value === "" || selectedCategory.value === "" || unitPrice.value === "" ) {
        errorMessage.value = "※全ての項目を入力してください。\n";
        return;
    }
    const findId = product.value.find((x) => x.id === id.value);
    if (findId) {
        errorMessage.value += "※この商品IDは利用されています。\n";
    } else if(!isFiveDigits(id.value)) errorMessage.value += "※商品IDは5桁の半角数字で入力してください。\n";
    if(!isNumber(unitPrice.value)) errorMessage.value += "商品単価は半角数字で入力してください。\n";
    // if(!isNumber(minLot.value)) errorMessage.value += "※仕入時最低ロットは半角数字で入力してください。\n";
    if (errorMessage.value) {
        return;
    };
    const productData = {
        name: name.value,
        id: id.value,
        selectedCategory: selectedCategory.value,
        unitPrice: unitPrice.value,
        // minLot: minLot.value,
        // remarks: remarks.value
    };
    product.value.push(productData);
    save('product', product.value);
    alert('保存しました！');
};

const handleDeleteUser = (id) => {
  deleteItem(
    product,
    id,
    findProduct => `「ID:${findProduct.id}/名前:${findProduct.name}」を削除しますか`,
    list => save('product', list)
  );
};

const editState = { isEdit, editId };
const { showItem: showProduct } = useShowItem(
  product,
{ name, id, selectedCategory, unitPrice },
  editState
);

const { applyEdit } = useEditItem(list => save('product', list));
const editProduct = () => {
    errorMessage.value = ""
    const duplicate = product.value.some(
        (product) => product.id === id.value && product.id !== editId.value
    );
    const findProduct = product.value.find((x) => x.id === editId.value);
    const idx = product.value.findIndex((x) => x.id === editId.value);
    if (duplicate) {
        errorMessage.value += "※商品IDは利用されています。\n";
    } else if(!isFiveDigits(id.value)) errorMessage.value += "※商品IDは5桁の半角数字で入力してください。\n";
    if(!isNumber(unitPrice.value)) errorMessage.value += "商品単価は半角数字で入力してください。\n";
    // if(!isNumber(minLot.value)) errorMessage.value += "※仕入時最低ロットは半角数字で入力してください。\n";
    if (errorMessage.value) {
        return;
    };
        applyEdit(product, editId, { name: name.value, id: id.value,selectedCategory:selectedCategory.value,unitPrice:unitPrice.value,minLot:minLot.value,remarks:remarks.value });
        name.value = "";
        id.value = "";
        selectedCategory.value = "";
        unitPrice.value = "";
        // minLot.value = "";
        // remarks.value = "";
        isEdit.value = true;
}
</script>

<!-- <template>
    <div class="add-area">
        <h1>商品情報追加、編集画面</h1>
        <div class="form-item">
            <label>商品ID：</label>
            <input type="text" v-model="id" placeholder="例：00001" maxlength="5" />
        </div>
        <div class="form-item">
            <label>商品名：</label>
            <input type="text" v-model="name" placeholder="例：チョコレート" />
        </div>
        <div class="form-item">
            <label>商品カテゴリー：</label>
            <select v-model="selectedCategory">
                <option value="">選択してください</option>
                <option v-for="(c, index) in category" :key="index" :value="c">
                    {{ c }}
                </option>
            </select>
        </div>
        <div class="form-item">
            <label>単価：</label>
            <input type="text" v-model="unitPrice" placeholder="例：100" />円
        </div>
        <div class="form-item">
            <label>仕入時最低ロット：</label>
            <input type="text" v-model="minLot" placeholder="例：10" />
        </div>
        <div class="form-item">
            <label>備考：</label>
            <textarea v-model="remarks" rows="4" cols="50" placeholder="備考を入力してください"></textarea>
        </div>
        <button class="submit-btn" @click="saveProduct" v-if="isEdit">
            新規登録
        </button>
        <button class="submit-btn green" @click="editProduct" v-else>
            変更
        </button>
        <p class="error-msg" v-if="errorMessage" style="white-space: pre-line;">{{ errorMessage }}</p>
        <h1>商品情報一覧</h1>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>カテゴリー</th>
                    <th>商品名</th>
                    <th>商品ID</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in product" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.selectedCategory }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.id }}</td>
                    <td>
                        <button class="edit-btn" @click="showProduct(item.id)">編集</button>
                        <button class="delete-btn" @click="handleDeleteUser(item.id)">削除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template> -->

<template>
    <div class="add-area">
        <!-- タイトル -->
        <div class="title">
            <span>商品管理</span>
            <button @click="openAddForm"><i class="fa-solid fa-plus"></i>追加する</button>
        </div>

        <!-- ポップアップ -->
        <div class="form-popup" v-if="showForm">
            <div class="form-content">
                <h2>{{ isAddMode ? '商品追加' : '商品編集' }}</h2>

        <div class="form-item">
            <label>商品ID：</label>
            <input type="text" v-model="id" placeholder="例：00001" maxlength="5" />
        </div>
        <div class="form-item">
            <label>商品名：</label>
            <input type="text" v-model="name" placeholder="例：チョコレート" />
        </div>
        <div class="form-item">
            <label>商品カテゴリー：</label>
            <select v-model="selectedCategory">
                <option value="">選択してください</option>
                <option v-for="(c, index) in category" :key="index" :value="c">
                    {{ c }}
                </option>
            </select>
        </div>
        <div class="form-item">
            <label>単価：</label>
            <input type="text" v-model="unitPrice" placeholder="例：100" />円
        </div>
        <!-- <div class="form-item">
            <label>仕入時最低ロット：</label>
            <input type="text" v-model="minLot" placeholder="例：10" />
        </div>
        <div class="form-item">
            <label>備考：</label>
            <textarea v-model="remarks" rows="4" cols="50" placeholder="備考を入力してください"></textarea>
        </div> -->
        <button class="submit-btn" @click="saveProduct" v-if="isEdit">
            新規登録
        </button>
        <button class="submit-btn green" @click="editProduct" v-else>
            変更
        </button>
                        <button class="close-btn" @click="showForm = false">
                    キャンセル
                </button>
        <p class="error-msg" v-if="errorMessage" style="white-space: pre-line;">{{ errorMessage }}</p>
            </div>
        </div>

        <!-- 一覧 -->

        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>カテゴリー</th>
                    <th>商品名</th>
                    <th>商品ID</th>
                    <th>単価</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in product" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.selectedCategory }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.unitPrice }}円</td>
                    <td>
                        <button class="edit-btn" @click="openEditForm(item.id)"><i
                                class="fa-regular fa-pen-to-square"></i></button>
                        <button class="delete-btn" @click="handleDeleteUser(item.id)"><i
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
    /* height:600px; */
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