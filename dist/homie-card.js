import {
    LitElement,
    html,
    css,
} from "https://unpkg.com/lit-element@4.2.0/lit-element.js?module";

// Function to fetch and parse the CSV data
async function fetchRandomQuote() {

    // URL of the public Google Sheet in CSV format
    const csvUrl = 'https://docs.google.com/spreadsheets/d/1mySc-NNs1vKgU4_g4fSDk7BY46W0qqev7aiR_UHSmrU/export?format=csv';

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

class HomieCard extends LitElement {
    static get properties() {
        return {
            hass: {},
            config: {},
            quoteData: { type: Object },
            isLoading: { type: Boolean },
            error: { type: String },
            lastLoadTime: { type: Number }
        };
    }

    constructor() {
        super();
        this.quoteData = null;
        this.isLoading = false;
        this.error = null;
        this.lastLoadTime = null;
        this.refreshInterval = null;
        this.refreshIntervalMs = 3600000;
    }

    async connectedCallback() {
        await super.connectedCallback();
        await this.loadQuote();
        this.startHourlyRefresh();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }

    startHourlyRefresh() {
        // Clear any existing interval
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }

        // Simple approach: refresh every hour from now
        this.refreshInterval = setInterval(() => {
            this.refreshQuote();
        }, this.refreshIntervalMs); // 1 hour = 3600000 milliseconds
    }


    async loadQuote() {
        if (this.isLoading) return; // Prevent multiple calls

        this.isLoading = true;
        this.error = null;

        try {
            const result = await fetchRandomQuote();
            this.quoteData = result;
            this.lastLoadTime = Date.now();
        } catch (error) {
            console.error('Error loading quote:', error);
            this.error = 'Failed to load quote';
        } finally {
            this.isLoading = false;
        }
    }

    async refreshQuote() {
        console.log('Refreshing quote...');
        // Reset quote data to trigger a new load
        this.quoteData = null;
        await this.loadQuote();
    }

    // Rest of your methods remain the same...
    quoteTemplate() {
        if (this.isLoading) {
            return html`<div class="fade-out">Loading quote...</div>`;
        }

        if (this.error) {
            return html`<div>Error: ${this.error}</div>`;
        }

        if (this.quoteData) {
            console.log(this.quoteData);
            return html`
                <div class="jarle">
                    <div class="centered-jarle fade-in">
                        <div class="quote">
                                "${this.quoteData.quote}"
                        </div>
                        <div class="person">
                            ${this.quoteData.person}
                        </div>
                    </div>
                </div>
            `;
        }

        return html`<div>No quote available</div>`;
    }

    render() {
        return html`
            ${this.quoteTemplate()}
        `;
    }

    setConfig(config) {
        if (!config) {
            throw new Error('Invalid configuration');
        }

        if (config.refresh_interval) {
            const minutes = parseInt(config.refresh_interval);
            if (isNaN(minutes) || minutes < 1) {
                throw new Error('refresh_interval must be a positive number (in minutes)');
            }
            this.refreshIntervalMs = minutes * 60 * 1000;
        }

        this.config = config;

        // Restart refresh with new interval if already running
        if (this.refreshInterval) {
            this.startHourlyRefresh();
        }
    }

    getCardSize() {
        return 3;
    }


    static get styles() {
    return css`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

        :host {
            background-image: url('https://images.unsplash.com/photo-1507830075634-ce51e8b19328?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            padding: 16px;
            box-sizing: border-box;
            height: 100%;
            width: 100%;
            display: flex;
            font-family: 'Playfair Display', serif;
        }

        .jarle {
            height: 100%;
            width: 100%;
            margin: 0;
            color: black;
            display: grid;
            place-items: center;
        }
        .centered-jarle {
            max-width: 80%;
            width: fit-content;
            padding: 20px;
            text-align: center;
            //background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            font-family: 'Crimson Text', serif;

        }
        .quote {
            overflow-wrap: break-word;
            font-size: 3.2rem;
            font-style: italic;
            margin-bottom: 15px;
            color: white;
            font-weight: 600;
            line-height: 1.4;
            letter-spacing: 0.5px;
            text-shadow:
                    3px 3px 0 rgba(0, 0, 0, 0.2),
                    6px 6px 12px rgba(0, 0, 0, 0.1);

        }
        .person {
            font-weight: 400;
            color: white;
            font-size: 1.6rem;
            font-style: italic;
            text-shadow:
                    2px 2px 0 rgba(0, 0, 0, 0.8),
                    4px 4px 8px rgba(0, 0, 0, 0.6);

        }

        /* Fade animations */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }

        .fade-in {
            animation: fadeIn 2s ease-out forwards;
        }

        .fade-out {
            animation: fadeOut 2s ease-in forwards;
        }
    `;
    }
}

customElements.define("homie-card", HomieCard);