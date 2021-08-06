const username = "katarzyna-kw";
const org = "challenges-KW";
//div where profile info appears
const profileInfo = document.querySelector(".overview");
//ul of repos
const displayRepos = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const eachRepoDataSection = document.querySelector(".repo-data");
const repoLiveLink = document.queryCommandEnabled('.repo-live-link')
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");
const toggleOn = document.querySelector(".toggle-container-on");
const toggleOff = document.querySelector(".toggle-container-off");


const fetchFromProfile = async function () {
    const response = await fetch (
        `https://api.github.com/users/${username}`
    )
    const data = await response.json();

    displayFromProfile(data);
}

fetchFromProfile();

const displayFromProfile = function(data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `<figure><img alt="user avatar" src=${data.avatar_url} /></figure><div><p><span>Name</span> ${data.name}</p><p><span>Bio</span> ${data.bio}</p><p><span>Location</span> ${data.location}</p><p><span>Number of repos</span> ${data.public_repos}</p></div>`
    profileInfo.append(userInfoDiv);
    fetchReposFromOrg();
    fetchRepos();
};

const fetchRepos = async function () {
    const repoResponse = await fetch (
        `https://api.github.com/users/${username}/repos?sort=created&per_page=100` 
    );
    const repoData = await repoResponse.json(); 
    displayEachRepo(repoData);
}

const fetchReposFromOrg = async function () {
    const orgRepoResponse = await fetch (
        `https://api.github.com/orgs/${org}/repos?sort=created&per_page=100`
    );
    const orgRepoData = await orgRepoResponse.json();

    displayEachRepoFromOrg(orgRepoData);
}

const displayEachRepo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
       const li = document.createElement("li");
       li.classList.add("repo");
       li.innerHTML = `<h3>${repo.name}</h3>`;
       displayRepos.append(li);
    }
};

const displayEachRepoFromOrg = function (orgRepos) {
    for (const orgRepo of orgRepos) {
        const orgLi = document.createElement("li");
        orgLi.classList.add("repo");
        orgLi.innerHTML = `<h3>${orgRepo.name}</h3>`;
        displayRepos.append(orgLi);
    }
}

displayRepos.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        fetchEachRepoInfo(repoName);
    }
});

const fetchEachRepoInfo = async function (repoName) {
    const eachRepoInfoResponse = await fetch (
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const eachRepoInfoData = await eachRepoInfoResponse.json();

    const fetchLanguages = await fetch (
            eachRepoInfoData.languages_url
        );
        const languageData = await fetchLanguages.json();

    const languages = []
    for (const key in languageData) {
        languages.push(key);
    }

    displayEachRepoInfo(eachRepoInfoData, languages);

};

const displayEachRepoInfo = function (eachRepoInfoData, languages) {
    eachRepoDataSection.innerHTML = "";
    const divRepoInfo = document.createElement("div");
    if (`${eachRepoInfoData.homepage}` !== "" || `${eachRepoInfoData.homepage}` !== null) {
        divRepoInfo.innerHTML = `<h3>${eachRepoInfoData.name}</h3>
        <p>Description: ${eachRepoInfoData.description}</p>
        <p>Default Branch: ${eachRepoInfoData.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="repo-link" href="${eachRepoInfoData.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub</a>
        <a class="live-link" href="${eachRepoInfoData.homepage}" target="_blank" rel="noreferrer noopener">Live Link</a>`
        console.log("yes")  
    } else {
        divRepoInfo.innerHTML = `<h3>${eachRepoInfoData.name}</h3>
        <p>Description: ${eachRepoInfoData.description}</p>
        <p>Default Branch: ${eachRepoInfoData.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="repo-link" href="${eachRepoInfoData.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub</a>`
        console.log('no')
    }
    eachRepoDataSection.append(divRepoInfo);
    eachRepoDataSection.classList.remove("hide");
    reposSection.classList.add("hide");
    backButton.classList.remove("hide");
};



backButton.addEventListener("click", function () {
    reposSection.classList.remove("hide");
    eachRepoDataSection.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const searchText = filterInput.value;
    const repos = document.querySelectorAll(".repo");
    const repoData = document.querySelectorAll(".repo-data");
    const lowercaseSearchText = searchText.toLowerCase();


    for (const repo of repos) {
        const lowerCaseValue = repo.innerText.toLowerCase();
        if (lowerCaseValue.includes(lowercaseSearchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }

});

const modeButton = document.querySelector(".toggles-container");
const theme = document.querySelector("body");

modeButton.addEventListener("click", function () {
    if (theme.classList.contains("neon-mode")) {
        theme.classList.remove("neon-mode");
        toggleOff.classList.add("hide");
        toggleOn.classList.remove("hide");
    
    }
    else {
        theme.classList.add("neon-mode");
        toggleOff.classList.remove("hide");
        toggleOn.classList.add("hide");
    }
});
