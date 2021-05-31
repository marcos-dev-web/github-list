import { verifyHasUser, showErrorMessage, setUser } from './loaduser.js';
import { createRepoView } from './repos.js';

if (!verifyHasUser()) {
	showErrorMessage();
}

const user = localStorage.getItem('user-to-github');
document.title = user;

const buttonSearch = document.getElementById('buttonsearch');
const buttonNewUser = document.getElementById('newuser');
const inputSearch = document.getElementById('reponame');
const repoContainer = document.getElementById('repos');

const BASE = 'https://api.github.com';

async function getRepositories() {
	const user = window.localStorage.getItem('user-to-github');

	const request = await axios(BASE + '/users/' + user + '/repos');
	const response = await request.data;

	return response;
}

async function verifyUser() {
	const t = await verifyHasUser();

	if (!t) {
		showErrorMessage();
		return false;
	} else {
		return true;
	}
}

async function searchRepos() {
	const t = await verifyHasUser();
	if (!t) {
		return false;
	}

	// returns all repos
	const repos = await getRepositories();

	const searchValue = document.getElementById('reponame').value;

	if (!searchValue.length > 0) {
		return false;
	}

	// returns repo that contains the searchValue
	repoContainer.innerHTML = null;
	const allRepos = repos.filter((repo) => {
		if (repo.name.toLowerCase().indexOf(String(searchValue).toLowerCase()) !== -1) {
			return repo;
		}
	})
	
	if (allRepos.length > 0) {
		allRepos.forEach((repo) => {
			const repoView = createRepoView(repo);
			repoContainer.innerHTML += repoView;
		})
	} else {
		repoContainer.innerHTML = '<h3 id="noresults">No results found</h3>'
	}
}

verifyUser();

buttonNewUser.addEventListener('click', () => setUser());
buttonSearch.addEventListener('click', searchRepos);
inputSearch.addEventListener('keydown', (e) =>  e.key === "Enter" && searchRepos());