# Quote of the Day Card
![quote](images/quote.gif)

Quote of the Day card uses the [Feed Parser Sensor](https://github.com/custom-components/sensor.feedparser) to pull quotes from Brainyquotes.com RSS feed and display them on a nice card. Quotes are selected randomly.


## Requirements
- **Feedparser v0.0.8 or later:** Feedparser changes the way the data is stored from dictionary to list format. Quote of the Day card was updated in v0.0.4 to be compatible with this breaking change. Previous versions of Feedparser may work but are untested.

## Instructions
 1. Download the [Feed Parser Sensor](https://github.com/custom-components/sensor.feedparser) and use the following configuration:

 ```yaml
sensor:
  - platform: feedparser
    name: Quote of the Day
    feed_url: 'https://www.brainyquote.com/link/quotebr.rss'
    date_format: '%a, %b %d %I:%M %p'
```

## HACS Instructions
 2. Go to HACS settings and add the following custom repository (as plugin):
 
 ```
 https://github.com/dnguyen800/quote-of-the-day-card
 ```

## Manual Instructions

 2. Download the [Quote-Day-Card](https://raw.githubusercontent.com/dnguyen800/quote-of-the-day-card/master/dist/quote-of-the-day-card.js), [bg.jpg](https://github.com/dnguyen800/quote-of-the-day-card/blob/master/dist/bg.jpg) and place the files in your `config/www` folder.
 
 3. Add the following to the resources section of your ui-lovelace.yaml

```yaml
resources:
  - url: /local/quote-of-the-day-card.js
    type: js  
```
4. Write configuration for the card in your `ui-lovelace.yaml`.

```yaml
 - type: custom:quote-of-the-day-card               
   entity: sensor.quote_of_the_day
   feed_attribute: entries # Required if using FeedParser v0.0.8 or later
```

5. Restart Home Assistant
 
## Options
| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| entity | string | **Required** | Name of the Feed Parser sensor that contains the Quote of the Day data.
| feed_attribute | string | **Required** | If using Feedparser v0.0.8 or later, use **``feed_attribute: entries``**. If using an earlier Feedparser version, do not add this config.
| image | string | /local/bg.jpg | If the background image is stored in a location other than /www/bg.jpg, you can input a different location here. Example: '/local/bg.jpg'



## Credits
 - Background image by [Yannick Pulver](https://yannickpulver.com/) via [Unsplash](https://unsplash.com/@yanu)
 - [Feed Parser Sensor](https://github.com/custom-components/sensor.feedparser) - @iantrich For doing the hard work.
 - All the Home Assistant custom components and cards out there. I learned from your examples.
 
