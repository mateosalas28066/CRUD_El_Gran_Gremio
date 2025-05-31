let pets = [];

async function loadPets() {
  try {
    const response = await fetch("/mascotas");
    pets = await response.json();
    renderPets(pets);
  } catch (error) {
    console.error("Error cargando mascotas:", error);
  }
}

function renderPets(filteredPets = pets) {
  const container = document.getElementById("pets-container");
  container.innerHTML = "";

  filteredPets.forEach(pet => {
    let petCard = `
      <div class="pets__card">
        <div class="image-container">
          <img src="${pet.imagen}" alt="${pet.nombre}" class="pet-img">
          <button class="view-button" onclick="openModal('${pet.imagen}')">🔍 Ver</button>
        </div>
        <h4>${pet.nombre}</h4>
        <p><strong>Especie:</strong> ${pet.especie}</p>
        <p><strong>Raza:</strong> ${pet.raza}</p>
        <p><strong>Edad:</strong> ${pet.edad} años</p>
        <p><strong>Peso:</strong> ${pet.peso}</p>
        <p><strong>Estado:</strong> ${pet.estado}</p>
        <div class="flex justify-center gap-2 mt-2">
          <a href="https://wa.me/${pet.whatsapp}" target="_blank">
            <button class="adopt-button">Adoptar</button>
          </a>`;

    if (localStorage.getItem("token")) {
      const safePet = JSON.stringify(pet).replace(/'/g, "\'");

      // Botón Editar
      petCard += `
        <button onclick='openEditModal(${safePet})' class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          ✏️ Editar
        </button>
      `;

      // Botón Eliminar
      petCard += `
        <button onclick='deletePet("${pet.id}")' class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
          🗑️ Eliminar
        </button>
      `;
    }

    petCard += `</div></div>`;
    container.innerHTML += petCard;
  });
}

function filterPets() {
  const searchText = document.getElementById("search").value.toLowerCase();
  const speciesFilter = document.getElementById("filter-species").value;

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.nombre.toLowerCase().includes(searchText) ||
                          pet.raza.toLowerCase().includes(searchText) ||
                          pet.edad.toString().includes(searchText);
    const matchesSpecies = speciesFilter === "all" || pet.especie === speciesFilter;
    return matchesSearch && matchesSpecies;
  });

  renderPets(filteredPets);
}

async function deletePet(id) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Debes iniciar sesión para eliminar una mascota.");
    return;
  }

  try {
    const response = await fetch(`/mascotas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      alert("Mascota eliminada con éxito");
      document.getElementById("aria-status").textContent = "Mascota eliminada con éxito.";
      loadPets(); // Actualiza la lista de mascotas
    } else {
      throw new Error("Error al eliminar mascota");
    }
  } catch (error) {
    console.error("Error eliminando mascota:", error);
    alert("Hubo un problema al eliminar la mascota");
  }
}


function openModal(imgSrc) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  modal.style.display = "flex";
  modalImg.src = imgSrc;
}

function closeModal() {
  document.getElementById("image-modal").style.display = "none";
}
function openEditModal(pet) {
  const modal = document.getElementById("edit-modal");
  const form = document.getElementById("edit-form");

  form.id.value = pet.id;
  form.nombre.value = pet.nombre;
  form.especie.value = pet.especie;
  form.raza.value = pet.raza;
  form.edad.value = pet.edad;
  form.peso.value = pet.peso;
  form.whatsapp.value = pet.whatsapp;
  form.estado.value = pet.estado;
  form.imagen.value = pet.imagen;

  modal.classList.remove("hidden");
}
function closeEditModal() {
  document.getElementById("edit-modal").classList.add("hidden");
}

document.getElementById("edit-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const token = localStorage.getItem("token");

  const updatedPet = {
    nombre: form.nombre.value,
    especie: form.especie.value,
    raza: form.raza.value,
    edad: parseInt(form.edad.value),
    peso: form.peso.value,
    whatsapp: form.whatsapp.value,
    estado: form.estado.value,
    imagen: form.imagen.value
  };

  try {
    const response = await fetch(`/mascotas/${form.id.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updatedPet)
    });

    if (response.ok) {
      closeEditModal();
      await loadPets();
    } else {
      throw new Error("Error al actualizar mascota");
    }
  } catch (error) {
    console.error("Error actualizando mascota:", error);
  }
});



