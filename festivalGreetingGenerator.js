let form = document.getElementById('greetingForm');
let historyDiv = document.getElementById('history');
let historyList = document.getElementById('history-list');

 let cardHistory = JSON.parse(localStorage.getItem('greetingHistory')) || [];

 function updateHistoryDisplay() {
     historyList.textContent = "";
     for (let i = 0; i < cardHistory.length; i++) {
         let listItem = document.createElement("li");
         listItem.textContent = cardHistory[i];
         historyList.appendChild(listItem);
     }
     historyDiv.style.display = cardHistory.length > 0 ? "block" : "none";
 }

 function generateGreeting(name, festival, customMessage) {
     let greetings = {
         ugadi: `Wishing you joy, prosperity, and new beginnings this Ugadi! May this year bring happiness, success, and good health. 🎉`,


         ramadan: ` May this holy month bring you peace, happiness, and countless blessings. Stay blessed with love, health, and prosperity! 🌙✨`


     };

     let title = festival === "ugadi" ? `Happy Ugadi, ${name}!` : `Ramadan Mubarak, ${name}!`;
     let message = greetings[festival];
     let theme = festival === "ugadi" ? "ugadi-card" : "ramadan-card";
     let custommsg = customMessage ? ` ${customMessage}` : "";

     return {
         title,
         message,
         theme,
         custommsg
     };
 }

 form.onsubmit = function(event) {
     event.preventDefault();

     let name = document.getElementById('name');
     let festival = document.getElementById('festival');

     let customMessage = document.getElementById('customMessage');


     let result = generateGreeting(name.value.trim() || 'Pavan', festival.value, customMessage.value.trim());
     name.value = "";
     festival.value = "";
     customMessage.value = "";


     let card = document.getElementById('greeting-card');
     document.getElementById('card-title').textContent = result.title;
     document.getElementById('card-message').textContent = result.message;
     document.getElementById('custom-message').textContent = result.custommsg;
     card.style.display = "block";
     card.classList.add(result.theme);

     cardHistory.unshift(`${result.title} - ${result.message}-${result.custommsg}`);
     if (cardHistory.length > 3) cardHistory.pop();


     localStorage.setItem('greetingHistory', JSON.stringify(cardHistory));
     updateHistoryDisplay();
 };

