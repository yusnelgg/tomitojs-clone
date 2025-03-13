let timer;
let remainingTime = 25 * 60; // 25 minutos en segundos (valor inicial)
let isRunning = false;
let totalTime = 25 * 60; // Tiempo total inicial

const timerText = document.querySelector('.timer-text');
const actionButton = document.querySelector('.action-button');
const dropdownButton = document.querySelector('.action-button-2');
const resetButton = document.querySelector('.reset-button');
const incrementButtons = document.querySelectorAll('.increment-button');
const progressBar = document.querySelector('.progress-bar');
const titleModal = document.getElementById('title-modal');
const closeModal = document.querySelector('.close-modal');
const newTitleInput = document.getElementById('new-title-input');
const saveTitleButton = document.getElementById('save-title-button');
const sessionTextP = document.querySelector('.session-text-p');

// Función para actualizar el temporizador y la barra de progreso
function updateTimer() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Actualizar la barra de progreso
  const progress = ((totalTime - remainingTime) / totalTime) * 100;
  progressBar.style.width = `${progress}%`;

  if (remainingTime <= 0) {
    clearInterval(timer);
    isRunning = false;
    actionButton.textContent = "Start";
    remainingTime = totalTime; // Reiniciar con el valor actual
    progressBar.style.width = "0%"; // Reiniciar la barra de progreso
  } else {
    remainingTime--;
  }
}

// Función para iniciar/pausar el temporizador
actionButton.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    actionButton.textContent = "Pause";
    timerText.contentEditable = false; // Deshabilitar la edición
    timer = setInterval(updateTimer, 1000);
  } else {
    isRunning = false;
    actionButton.textContent = "Start";
    timerText.contentEditable = true; // Habilitar la edición
    clearInterval(timer);
  }
});

// Función para reiniciar el contador
resetButton.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  remainingTime = 25 * 60; // Reiniciar a 25 minutos
  totalTime = 25 * 60; // Reiniciar el tiempo total
  timerText.textContent = "25:00";
  progressBar.style.width = "0%";
  actionButton.textContent = "Start";
  timerText.contentEditable = true; // Habilitar la edición
});

// Función para incrementar el tiempo
incrementButtons.forEach(button => {
  button.addEventListener('click', () => {
    const minutesToAdd = parseInt(button.getAttribute('data-minutes'));
    const currentMinutes = parseInt(timerText.textContent.split(':')[0]);
    const newMinutes = currentMinutes + minutesToAdd;
    timerText.textContent = `${newMinutes.toString().padStart(2, '0')}:00`;
    remainingTime = newMinutes * 60; // Actualizar el tiempo restante
    totalTime = newMinutes * 60; // Actualizar el tiempo total
  });
});

// Función para validar la edición del temporizador
timerText.addEventListener('input', () => {
  const value = timerText.textContent;
  if (/^\d{1,2}:\d{2}$/.test(value)) {
    const [minutes, seconds] = value.split(':');
    if (parseInt(minutes) >= 0 && parseInt(seconds) >= 0 && parseInt(seconds) < 60) {
      remainingTime = parseInt(minutes) * 60 + parseInt(seconds);
      totalTime = parseInt(minutes) * 60 + parseInt(seconds); // Actualizar el tiempo total
    }
  }
});

// Función para mostrar el modal de cambio de título
dropdownButton.addEventListener('click', () => {
  titleModal.style.display = "flex"; // Mostrar el modal
});

// Función para cerrar el modal
closeModal.addEventListener('click', () => {
  titleModal.style.display = "none"; // Ocultar el modal
});

// Función para guardar el nuevo título
saveTitleButton.addEventListener('click', () => {
  const newTitle = newTitleInput.value.trim();
  if (newTitle) {
    sessionTextP.textContent = newTitle; // Cambiar el texto "Session"
    titleModal.style.display = "none"; // Ocultar el modal
  }
});

// Cerrar el modal si se hace clic fuera de él
window.addEventListener('click', (event) => {
  if (event.target === titleModal) {
    titleModal.style.display = "none";
  }
});