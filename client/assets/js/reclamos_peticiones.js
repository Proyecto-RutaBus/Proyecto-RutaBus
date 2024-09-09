document.getElementById("tipo").addEventListener("change", function () {
  const tipo = this.value;
  const reclamoSection = document.getElementById("reclamoSection");
  const peticionSection = document.getElementById("peticionSection");
  if (tipo === "reclamo") {
    reclamoSection.style.display = "block";
    peticionSection.style.display = "none";
  } else {
    reclamoSection.style.display = "none";
    peticionSection.style.display = "block";
  }
});

document.getElementById("reclamo").addEventListener("input", function () {
  updateWordCount(this, "wordCountReclamo");
});

document.getElementById("peticion").addEventListener("input", function () {
  updateWordCount(this, "wordCountPeticion");
});

function updateWordCount(textarea, wordCountId) {
  const wordCount = textarea.value.trim().split(/\s+/).length;
  const wordCountDisplay = document.getElementById(wordCountId);
  if (wordCount > 300) {
    wordCountDisplay.style.color = "red";
    wordCountDisplay.textContent = `300 palabras máximo alcanzado`;
    textarea.value = textarea.value.split(/\s+/).slice(0, 300).join(" ");
  } else {
    wordCountDisplay.style.color = "black";
    wordCountDisplay.textContent = `${wordCount} / 300 palabras`;
  }
}
document
  .getElementById("solicitudForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario al servidor si fuera necesario.
    // Por ahora solo mostramos la notificación.
    document.getElementById("notification").style.display = "block";
    // Limpiar el formulario después del envío
    this.reset();
    // Reiniciar contadores de palabras
    document.getElementById("wordCountReclamo").textContent =
      "0 / 300 palabras";
    document.getElementById("wordCountPeticion").textContent =
      "0 / 300 palabras";
    // Ocultar las secciones después de enviar
    document.getElementById("reclamoSection").style.display = "none";
    document.getElementById("peticionSection").style.display = "none";
  });

document
  .getElementById("solicitudForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const descripcion =
      tipo === "reclamo"
        ? document.getElementById("reclamo").value
        : document.getElementById("peticion").value;
    const anonimo = document.getElementById("anonimo").checked;

    const formData = new FormData();
    formData.append("tipo", tipo);
    formData.append("descripcion", descripcion);
    formData.append("anonimo", anonimo);
    const archivo = document.getElementById("archivo").files[0];
    if (archivo) {
      formData.append("archivo", archivo);
    }

    try {
      const response = await fetch("http://localhost:4000/solicitudes", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        document.getElementById("notification").style.display = "block";
        this.reset();
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  });
