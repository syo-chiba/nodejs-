// public/main.js

// フォームの送信イベントにリスナーを追加し、addUser 関数を実行する
document.getElementById('userForm').addEventListener('submit', addUser);

// ユーザーを追加するための関数
function addUser(e) {
    // フォームのデフォルトの送信動作を防止する
    e.preventDefault();

    // フォームからユーザーの名前、メール、パスワードを取得する
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // axiosを使って、新しいユーザーをサーバーにPOSTリクエストで送信する
    axios.post('http://localhost:3000/api/users', {
        name: name,
        email: email,
        password: password
    })
    .then(response => {
        // ユーザーが正常に追加されたことを示すメッセージを表示
        alert(response.data.message);
        // 最新のユーザーリストを取得して表示する
        getUsers();
    })
    .catch(error => console.error('Error:', error));  // エラーが発生した場合、エラーメッセージをコンソールに出力
}

// すべてのユーザーを取得して表示するための関数
function getUsers() {
    // axiosを使って、サーバーからすべてのユーザーを取得するGETリクエストを送信する
    axios.get('http://localhost:3000/api/users')
        .then(response => {
            // サーバーから取得したユーザーリストを変数に格納
            const users = response.data;
            // ユーザーリストの表示要素を取得し、内容をクリア
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            // 各ユーザーをリストアイテムとして表示
            users.forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${user.name} (${user.email})
                    <a href="update.html?id=${user.id}">Update</a>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                `;
                userList.appendChild(li);  // ユーザーリストに追加
            });
        })
        .catch(error => console.error('Error:', error));  // エラーが発生した場合、エラーメッセージをコンソールに出力
}

// 指定されたIDのユーザーを削除するための関数
function deleteUser(id) {
    // axiosを使って、指定したIDのユーザーを削除するDELETEリクエストを送信する
    axios.delete(`http://localhost:3000/api/users/${id}`)
        .then(response => {
            // ユーザーが正常に削除されたことを示すメッセージを表示
            alert(response.data.message);
            // 最新のユーザーリストを取得して表示する
            getUsers();
        })
        .catch(error => console.error('Error:', error));  // エラーが発生した場合、エラーメッセージをコンソールに出力
}

// ページがロードされたときに、最初にすべてのユーザーを取得して表示する
getUsers();

document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;

    if (!query.trim()) {
        alert('検索条件を入力してください');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/users/search?query=${encodeURIComponent(query)}`);
        const result = await response.json();

        const resultList = document.getElementById('resultList');
        resultList.innerHTML = '';

        if (result.length > 0) {
            result.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `Name: ${user.name}, Email: ${user.email}`;
                resultList.appendChild(li);
            });
        } else {
            resultList.innerHTML = '<li>該当するユーザーが見つかりませんでした。</li>';
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
});

window.onload = async () => {
    const response = await fetch("http://localhost:3000/api/checkSession");
    const result = await response.json();
    console.log("ログイン状態：" + result.loggedIn)

    if (result.loggedIn) {
        document.getElementById("loginStatus").innerText = `ログイン中: ${result.email}`;
    } else {
        document.getElementById("loginStatus").innerText = "ログインしていません";
    }
};

