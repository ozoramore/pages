'use strict';

// ユーザーの回答内容の全てを記憶する配列
let userData = [];

// 一番下へ
function chatToBottom() {
	const chatField = document.getElementById('chatbot-body');
	chatField.scroll(0, chatField.scrollHeight - chatField.clientHeight);
}

const userText = document.getElementById('chatbot-text');
const chatSubmitBtn = document.getElementById('chatbot-submit');
const chatDumpBtn = document.getElementById('chatbot-save');

// 拡大ボタン
const chatbot = document.getElementById('chatbot');
const chatbotBody = document.getElementById('chatbot-body');
const chatbotFooter = document.getElementById('chatbot-footer');

// 書き込んだ内容のセーブ
chatDumpBtn.addEventListener('click', () => {
	const blob = new Blob([userData.join("\n").concat(['\n'])], {type: "text/plain"});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "kabeuchi_log_" + Date.now() + ".txt";
	a.click();
	URL.revokeObjectURL(url);
})

// --------------------自分の投稿（送信ボタンを押した時の処理）--------------------
chatSubmitBtn.addEventListener('click', () => {

	// 空行の場合送信不可
	if (!userText.value || !userText.value.match(/\S/g)) return false;

	// 投稿内容をSave用に保存
	userData.push(userText.value);
	console.log(userData);

	// ulとliを作り、右寄せのスタイルを適用し投稿する
	const ul = document.getElementById('chatbot-ul');
	const li = document.createElement('li');
	// このdivにテキストを指定
	const div = document.createElement('div');
	// 時間表示
	const date = new Date();
	const time=document.createElement('div');

	li.classList.add('right');
	ul.appendChild(li);
	li.appendChild(div);

	div.classList.add('chatbot-right');
	div.textContent = userText.value;

	li.appendChild(time);
	time.classList.add('chatbot-time');
	time.textContent = date.toLocaleString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

	robotOutput(lot({ "はい": 50, "うん": 50, }));

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

function robotOutput(content) {
	if(lot({"a":66,"b":33}) == "b") return false;
	chatSubmitBtn.disabled = true;

	const ul = document.getElementById('chatbot-ul');
	const li = document.createElement('li');
	li.classList.add('left');
	ul.appendChild(li);

	// このdivにテキストを指定
	const div = document.createElement('div');
	li.appendChild(div);
	div.classList.add('chatbot-left');
	div.textContent = content;

	// 一番下までスクロール
	chatToBottom();

	chatSubmitBtn.disabled = false;
}

// 初期画面
robotOutput('よろしくお願いします。');
