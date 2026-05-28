//RESUELVE TUS EJERCICIOS AQUI
// ==========================================
// Dog API - Quiero un perrito
// ==========================================

// 1. getAllBreeds: Devuelve un array de strings con todas las razas
async function getAllBreeds() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    // Object.keys nos da un array con las propiedades (las razas) del objeto message
    return Object.keys(data.message);
  } catch (error) {
    console.error("Error en getAllBreeds:", error);
  }
}

// 2. getRandomDog: Obtiene una imagen random de una raza cualquiera
async function getRandomDog() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message; // Devuelve la URL de la imagen
  } catch (error) {
    console.error("Error en getRandomDog:", error);
  }
}

// 3. getAllImagesByBreed: Obtiene todas las imágenes de la raza komondor
async function getAllImagesByBreed() {
  try {
    const response = await fetch("https://dog.ceo/api/breed/komondor/images");
    const data = await response.json();
    return data.message; // Devuelve el array de URLs de imágenes
  } catch (error) {
    console.error("Error en getAllImagesByBreed:", error);
  }
}

// 4. getAllImagesByBreed2(breed): Devuelve imágenes de la raza pasada por argumento
async function getAllImagesByBreed2(breed) {
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error(`Error en getAllImagesByBreed2 para ${breed}:`, error);
  }
}

// ==========================================
// GitHub API (I) - Información de usuario
// ==========================================

// 5. getGitHubUserProfile: Obtiene el perfil a partir del username
async function getGitHubUserProfile(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getGitHubUserProfile:", error);
  }
}

// 6. printGithubUserProfile: Retorna {img, name} y pinta en el DOM
async function printGithubUserProfile(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    
    // Guardamos los datos que nos pide el test
    const userProfile = {
      img: data.avatar_url,
      name: data.name
    };

    // Pintamos en el DOM (creamos elementos básicos en el body)
    const imgElement = document.createElement("img");
    imgElement.src = userProfile.img;
    imgElement.alt = userProfile.name || "User Avatar";
    
    const nameElement = document.createElement("h2");
    nameElement.textContent = userProfile.name || username;

    document.body.appendChild(imgElement);
    document.body.appendChild(nameElement);

    return userProfile;
  } catch (error) {
    console.error("Error en printGithubUserProfile:", error);
  }
}

// 7. getAndPrintGitHubUserProfile: Devuelve un string con la tarjeta HTML exacta
async function getAndPrintGitHubUserProfile(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    const name = data.name || username;
    const avatar = data.avatar_url;
    const repos = data.public_repos;

    // Retorna la estructura de sección exacta solicitada en el enunciado
    return `
<section>
    <img src="${avatar}" alt="imagen de usuario">
    <h1>${name}</h1>
    <p>Public repos: ${repos}</p>
</section>`.trim(); // .trim() elimina espacios innecesarios que puedan romper el test
  } catch (error) {
    console.error("Error en getAndPrintGitHubUserProfile:", error);
  }
}

// 8. Manipulación del DOM (Interactividad sin testear)
// Creamos los elementos dinámicamente cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Nombre de usuario de GitHub";
  
  const boton = document.createElement("button");
  boton.textContent = "Buscar";

  const resultadoDiv = document.createElement("div");

  document.body.appendChild(input);
  document.body.appendChild(boton);
  document.body.appendChild(resultadoDiv);

  boton.addEventListener("click", async () => {
    const username = input.value.trim();
    if (username) {
      resultadoDiv.innerHTML = "Cargando...";
      const cardHtml = await getAndPrintGitHubUserProfile(username);
      resultadoDiv.innerHTML = cardHtml;
    }
  });
});

// ==========================================
// GitHub API (II) - Promesas en lote
// ==========================================

// 9. fetchGithubUsers: Recibe array de nombres, usa Promise.all()
async function fetchGithubUsers(userNames) {
  // Pasos del enunciado:
  // 1. Mapear el array y hacer un fetch para cada uno (crea un array de promesas)
  const promesasFetch = userNames.map(name => fetch(`https://api.github.com/users/${name}`));

  // 2. Resolver todas a la vez con Promise.all()
  const respuestas = await Promise.all(promesasFetch);

  // 3. Convertir todas las respuestas de red en JSON (otra tanda de promesas que resolvemos juntas)
  const usuariosData = await Promise.all(respuestas.map(res => res.json()));

  // 4. Imprimir por consola lo solicitado
  usuariosData.forEach(user => {
    console.log(`URL del repositorio: ${user.html_url}`);
    console.log(`Nombre de usuario: ${user.name || user.login}`);
  });

  return usuariosData; // Retornamos los datos procesados para el validador del test
}