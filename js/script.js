//div where profile info appears
const profileInfo = document.querySelector(".overview");
const username = "katarzyna-kw";

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
}