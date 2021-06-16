//div where profile info appears
const profileInfo = document.querySelector(".overview");
const username = "katarzyna-kw";

const fetchFromProfile = async function () {
    const response = await fetch (
        `https://api.github.com/users/${username}`
    )
    const data = await response.json();
    console.log("data: ", data)
}

fetchFromProfile();