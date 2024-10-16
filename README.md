# Hivemind - Project

Questo progetto è stato realizzato come parte del corso di **Tecnologie Web** dell'anno accademico **2023/2024** presso l'**Università di Napoli Federico II**.

## Introduzione

Il social network **Hivemind** è una Single Page Application (**SPA**) progettata per gestire e visualizzare dati dinamici attraverso un’interfaccia reattiva e responsive.
Favorisce la condivisione di idee, consentendo agli utenti di registrarsi e autenticarsi per pubblicare le proprie idee, nonché di visualizzare e valutare quelle degli altri tramite upvote o downvote, esprimendo così il loro accordo o disaccordo.

## Struttura del progetto

- **Back-end (BE)**: Server Express su Node.js.
- **Front-end (FE)**: Interfaccia utente React.

## Istruzioni per l'installazione

Per eseguire il progetto, segui questi passaggi.

### 1. Installazione delle dipendenze

#### Back-end

1. Vai nella directory del back-end:
   ```bash
   cd HiveMindBE
   ```
2. Installa le dipendenze con npm:
   ```bash
   npm install
   ```

#### Front-end

1. Vai nella directory del front-end:
   ```bash
   cd HiveMindFE
   ```
2. Installa le dipendenze con npm:
   ```bash
   npm install
   ```

### 2. Configurazione del file `.env` per il Back-end

Il file `.env` contiene le variabili d'ambiente necessarie per configurare il back-end, come la connessione al database e la chiave segreta per i token JWT. Poiché il file `.env` non è incluso nel repository, dovrai crearlo manualmente.

#### 2.1. Creazione del file `.env`

Nella directory `HiveMindBE`, crea un file chiamato `.env`. Di seguito un contenuto d`esempio:

```
DB_CONNECTION_URI = "hiveMindDB.db"
DIALECT = "sqlite"
TOKEN_SECRET = "H1V3M1ND_S3CR37_T0K3N"
```

#### 2.2. Modifica delle variabili d'ambiente

- **DB_CONNECTION_URI**: Questo è il percorso del database. Nell'esempio è configurato per usare un database SQLite (`hiveMindDB.db`). Puoi cambiarlo se vuoi utilizzare un altro tipo di database o se necessiti di utilizzare un`altro path.
- **DIALECT**: Indica il tipo di database che stai utilizzando. In questo caso, è impostato su `sqlite`, ma puoi modificarlo in base al tipo di database che desideri utilizzare (es. `postgres`, `mysql`, `mariadb`).
- **TOKEN_SECRET**: Questa è la chiave segreta utilizzata per la firma dei token JWT. Puoi personalizzarla.

## Configurazione del database con Sequelize

Il progetto utilizza **Sequelize** come ORM (Object Relational Mapping), il che semplifica la configurazione e l'interazione con diversi tipi di database. Per cambiare il database sottostante, segui questi passaggi:

### 1. Modifica del tipo di database

Se vuoi usare un database diverso da SQLite (ad esempio, PostgreSQL, MySQL o MariaDB), dovrai:

1. Modificare il valore di `DIALECT` nel file `.env` con il nome del database che intendi utilizzare. Ad esempio:

   - Per PostgreSQL: `DIALECT = "postgres"`
   - Per MySQL: `DIALECT = "mysql"`
   - Per MariaDB: `DIALECT = "mariadb"`

2. Modificare il valore di `DB_CONNECTION_URI` con la stringa di connessione corretta. Ad esempio, per un database PostgreSQL potrebbe essere:

   ```
   DB_CONNECTION_URI = "postgres://username:password@localhost:5432/nomeDB"
   ```

3. Installare i driver necessari per il database scelto. Se stai passando da SQLite a un altro database, dovrai installare i driver corrispondenti. Ad esempio:
   - Per PostgreSQL:
     ```bash
     npm install pg pg-hstore
     ```
   - Per MySQL:
     ```bash
     npm install mysql2
     ```
   - Per MariaDB:
     ```bash
     npm install mariadb
     ```

Si consiglia di consultare la documentazione ufficiale di [Sequelize](https://sequelize.org/docs/v6/getting-started/) per ulteriori dettagli e per assicurarsi che la configurazione del database sia corretta.

## Esecuzione del progetto

### Avvio del Back-end

1. Dalla directory `HiveMindBE`, avvia il server Express con:

   ```bash
   npm start
   ```

   Il server sarà attivo all'indirizzo: `http://localhost:3000`.

### Avvio del Front-end

1. Dalla directory `HiveMindFE`, avvia l'app React con:

   ```bash
   npm start
   ```

   L'applicazione sarà disponibile all'indirizzo: `http://localhost:5173/`.

### Connessione tra Front-end e Back-end

Il front-end comunica con il back-end tramite l'indirizzo `http://localhost:3000`. Assicurati che entrambi i server siano in esecuzione per il corretto funzionamento dell'applicazione.

## Struttura dei percorsi (Paths)

- **Front-end**: `http://localhost:5173/`
- **Back-end**: `http://localhost:3000/`
