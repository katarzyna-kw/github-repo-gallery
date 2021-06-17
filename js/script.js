//div where profile info appears
const profileInfo = document.querySelector(".overview");
const username = "katarzyna-kw";
//unordered list of repos
const displayRepos = document.querySelector(".repo-list");


const fetchFromProfile = async function () {
    const response = await fetch (
        `https://api.github.com/users/${username}`
    )
    const data = await response.json();
    // console.log("data: ", data)
    // console.log("data.name", data.name);

    displayFromProfile(data);
}

fetchFromProfile();

const displayFromProfile = function(data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `<figure><img alt="user avatar" src=${data.avatar_url} /></figure><div><p><strong>Name:</strong> ${data.name}</p><p><strong>Bio:</strong> ${data.bio}</p><p><strong>Location:</strong> ${data.location}</p><p><strong>Number of public repos:</strong> ${data.public_repos}</p></div>`
    profileInfo.append(userInfoDiv);
    fetchRepos();
};

const fetchRepos = async function () {
    const repoResponse = await fetch (
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    const repoData = await repoResponse.json(); 
    // console.log('repoData: ', repoData)
    displayEachRepo(repoData);
}


const displayEachRepo = function (repos) {
    for (const repo of repos) {
       const li = document.createElement("li");
       li.classList.add("repo");
       li.innerHTML = `<h3>${repo.name}</h3>`;
       displayRepos.append(li);
    }
};