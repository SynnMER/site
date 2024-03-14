const messageForm = document.querySelector('#add-message');
const emptyChatMessage = document.querySelector('#empty-chat');
const messagesContainer = document.querySelector('#messages-container');

let notEmpty = false;
messageForm.addEventListener('submit', event => {
	event.preventDefault();
	const { username, usermessage } = getFormObject(messageForm);// выводит сообщение с именем и тексом 
	addMessage(username, usermessage, new Date()); // отвечает за добавление элементов в списов сообщений, и указывает время
	messageForm.reset(); //очищение формы
});




function addMessage(name, message, date) {
	if (!notEmpty) { // проверка на сообщения, на надпись есть ли сообщения
		notEmpty = false;
		emptyChatMessage.style.display = 'none';
	}

	const newMessage = generateElement('div', 'message');
	const currentMonth = (date.getMonth() + 1 < 10 ? '0' : '') + // за месяц
		(date.getMonth() + 1);

	const messageHeader = generateElement('div', 'message-header');	
	newMessage.appendChild(messageHeader);
	messageHeader.appendChild(generateElement(
		'h4',
		'message-title',
		'',
		name
	));
	messageHeader.appendChild(generateElement(
		'p',
		'message-date',
		'',
		`${date.getHours()}:${date.getMinutes()}, ${date.getDate()}.${currentMonth}.${date.getFullYear()}`
	));

	newMessage.appendChild(generateElement(
		'p',
		'message-text',
		'',
		message
	));

	const removeText = generateElement('button','delete','','delete');

	newMessage.appendChild(removeText);
	messagesContainer.appendChild(newMessage);

	removeText.addEventListener('click', e =>{
		newMessage.remove();
		if (messagesContainer.hasChildNodes()) {
			console.log(213)
			emptyChatMessage.style.display = 'block';
		}
	});
}
function getFormObject(form) {
	return Array.from(form.elements)
		.filter(element => {
			return element.type != 'submit';
		}).reduce((result, element) => {
			const { name, type } = element;
			const value = type == 'checkbox' ? element.checked : element.value;
			result[name] = value;
			return result;
		}, {});
}

function generateElement(tagName, tagClass = '', tagId = '', tagValue = '') {
	const newElement = document.createElement(tagName);
	newElement.className = tagClass;
	newElement.id = tagId;
	newElement.innerText = tagValue;
	return newElement;
}