'use strict';

// botの返信する内容
let botReply = ["はい", "はい", "うん", "うん", ""];
// ユーザーの回答内容の全てを記憶する配列
let userData = [];

const userText = document.getElementById('chatbot-text');
const chatSubmitBtn = document.getElementById('chatbot-submit');
const chatDumpBtn = document.getElementById('chatbot-save');
const chatbot = document.getElementById('chatbot');
const chatbotBody = document.getElementById('chatbot-body');
const chatbotFooter = document.getElementById('chatbot-footer');

userText.addEventListener("keydown", sendByCtrlEnter);
chatSubmitBtn.addEventListener('click', displayUserOutputAndReply);
chatDumpBtn.addEventListener('click', saveChatLog);

robotOutput('よろしくお願いします。');

//
// -- ここから汎用の処理にしたい --
//

// 抽選
function lot(data) {
	return data[Math.floor(Math.random() * data.length)];
}

// 一番下までスクロール
function scroll_element(e) {
	e.scroll(0, e.scrollHeight - e.clientHeight);
}

//
// ----------ここから関数 -------------
//

// Enterキーが押された時にSubmitされるのを抑制する
function sendByCtrlEnter(event) {
	if (event.key == 'Enter') {
		if (event.ctrlKey) {
			chatSubmitBtn.click();
		} else {
			event.preventDefault();
			userText.value = userText.value + '\n';
		}
	}
}

function displayUserOutputAndReply() {
	const txt = userText.value.trim();

	const ret = userOutput(txt);
	userText.value = '';
	if (!ret) return;
	userData.push(txt);
	const rep = lot(botReply);
	robotOutput(rep);
}

// 書き込んだ内容のセーブ
function saveChatLog() {
	const blob = new Blob([userData.join("\n").concat(['\n'])], {
		type: "text/plain"
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "kabeuchi_log_" + Date.now() + ".txt";
	a.click();
	URL.revokeObjectURL(url);
}

// 投稿
function post(text, is_me) {
	if (!text) return false;

	const date = (new Date()).toLocaleString('ja-JP', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
	const side = is_me ? 'right' : 'left';

	const li = document.createElement('li');
	const message = document.createElement('pre');
	const time = document.createElement('div');

	chatbotBody.appendChild(li);
	li.appendChild(message);
	li.appendChild(time);

	li.classList.add(side);
	message.classList.add('chatbot-' + side);
	time.classList.add('chatbot-time');

	message.textContent = text;
	time.textContent = date;

	time.scrollIntoView(false);
	return true;
}

function userOutput(content) {
	return post(content, true);
}

function robotOutput(content) {
	return post(content, false);
}
