// URL of the public Google Sheet in CSV format
const csvUrl = 'https://docs.google.com/spreadsheets/d/1mySc-NNs1vKgU4_g4fSDk7BY46W0qqev7aiR_UHSmrU/export?format=csv';

// Function to fetch and parse the CSV data
async function fetchRandomQuote() {
    try {
        // Fetch the CSV data
        const response = await fetch(csvUrl);
        const csvText = await response.text();

        // Split the CSV into rows
        const rows = csvText.split('\n').slice(1); // Skip the header row

        // Filter out any empty rows
        const validRows = rows.filter(row => row.trim() !== '');

        // Select a random row
        const randomRow = validRows[Math.floor(Math.random() * validRows.length)];

        // Split the row into columns
        const columns = randomRow.split(',');

        // Extract the "Person" and "Quote" (assuming they are in the 2nd and 3rd columns)
        const person = columns[1]?.trim();
        const quote = columns[2]?.trim();

        // Log the result
        if (person && quote) {
            // Return the values as an object
            return { person, quote };
        } else {
            console.log('Invalid data format.');
        }
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
    }
}
