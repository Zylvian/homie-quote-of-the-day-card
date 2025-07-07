# Homie Quote of the Day Card

![Homie Quote Example](images/quote.png)

Homie Quote of the Day parses quotes from a Google Sheet and displays one at the set interval in the config. Personally used to Chromecast a panel (single card) to my living room TV.

A second view on the dashboard is used to fill in quotes and send to the Google Sheet using the Google Sheets integration.

```yaml
type: grid
cards:
  - type: heading
    heading_style: title
    heading: Add a quote!
  - type: vertical-stack
    cards:
      - type: entities
        entities:
          - entity: input_select.google_sheet_quote_person_selector
            name: Who said it?
          - entity: input_text.google_sheets_text
            name: What did the person say?
  - show_name: true
    show_icon: true
    type: button
    entity: input_button.send_google_sheets_quote
    grid_options:
      rows: 2
      columns: 12
    name: Send quote!
    icon: mdi:check
    tap_action:
      action: toggle
    hold_action:
      action: none
```

## Manual Instructions

 2. Download the **Homie-Card** and place into your `config/www` folder.
 
 3. Add the following to the resources section of your dashboard as a Javascript module:

```yaml
/local/homie-card.js?v=2
```
4. Write configuration for the card in your `ui-lovelace.yaml`.

```yaml
cards:
  - type: custom:homie-card
    refresh_interval: 30 
```

5. Restart Home Assistant


## Credits
 - Inspired by https://github.com/dnguyen800/quote-of-the-day-card/tree/master
 - Background image by [Yannick Pulver](https://yannickpulver.com/) via [Unsplash](https://unsplash.com/@yanu)
 - https://lit.dev/docs/components/rendering/
 - https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card
 - This card was made with a bunch of AI assistance.
 
