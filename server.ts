import express from 'express';
import path from 'path';
import pkg from 'pg';
import { createServer as createViteServer } from 'vite';

const { Pool } = pkg;

const app = express();
const PORT = 3000;

app.use(express.json());

// Database connection or fallbacks
let pool: pkg.Pool | null = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  console.log("Connected to PostgreSQL.");
} else {
  console.warn("No DATABASE_URL provided. Using mock data for API routes.");
}

// Mock Data
const MOCK_USER = {
  name: "Dona Maria",
  balanceOwed: 480.00
};

const MOCK_PARCELAS = [
  { id: 1, label: "Parcela de Maio", dueDate: "2023-05-25", amount: 160.00, status: "paid" },
  { id: 2, label: "Vence em 25/06", dueDate: "2023-06-25", amount: 160.00, status: "pending" },
  { id: 3, label: "Venceu em 25/04", dueDate: "2023-04-25", amount: 160.00, status: "late", lateFeeIncluded: true }
];

const MOCK_TRANSACTIONS = [
  { id: 1, title: "Recebimento PIX", description: "Maria Silva", amount: 500.00, time: "14:30", date: "Hoje", type: "income", icon: "account_balance_wallet" },
  { id: 2, title: "Pagamento Parcela Maio", description: "Crédito Favela", amount: -150.00, time: "09:15", date: "Hoje", type: "expense", icon: "payments" },
  { id: 3, title: "Compra no Mercado", description: "Mercadinho do Zé", amount: -85.50, time: "18:45", date: "Ontem", type: "expense", icon: "shopping_cart" },
  { id: 4, title: "Venda Biscoitos", description: "Dinheiro Físico", amount: 120.00, time: "10:00", date: "15 de Junho", type: "income", icon: "storefront" },
  { id: 5, title: "Conta de Luz", description: "Boleto", amount: -115.00, time: "08:20", date: "15 de Junho", type: "expense", icon: "receipt_long" }
];

// API Endpoints
app.post('/api/login', async (req, res) => {
  const { cpf, password } = req.body;
  // Authenticate user
  if (pool) {
    try {
      // In a real app we'd verify the password hash
      const result = await pool.query('SELECT id, name FROM users WHERE cpf = $1 LIMIT 1', [cpf]);
      if (result.rows.length > 0) {
        res.json({ success: true, user: result.rows[0] });
      } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json({ success: true, user: MOCK_USER });
  }
});

app.get('/api/user/info', async (req, res) => {
  if (pool) {
    res.json({ success: true, user: { name: "Dona Maria", balanceOwed: 480.00 }}); // Mocked but pretending DB
  } else {
    res.json({ success: true, user: MOCK_USER });
  }
});

app.get('/api/parcelas', async (req, res) => {
  if (pool) {
    try {
      res.json(MOCK_PARCELAS); // Pretending DB
    } catch(e: any) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(MOCK_PARCELAS);
  }
});

app.get('/api/transactions', async (req, res) => {
  if (pool) {
    try {
      res.json(MOCK_TRANSACTIONS); // Pretending DB
    } catch(e: any) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json(MOCK_TRANSACTIONS);
  }
});

// Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support client-side routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
