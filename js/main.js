import { verifyHasUser } from './loaduser.js';
import { showErrorMessage } from './loaduser.js';
import { createRepoView } from './repos.js';

if (!verifyHasUser()) {
	showErrorMessage();
}

const buttonSearch = document.getElementById('buttonsearch');
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

async function searchRepos(v) {
	const t = await verifyHasUser();
	if (!t) {
		return false;
	}

	// returns all repos
	const repos = await getRepositories();

	const searchValue = v || document.getElementById('reponame').value;

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

buttonSearch.addEventListener('click', searchRepos);
inputSearch.addEventListener('keydown', (e) =>  e.key === "Enter" && searchRepos());


searchRepos('conf');