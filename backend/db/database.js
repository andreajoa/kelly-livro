const Database = require("better-sqlite3")
const path = require("path")

const db = new Database(path.join(__dirname, "kelly.db"))

db.exec(`
  CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page TEXT NOT NULL,
    ip TEXT,
    user_agent TEXT,
    locale TEXT DEFAULT 'pt',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    page TEXT,
    metadata TEXT,
    ip TEXT,
    locale TEXT DEFAULT 'pt',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    address TEXT NOT NULL,
    cep TEXT NOT NULL,
    city_state TEXT NOT NULL,
    reference_point TEXT,
    subtotal REAL NOT NULL,
    shipping_cost REAL NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    stripe_session_id TEXT,
    locale TEXT DEFAULT 'pt',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT,
    email TEXT,
    whatsapp TEXT,
    address TEXT,
    cep TEXT,
    city_state TEXT,
    reference_point TEXT,
    source TEXT DEFAULT 'checkout',
    locale TEXT DEFAULT 'pt',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

// Adicionar coluna locale se não existir (para bancos já criados)
try { db.exec("ALTER TABLE page_views ADD COLUMN locale TEXT DEFAULT 'pt'") } catch(e) {}
try { db.exec("ALTER TABLE events ADD COLUMN locale TEXT DEFAULT 'pt'") } catch(e) {}
try { db.exec("ALTER TABLE orders ADD COLUMN locale TEXT DEFAULT 'pt'") } catch(e) {}
try { db.exec("ALTER TABLE leads ADD COLUMN locale TEXT DEFAULT 'pt'") } catch(e) {}

module.exports = db
