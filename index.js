 

const consulta = async (url) =>{
  try{
  const resp = await fetch(url);
  if(!resp.ok) throw resp.status;
  return await resp.json();
}catch(error){
  throw `The query produced an error: ${error}`
}
}


//1
const getAllBreeds = async ()=> {
  try {
    const data = await consulta("https://dog.ceo/api/breeds/list/all");
    if (data.status !== 'success') throw 'Error getting data'
    return Object.keys(data.msg)
  } catch (error) {
    console.log(error)
  }
}
//2
const getRandomDog = async ()=> {
  try {
    const data = await consulta("https://dog.ceo/api/breeds/image/random");
    if (data.status !== 'success') throw 'Error getting Image'
    return data.message;
  } catch (error) {
    console.log(error)
  }
}
//3
const getAllImagesByBreed = async ()=> {
  try {
    const response = await fetch("https://dog.ceo/api/breed/komondor/images");
    const data = await response.json();
    return data.message; 
  } catch (error) {
    console.log(error)
  }
}
//4
const getAllImagesByBreed2 = async (breed) => {
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error(`Error en getAllImagesByBreed2 para ${breed}:`, error);
  }
}
//5
const getGitHubUserProfile = async (username) =>{
  try {
    const data = await consulta(`https://api.github.com/users/${username}`);
    if (data.login.toLowerCase() !== username) throw `Error getting profile of user ${username}`
    return data;
  } catch (error) {
    console.log(error)
  }
}
//6
const printGithubUserProfile= async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
  
    const userProfile = {
      img: data.avatar_url,
      name: data.name
    };

   
    const imgElement = document.createElement("img");
    imgElement.src = userProfile.img;
    imgElement.alt = userProfile.name || "User Avatar";
    
    const nameElement = document.createElement("h2");
    nameElement.textContent = userProfile.name || username;

    document.body.appendChild(imgElement);
    document.body.appendChild(nameElement);

    return userProfile;
  } catch (error) {
    console.log(error)
  }
}
//7
const getAndPrintGitHubUserProfile = async (username) => {
  try {
    const user = await getGitHubUserProfile(username);
    const sectionElement = document.createElement('section');
    const userImgElement = document.createElement('img');
    const userNameElement = document.createElement('h1');
    const userReposElement = document.createElement('p');
    userImgElement.src = user.avatar_url;
    userImgElement.alt = user.name;
    userNameElement.appendChild(document.createTextNode(user.name));
    usrrReposElement.appendChild(userImgElement, userNameElement, userReposElement);
    return sectionElement.outerHTML;
  } catch (error) {
    console.log(error)
  }
}
//8
const createGitHubUserFindForm = ()=>{
  const form = document.createElement('form');
  const inputLabel = document.createElement('label');
  const input = document.createElement('input');
  const button = document.createElement('input');

  inputLabel.setAttribute('for', 'input');
  inputLabel.appendChild(document.createTextNode('Nombre de usuario'));
  input.id = 'input';
  button.id = 'button';
  button.value = 'Buscar usuario';
  button.type = 'submit';

  form.append(inputLabel, input, button);
  document.body.prepend(form);

  return form;
}
document.addEventListener("DOMContentLoaded", (ev) => {
  createGitHubUserFindForm().addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    const profile = await getAndPrintGitHubUserProfile(ev.target.input.value);
    console.log(profile);
  });
});
 //9
const getGitHubUserProfileOnlyNameAndUrl = async username =>{
  try{
    const userprofile = await getGitHubUserProfile(username);
    if(!userprofile.name || !userProfile.html_url) throw `Fallo al recuperar el perfil del usuario ${username}`;
    return { name: userProfile.name, html_url: userProfile.html_url}
  }catch(error){
    console.log(error)
  }
}
const fetchGithubUsers = async (userNames) => {
try{
    const promesas = Promise.all(usernames.map(username => getGitHubUserProfileOnlyNameAndUrl(username)));
    (await promesas).forEach(usuario => console.log(`Name: ${usuario.name} , URL: ${usuario.html_url}`));
    return promesas;
  }catch(error){
    console.log(error)
  } 
}
