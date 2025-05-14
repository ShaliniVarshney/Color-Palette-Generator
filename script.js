const imageInput = document.getElementById("imageInput");
const uploadedImage = document.getElementById("uploadedImage");
const paletteContainer = document.getElementById("palette");

const colorThief = new ColorThief();

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    uploadedImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

// Once image is loaded, extract palette
uploadedImage.addEventListener("load", () => {
  if (!uploadedImage.complete) return;

  const palette = colorThief.getPalette(uploadedImage, 6); // 6 colors
  displayPalette(palette);
});

function displayPalette(palette) {
  paletteContainer.innerHTML = "";

  palette.forEach(color => {
    const [r, g, b] = color;
    const hex = rgbToHex(r, g, b);
    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.style.backgroundColor = hex;
    swatch.textContent = hex;
    paletteContainer.appendChild(swatch);
  });
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map(x => x.toString(16).padStart(2, "0"))
      .join("")
  );
}
