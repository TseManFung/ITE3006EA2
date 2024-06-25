document.addEventListener("DOMContentLoaded", function () {
  const movebgElement = document.getElementById("movebg");
  const headerElement = document.getElementById("head");
  const chisato = document.querySelector("#header > div.chara1-pos > div");
  const takina = document.querySelector("#header > div.chara2-pos > div");
  let initialMouseX = 0; // init

  headerElement.addEventListener("mouseenter", (event) => {
    initialMouseX = event.clientX;
  });

  headerElement.addEventListener("mouseleave", (event) => {
    movebgElement.style.left = -5 + "vw";
    chisato.style.left = -7 + "vw";
    takina.style.right = -7 - "vw";
  });

  headerElement.addEventListener("mousemove", (event) => {
    const currentMouseX = event.clientX;
    const offsetX = currentMouseX - initialMouseX;
    const vwValue = offsetX / window.innerWidth;

    const bgMappedValue = mapRange(vwValue, -1, 1, 5, -5);
    const charaMappedValue = mapRange(vwValue, -1, 1, -10, 10);

    movebgElement.style.left = -5 + bgMappedValue + "vw";
    chisato.style.left = -7 + charaMappedValue + "vw";
    takina.style.right = -7 - charaMappedValue + "vw";
  });

  function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
});