// Crear mascota (protegido por token)
async function createPet(event) {
  event.preventDefault();
  const form = event.target;
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Debes iniciar sesión para publicar un peludito.");
    return;
  }

  const newPet = {
    nombre: form.nombre.value,
    especie: form.especie.value,
    raza: form.raza.value,
    edad: parseInt(form.edad.value),
    peso: form.peso.value,
    imagen: form.imagen.value,
    whatsapp: form.whatsapp.value,
    estado: form.estado.value || "Por adoptar"
  };

  try {
    const response = await fetch("/mascotas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newPet)
    });

    if (response.ok) {
      form.reset();
      await loadPets();
    } else {
      throw new Error("Error al crear mascota");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Login
async function loginAdmin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok || !data.token) {
      throw new Error(data.message || "Credenciales inválidas");
    }

    localStorage.setItem("token", data.token);
    document.getElementById("login-status").textContent = "✅ Sesión iniciada correctamente";
    form.reset();
    checkLoginStatus();
  } catch (error) {
    console.error("Login error:", error);
    document.getElementById("login-status").textContent = "❌ " + error.message;
  }
}

// Registro
async function registerUser(event) {
  event.preventDefault();
  const form = event.target;

  const nuevoUsuario = {
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    email: form.email.value,
    password: form.password.value,
    telefono: form.telefono.value,
    direccion: form.direccion.value
  };

  try {
    const response = await fetch("/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario)
    });

    if (response.ok) {
      form.reset();
      document.getElementById("register-status").textContent = "✅ Usuario registrado correctamente.";
    } else {
      throw new Error("No se pudo registrar el usuario");
    }
  } catch (error) {
    document.getElementById("register-status").textContent = "❌ " + error.message;
  }
}

// Mostrar/Ocultar elementos según sesión
function checkLoginStatus() {
  const token = localStorage.getItem("token");

  const loginSection = document.getElementById("login-section");
  const registerSection = document.getElementById("register-section");
  const createSection = document.getElementById("create-section");
  const logoutSection = document.getElementById("logout-section");
  const userInfo = document.getElementById("user-info");
  const userEmailSpan = document.getElementById("user-email");

  if (token) {
    loginSection?.classList.add("hidden");
    registerSection?.classList.add("hidden");
    createSection?.classList.remove("hidden");
    logoutSection?.classList.remove("hidden");
    userInfo?.classList.remove("hidden");

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userEmailSpan.textContent = payload.sub;
    } catch {
      userEmailSpan.textContent = "Usuario desconocido";
    }
  } else {
    loginSection?.classList.remove("hidden");
    registerSection?.classList.remove("hidden");
    createSection?.classList.add("hidden");
    logoutSection?.classList.add("hidden");
    userInfo?.classList.add("hidden");
    userEmailSpan.textContent = "";
  }
}

function logout() {
  localStorage.removeItem("token");
  checkLoginStatus();
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  loadPets();
  checkLoginStatus();
});
// Mostrar/ocultar opciones de accesibilidad
document.getElementById("accessibility-toggle").addEventListener("click", () => {
  const options = document.getElementById("accessibility-options");
  options.classList.toggle("hidden");
});

// Activar/desactivar alto contraste
function toggleHighContrast() {
  document.body.classList.toggle("high-contrast");
}
function toggleLargeText() {
  document.body.classList.toggle("large-text");
}


document.getElementById("search").addEventListener("input", filterPets);
document.getElementById("filter-species").addEventListener("change", filterPets);
document.getElementById("pet-form").addEventListener("submit", createPet);
document.getElementById("login-form").addEventListener("submit", loginAdmin);
document.getElementById("register-form").addEventListener("submit", registerUser);