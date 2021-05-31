export function createRepoView(json) {

  const html = `
    <div class="repo-view">
      <div class="title">
        <h2>${json.name}</h2>
        <a href="${json.html_url}" target="_blank">view on github</a>
      </div>
      <div class="description">
        <h4>Description</h4>
        ${json["description"] ? `<p>${json.description}</p>` : ""}
        ${json["language"] ? `<p><strong>Language:</strong> ${json.language}</p>`: ""}
      </div>

      <div class="repo-git">
        <h3>Links</h3>
        <div class="links">
          <a href="${json.git_url}" title="${json.git_url}" target="_blank">GIT url</a>
          <a href="${json.ssh_url}" title="${json.ssh_url}" target="_blank">SSH url</a>
          <a href="${json.clone_url}" title="${json.clone_url}" target="_blank">Clone url</a>
          <a href="${json.svn_url}" title="${json.svn_url}" target="_blank">SVN url</a>
        </div>
      </div>
      ${json["license"] ? `
      <div class="repo-license">
        <p>${json.license.name}</p>
        <a href="${json.license.url}" title="${json.license.key.toUpperCase()} License">${json.license.key.toUpperCase()}</a>
      </div>` : ""
      }
    </div>
  `;

  return html;
}