window.addEventListener("DOMContentLoaded", () => {
  const cajas = Array.from(document.querySelectorAll(".caja"));
  const boton = document.querySelector(".boton");
  const winner = document.querySelector("#turnoJ");

  let jugadorActual = "X";
  let juegoActivo = true;
  let tablero = ["", "", "", "", "", "", "", "", ""];
  const condiciones = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  function validacion(elemento) {
    if (elemento.hasChildNodes()) {
      return false;
    }
    return true;
  }

  function comparacionR() {
    let ganador = false;
    for (let i = 0; i < 8; i++) {
      const condicion = condiciones[i];
      const n1 = tablero[condicion[0]];
      const n2 = tablero[condicion[1]];
      const n3 = tablero[condicion[2]];

      if (n1 == "" || n2 == "" || n3 == "") {
        continue;
      }
      if (n1 == n2 && n2 == n3) {
        ganador = true;
        break;
      }
    }
    if (ganador) {
      juegoActivo = false;
      winner.innerText = `Ganador el jugador ${jugadorActual}`;
      return true;
    }
    return false;
  }

  function acTablero(i) {
    tablero[i] = jugadorActual;
  }

  function siguienteTurno() {
    if (jugadorActual == "X") {
      jugadorActual = "O";
    } else {
      jugadorActual = "X";
    }
  }

  function cambioColor(id) {
    let elemento = document.getElementById(id);
    if (jugadorActual == "X") {
      elemento.style.backgroundColor = "#f0adad";
    } else {
      elemento.style.backgroundColor = "#aeadf0";
    }
  }

  function empate() {
    if (tablero.indexOf("") == -1) {
      winner.innerText = `Empate`;
    } else {
      winner.innerText = `Turno del jugador ${jugadorActual}`;
    }
  }

  function accionUsuario(elemento, index) {
    if (validacion(elemento) && juegoActivo) {
      if (jugadorActual == "X") {
        elemento.innerHTML =
          '<img src="/img/x.png" width = "40" height = "40" />';
      } else {
        elemento.innerHTML =
          '<img src="/img/o.png" width = "40" height = "40" />';
      }
      console.log(elemento.innerText);
      cambioColor(index.toString());
      acTablero(index);
      let win = comparacionR();
      if (!win) {
        siguienteTurno();
        empate();
      }
    }
  }

  function reset() {
    winner.innerText = `Comienza jugador X`;
    tablero = ["", "", "", "", "", "", "", "", ""];
    juegoActivo = true;
    if (jugadorActual == "O") {
      siguienteTurno();
    }
    cajas.forEach((caja) => {
      caja.innerText = "";
      caja.style.backgroundColor = "#faebd7";
    });
  }

  cajas.forEach((caja, index) => {
    caja.addEventListener("click", () => accionUsuario(caja, index));
  });

  boton.addEventListener("click", reset);
});
