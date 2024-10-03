// public/update.js

// DOMContentLoaded イベントをリッスンし、ページのコンテンツが読み込まれた後にコードを実行する
document.addEventListener('DOMContentLoaded', () => {
    // URLのクエリパラメータからユーザーIDを取得する
    const userId = new URLSearchParams(window.location.search).get('id');

    // サーバーからすべてのユーザーを取得するためのGETリクエストを送信する
    axios.get(`http://localhost:3000/api/users`)
        .then(response => {
            // 取得したユーザーリストから指定されたIDのユーザーを検索する
            const user = response.data.find(user => user.id == userId);
            if (user) {
                // ユーザーが見つかった場合、その情報をフォームに設定する
                document.getElementById('userId').value = user.id;
                document.getElementById('updateName').value = user.name;
                document.getElementById('updateEmail').value = user.email;
            } else {
                // ユーザーが見つからなかった場合、アラートを表示する
                alert('User not found');
            }
        })
        .catch(error => console.error('Error:', error));  // エラーが発生した場合、エラーメッセージをコンソールに出力

    // フォームの送信イベントにリスナーを追加し、updateUser 関数を実行する
    document.getElementById('updateUserForm').addEventListener('submit', updateUser);
});

// ユーザー情報を更新するための関数
function updateUser(e) {
    // フォームのデフォルトの送信動作を防止する
    e.preventDefault();

    // フォームからユーザーのID、名前、メール、パスワードを取得する
    const id = document.getElementById('userId').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const password = document.getElementById('updatePassword').value;

    // axiosを使って、指定したIDのユーザーを更新するPUTリクエストを送信する
    axios.put(`http://localhost:3000/api/users/${id}`, {
        name: name,
        email: email,
        password: password
    })
    .then(response => {
        // ユーザーが正常に更新されたことを示すメッセージを表示
        alert(response.data.message);
        // 更新後にユーザー一覧ページにリダイレクトする
        window.location.href = 'index.html';
    })
    .catch(error => console.error('Error:', error));  // エラーが発生した場合、エラーメッセージをコンソールに出力
}
