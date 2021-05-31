const url = 'https://api.github.com/users/';
const reposView = document.getElementById('repos');

async function verifyUserIsValid(user) {
	const regex = /\?\/|\/|=|,|\^|&|#|\*/g;
	if (String(user).match(regex) !== null) {
		return false;
	}

	const request = await axios.get(
		url + String(user),
		{
			validateStatus: false,
		}
	);

	if (request["data"]["message"] === "Not Found") {
		return false;
	}

	return true;
}

export async function verifyHasUser() {
	const user = window.localStorage.getItem('user-to-github');

	if (user !== null) {
		const t = await verifyUserIsValid(user)
		if (!t) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

async function saveUser(username, oldContainer) {
	const t = await verifyUserIsValid(username);
	if (!t) {
		if (oldContainer) {
			oldContainer.remove()
		}
		showErrorMessage();
		return false;
	}
	window.localStorage.setItem('user-to-github', String(username));
	oldContainer.remove();
	reposView.innerHTML = null;
	document.title = username;
}

export function setUser(oldContainer) {

	if (oldContainer) {
		oldContainer.remove();
	}

	const container = document.createElement('main');
	const box = document.createElement('div');
	const text = document.createElement('p');
	const input = document.createElement('input');
	const button = document.createElement('button');

	container.classList.add('user-container');
	box.classList.add('user-box');
	text.classList.add('user-text');
	input.classList.add('user-input');
	button.classList.add('user-button');

	text.textContent = "Type your GitHub username";
	button.textContent = "done";

	box.appendChild(text);
	box.appendChild(input);
	box.appendChild(button);

	container.appendChild(box);

	button.addEventListener('click', () => saveUser(input.value, container));
	input.addEventListener('keydown', (e) => e.key === "Enter" && saveUser(input.value, container));

	document.body.appendChild(container);
}

export function showErrorMessage() {
	const container = document.createElement('main');
	const box = document.createElement('div');
	const text = document.createElement('p');
	const button = document.createElement('button');

	container.classList.add('error-container');
	box.classList.add('error-box');
	text.classList.add('error-text');
	button.classList.add('error-button');

	text.textContent = "Invalid user or user not found!";
	button.textContent = "set user";

	box.appendChild(text);
	box.appendChild(button);
	container.appendChild(box);

	button.addEventListener('click', () => setUser(container));

	document.body.appendChild(container);
}
