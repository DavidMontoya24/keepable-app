const colors = [
  "white-bg",
  "red-100-bg",
  "yellow-100-bg",
  "yellow-200-bg",
  "green-100-bg",
  "cyan-100-bg",
  "blue-100-bg",
  "blue-200-bg",
  "purple-200-bg",
  "pink-100-bg",
];

const paletteContainerForm = document.querySelector(".colors-container");
paletteContainerForm.className = "colors__container-custom-form";
const formContainer = document.querySelector(".form-container");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

const colorArrayForm = createColorPalette(paletteContainerForm, colors);
const colorButton = document.getElementById("color-palette-container");
let colorClase = "";

function createColorPalette(container, colors) {
  const colorArray = [];
  container.innerHTML = "";

  colors.forEach((color) => {
    let colorEl = document.createElement("div");
    if (color == "white-bg") {
      colorEl.classList.add("color-custom", color, "border-color");
    } else {
      colorEl.classList.add("color-custom", color);
    }
    colorArray.push(colorEl);
    container.appendChild(colorEl);
  });
  return colorArray;
}

colorButton.addEventListener("click", function (event) {
  event.preventDefault();

  paletteContainerForm.classList.toggle("colors__container-custom-open");

  console.log(colorArrayForm);
});

document.addEventListener("mouseup", function (event) {
  paletteContainerForm.classList.remove("colors__container-custom-open");
});

colorArrayForm.forEach((colorSelected) => {
  colorSelected.addEventListener("click", function (event) {
    event.preventDefault();
    colorClase = event.currentTarget.classList[1];
    const colorClaseStr = colorClase.replace(/-bg/, "");
    if (colorClaseStr == "white") {
      formContainer.style.backgroundColor = "white";
      titleInput.style.backgroundColor = "white";
      contentInput.style.backgroundColor = "white";
    } else {
      formContainer.style.backgroundColor = `var(--${colorClaseStr})`;
      titleInput.style.backgroundColor = `var(--${colorClaseStr})`;
      contentInput.style.backgroundColor = `var(--${colorClaseStr})`;
    }
  });
});
