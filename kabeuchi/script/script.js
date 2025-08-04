'use strict';

// ユーザーの回答内容の全てを記憶する配列
let userData = [];

// 一番下へ
function chatToBottom() {
	const chatField = document.getElementById('chatbot-body');
	chatField.scroll(0, chatField.scrollHeight - chatField.clientHeight);
}

const chatSubmitBtn = document.getElementById('chatbot-submit');

// --------------------自分の投稿（送信ボタンを押した時の処理）--------------------
chatSubmitBtn.addEventListener('click', () => {
	const userText = document.getElementById('chatbot-text');
	// 空行の場合送信不可
	if (!userText.value || !userText.value.match(/\S/g)) return false;

	// 投稿内容を配列に保存しておく(ログ保存ボタンとか用意したい)
	userData.push(userText.value);
	console.log(userText.value);

	// ulとliを作り、右寄せのスタイルを適用し投稿する
	const ul = document.getElementById('chatbot-ul');
	const li = document.createElement('li');
	// このdivにテキストを指定
	const div = document.createElement('div');

	li.classList.add('right');
	ul.appendChild(li);
	li.appendChild(div);
	div.classList.add('chatbot-right');
	div.textContent = userText.value;

	robotOutput();

	// 一番下までスクロール
	chatToBottom();

	// テキスト入力欄を空白にする
	userText.value = '';
});

function lot(data) {
	const rand = Math.floor(Math.random() * 100)
	let result = false
	let rate = 0
	for (const prop in data) {
		rate += data[prop]
		if (rand <= rate) {
			result = prop
			break
		}
	}
	return result
}

function robotOutput() {
	if(lot({"a":75,"b":25}) == "b") return false;
	chatSubmitBtn.disabled = true;

	const ul = document.getElementById('chatbot-ul');
	const li = document.createElement('li');
	li.classList.add('left');
	ul.appendChild(li);

	// このdivにテキストを指定
	const div = document.createElement('div');
	li.appendChild(div);
	div.classList.add('chatbot-left');

	div.textContent = lot({
		"はい": 40,
		"うん": 60,
	});

	// 一番下までスクロール
	chatToBottom();

	chatSubmitBtn.disabled = false;
}
