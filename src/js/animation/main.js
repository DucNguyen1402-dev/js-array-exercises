import { $, $all, ElementNotFoundError } from "../dom-query.js";

/**
 * ==========================
 *      1. DOM SETUP
 * ===========================
 */

const DOM = (() => {
  try {
    return {
      dogEl: $(".dog__animation"),
      ropeEl: $(".rope"),
      cards: $all(".card")
    };
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
  }
})();



/**
 * ================================
 *    2. FALLING ROPE ANIMATION
 * =============================
 */

DOM.dogEl.addEventListener("animationstart", () => {
  DOM.ropeEl.classList.replace("rotate-10", "-rotate-10");
  DOM.ropeEl.classList.replace("translate-y-18", "translate-y-28");
  setTimeout(()=>{
      DOM.dogEl.classList.add("hidden");
  }, 3000);
});


/**
 * ================================
 *    3. CARD OPEN ANIMATION
 * =============================
 */

let activeCard = null;
DOM.cards.forEach(card =>{
  if(activeCard) return;
   activeCard = card;
  const backdrop = card.querySelector(".card-backdrop");
    backdrop.classList.replace("duration-300", "duration-800");
  card.addEventListener("click", ()=>{
    card.classList.remove("closed-card");

    setTimeout(()=>{
    backdrop.classList.add("-translate-y-full");
      card.classList.add("actived-card");
      card.classList.remove("hover:-translate-y-2")
    }, 50);
  
  });

})



function handleGlobalKeydown(e) {
  if (e.key !== "Escape") return;
  const backdrop = activeCard.querySelector(".card-backdrop");
  backdrop.classList.replace("duration-800", "duration-300");
  activeCard.classList.add("closed-card");
  backdrop.classList.remove("-translate-y-full");
   activeCard.classList.remove("actived-card");
    card.classList.add("hover:-translate-y-2")

}


document.addEventListener("keydown", handleGlobalKeydown);