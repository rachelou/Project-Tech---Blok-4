## Fancy Datepicker  💫

### Concept Feature
  
De Datepicker-functie is speciaal ontworpen voor ontwikkelaars en heeft verschillende doeleinden. Deze functie kan worden toegepast in toepassingen zoals het boeken van hotels, vluchten en andere diensten. Het belangrijkste doel is om het gebruiksgemak te maximaliseren tijdens het boekingsproces, door gebruikers moeiteloos datums te laten selecteren.
  
### Voordat je start
Zorg ervoor dat je eerst de volgende dingen hebt geinstalleerd.

-   Node.js
-   NPM
-   Git
-   MongoDB Compass

###  Starten van de server

#### Front-end

Voer de volgende stappen uit:  

1.  Open een terminal en navigeer naar een map waar jij mijn repository in wilt opslaan.
    
2.  Clone deze repository:
    

```
git clone https://github.com/rachelou?tab=repositories

```

3.  Wanneer dit is gelukt heb je de repository op je eigen computer gedownload. Navigeer naar deze repository in de terminal. Je wilt nu alle packages installeren die je nodig hebt voor deze feature. Om dit project vervolgens te laten werken voer je het volgende commando uit:  
    

```
npm install

```

4.  Als je het project wilt gebruiken navigeer dan naar de "client" map binnen het project" en voer de volgende commando uit:

```
npm start
```

Ga naar een browser en navigeer naar: localhost:3000  
Als alles goed is zie je Datepicker app tevoorschijn komen. 

#### Back-end

1. Navigeer terug naar de "back-end" folder. 

2. voer de volgende commando uit:
```
node server.js
```
3. Ga naar een browser en navigeer naar: localhost: 4123  
Als alles goed is zie je een tekst met "This is your Homepage"

###  Verander de naam van EXAMPLE.env  

**De applicatie vereist enkele variabelen die je zelf plaatsen in een '.env' bestand.**
  
Momenteel is er g een EXAMPLE.env.env bestand in de back-end map, verander de naam van 'EXAMPLE.env' naar alleen '.env'.  

### Koppelen van de database
Om de app daadwerkelijk ook te laten werken moet je een database koppelen aan de app.  

Voor dit project wordt er gebruik gemaakt van een MongoDB database. Als je meer wilt weten over de database structuur en de manier waarop de gegevens zijn georganiseerd, nodig ik je uit om de pagina [Database Structure](https://github.com/rachelou/Project-Tech---Blok-4/wiki/Database-Structuur) in mijn wiki te raadplegen. Het geeft je inzicht in de structuur en organisatie van de gegevens die binnen dit project worden gebruikt.

### API werkend maken

Naast het koppelen van de database moet er ook verbinding gemaakt worden met de API van Weather API
Om deze API te laten werken moet je eerst een account aanmaken bij op de [website van Weater API](https://www.weatherapi.com/). Hier kun je de API Key kopiëren en vervolgens plakken in de app.js bestand binnen de "client map"

```
const  apiKey  =  ""; <API KEY

const  location  =  "Amsterdam"; <LOCATIE

const  apiUrl  =  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4`; <DYNAMISCHE LINK

```
## Documentatie

Dit project is het resultaat van een combinatie van ideeën en uitgebreid onderzoek. De volledige documentatie van dit proces is te vinden in de [wiki](https://github.com/rachelou/Project-Tech---Blok-4/wiki) van deze repository. In de wiki kun je meer lezen over het ontstaan van mijn concept en de verschillende functies die zijn ontwikkeld. Daarnaast heb ik grondig onderzoek gedaan naar diverse onderwerpen die relevant zijn voor dit project. De wiki biedt gedetailleerde inzichten in de overwegingen en bevindingen tijdens het creatieve proces en de implementatie van de functionaliteiten.

## [](https://github.com/rachelou/Project-Tech---Blok-4/blob/main/LICENSE) License

© Rachid el Ouali

Licensed under the  [MIT License](https://github.com/rachelou/Project-Tech---Blok-4/blob/main/LICENSE)

## Contact

Naam - Rachid el Ouali
Email -  [rachid.el.ouali@hva.nl](mailto:rachid.el.ouali@hva.n)  
Project -  [https://github.com/stefanradouane/bloktech-individueel](https://github.com/rachelou?tab=repositories)










