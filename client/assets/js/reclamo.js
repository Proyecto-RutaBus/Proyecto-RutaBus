//El tipo de formulario
document.getElementById("tipo").addEventListener("change", function () {
  const tipo = this.value;
  localStorage.setItem("tipo", tipo);
  const reclamoSection = document.getElementById("reclamoSection");
  const peticionSection = document.getElementById("peticionSection");
});

//Enviar
document
  .querySelector("#solicitudForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = {
      tipo: localStorage.getItem("tipo"),
      descripción: document.querySelector("#Reclamo").value,
    };
    try {
      const response = await fetch(
        "http://localhost:3000/comunicaciones/reclamo",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "Application/Json",
          },
        }
      );

      if (response.ok) {
        document.getElementById("notification").style.display = "block";
        this.reset();
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  });
