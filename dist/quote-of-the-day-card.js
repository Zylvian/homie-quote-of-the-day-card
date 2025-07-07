// // Notes
// // Feedparser data loads each RSS feed data entry as an HA entity's attribute. The name of the attribute is the name of the author, like 'Oscar Wilde'.
// // The quote's data is stored as a dictionary under key 'Oscar Wilde'. Access an entry by hass.states[config.entity].attributes[author name][column name]
//
//
// let oldStates = {}
//
//
// // Function to fetch and parse the CSV data
// async function fetchRandomQuote() {
//
//   // URL of the public Google Sheet in CSV format
//   const csvUrl = 'https://docs.google.com/spreadsheets/d/1mySc-NNs1vKgU4_g4fSDk7BY46W0qqev7aiR_UHSmrU/export?format=csv';
//
//   try {
//     // Fetch the CSV data
//     const response = await fetch(csvUrl);
//     const csvText = await response.text();
//
//     // Split the CSV into rows
//     const rows = csvText.split('\n').slice(1); // Skip the header row
//
//     // Filter out any empty rows
//     const validRows = rows.filter(row => row.trim() !== '');
//
//     // Select a random row
//     const randomRow = validRows[Math.floor(Math.random() * validRows.length)];
//
//     // Split the row into columns
//     const columns = randomRow.split(',');
//
//     // Extract the "Person" and "Quote" (assuming they are in the 2nd and 3rd columns)
//     const person = columns[1]?.trim();
//     const quote = columns[2]?.trim();
//
//     // Log the result
//     if (person && quote) {
//       // Return the values as an object
//       return { person, quote };
//     } else {
//       console.log('Invalid data format.');
//     }
//   } catch (error) {
//     console.error('Error fetching or parsing CSV:', error);
//   }
// }
//
//
// class HomieQuoteOfTheDayCard extends HTMLElement {
//
//   constructor() {
//     super();
//     oldStates = {}
//     this.attachShadow({ mode: 'open' });
//   }
//
//   setConfig(config) {
//     if (!config.entity) {
//       throw new Error('Please define an entity.');
//     }
//
//     const root = this.shadowRoot;
//     if (root.lastChild) root.removeChild(root.lastChild);
//
//     const cardConfig = Object.assign({}, config);
//
//     const card = document.createElement('ha-card');
//     const content = document.createElement('div');
//     const style = document.createElement('style');
//
//     style.textContent = `
//             ha-card {
//               /* sample css */
//               ha-card-box-shadow: var(--box-shadow);
//               border-radius: var(--border-radius);
//             }
//
//             body {
//               margin: 0;
//               font-family: Arial, Helvetica, sans-serif;
//             }
//
//             .quotecontainer {
//               position: relative;
//               width: 100%;
//             }
//
//             .quotecenter {
//               margin: auto;
//               width: 90%;
//               position: absolute;
//               text-align: center;
//               padding: 1px;
//
//               line-height: 1;
//               top: 50%;
//               left: 50%;
//               transform: translate(-50%, -50%);
//               color: white;
//
//             }
//
//             .quotecontainer img {
//               display: block;
//               margin-left: auto;
//               margin-right: auto;
//               width: 100%;
//               height: auto;
//               ha-card-box-shadow: var(--box-shadow);
//               border-radius: var(--border-radius);
//             }
//
//             /*=== Trigger  ===*/
//             .animate {
//               -webkit-animation-duration: 1s;
//               animation-duration: 1s;
//               -webkit-animation-fill-mode: both;
//               animation-fill-mode: both;
//             }
//
//             /*=== Optional Delays, change values here  ===*/
//             .one {
//               -webkit-animation-delay: 0.7s;
//               -moz-animation-delay: 0.7s;
//               animation-delay: 0.7s;
//               }
//
//             /*=== Animations start here  ===*/
//             /*=== FADE IN  ===*/
//             @-webkit-keyframes fadeIn {
//               from {
//                 opacity: 0;
//               }
//
//               to {
//                 opacity: 1;
//               }
//             }
//             @keyframes fadeIn {
//               from {
//                 opacity: 0;
//               }
//
//               to {
//                 opacity: 1;
//               }
//             }
//
//             .fadeIn {
//               -webkit-animation-name: fadeIn;
//               animation-name: fadeIn;
//             }
//
//             `;
//
//
//
//     content.innerHTML = `
//       <div id='content'>
//       </div>
//       `;
//
//     card.appendChild(content);
//     card.appendChild(style);
//     root.appendChild(card);
//     this.config = cardConfig;
//   }
//
//   async set hass(hass) {
//     const config = this.config;
//     const root = this.shadowRoot;
//     const card = root.lastChild;
//
//     this.myhass = hass;
//     let card_content = '';
//     let quote_content = ``;
//     const image = config.image || "/local/bg.jpg";
//     const entity = config.entity;
//
//     card_content += `<div class="quotecontainer">
//         <img src="${image}" style="width:100%">
//         <div class="quotecenter animate fadeIn one">`;
//
//     if (hass.states[entity]) {
//       const {person, quote} = await fetchRandomQuote();
//       // If statement also checks for values in 'summary' and 'title'.
//       if (quote['summary'].length >= 60) {
//         quote_content += `<h2>${quote}</h2>`;
//       } else if (quote['summary'].length >= 140) {
//         quote_content += `<h3>${quote}</h3>`;
//       } else {
//         quote_content += `<h1>${quote}</h1>`;
//       }
//       quote_content += `<h3>${person}</h3>`;
//       card_content += quote_content
//       card_content += `</div></div>`
//
//     };
//     root.lastChild.hass = hass;
//     root.getElementById('content').innerHTML = card_content;
//
//
//   }
//   getCardSize() {
//     return 1;
//   }
//
//   // The rules for sizing your card in the grid in sections view
//   getGridOptions() {
//     return {
//       rows: 3,
//       columns: 6,
//       min_rows: 3,
//       max_rows: 3,
//     };
//   }
// }
//
// customElements.define('homie-quote', HomieQuoteOfTheDayCard);
