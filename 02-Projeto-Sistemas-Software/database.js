const Database = require('better-sqlite3');

const db = new Database('sistema_passagens.db');

db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS Companhia (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        anoFundacao INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Trecho (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idCompanhia INTEGER NOT NULL,
        origem TEXT NOT NULL,
        destino TEXT NOT NULL,
        valor REAL,
        numeroPassagens INTEGER,
        FOREIGN KEY (idCompanhia) REFERENCES Companhia(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Cupom (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idCompanhia INTEGER NOT NULL,
        codigo TEXT NOT NULL,
        numeroCupons INTEGER NOT NULL,
        FOREIGN KEY (idCompanhia) REFERENCES Companhia(id) ON DELETE CASCADE
    );
`);

module.exports = db;
