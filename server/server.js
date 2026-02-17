const express = require('express');
const cors = require('cors');
const db = require('./database');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Middleware ---
const authenticate = (req, res, next) => {
    // Simplified auth: passing user_id in header for prototype simplicity
    // in real app use JWT
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = userId;
    next();
};

// --- Auth Routes ---
app.post('/api/auth/register', (req, res) => {
    const { name, email, password, role, address, phone } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const hash = bcrypt.hashSync(password, 8);
    
    db.run(`INSERT INTO users (name, email, password, role, address, phone) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, email, hash, role, address, phone],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                return res.json({ error: err.message });
            }
            res.json({ id: this.lastID, name, email, role });
        }
    );
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Invalid password' });
        
        res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    });
});

// --- Admin Routes ---
app.get('/api/admin/users', (req, res) => {
    // In real app check if req.userId is admin
    db.all(`SELECT id, name, email, role, address, phone FROM users WHERE role != 'admin'`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/admin/vendors', (req, res) => {
    db.all(`SELECT id, name, email, address, phone FROM users WHERE role = 'vendor'`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- Vendor Routes ---
app.get('/api/products', (req, res) => {
    const vendorId = req.query.vendor_id;
    let sql = `SELECT * FROM products`;
    let params = [];
    if (vendorId) {
        sql += ` WHERE vendor_id = ?`;
        params.push(vendorId);
    }
    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/products', (req, res) => {
    const { vendor_id, name, price, image_url, category, description } = req.body;
    db.run(`INSERT INTO products (vendor_id, name, price, image_url, category, description) VALUES (?, ?, ?, ?, ?, ?)`,
        [vendor_id, name, price, image_url, category, description],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

app.delete('/api/products/:id', (req, res) => {
    db.run(`DELETE FROM products WHERE id = ?`, req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Deleted' });
    });
});

// --- User Routes (Cart & Order) ---
app.get('/api/cart', (req, res) => {
    const userId = req.query.user_id;
    db.all(`SELECT c.id, c.quantity, p.name, p.price, p.image_url, p.id as product_id 
            FROM cart c JOIN products p ON c.product_id = p.id 
            WHERE c.user_id = ?`, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/cart', (req, res) => {
    const { user_id, product_id } = req.body;
    db.run(`INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)
            ON CONFLICT(user_id, product_id) DO UPDATE SET quantity = quantity + 1`,
        [user_id, product_id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Added to cart' });
        }
    );
});

app.post('/api/orders', (req, res) => {
    const { user_id, total_amount, payment_method, shipping_address, items } = req.body; // items = [{product_id, quantity, price}]
    
    // Start transaction (simplified)
    db.serialize(() => {
        db.run(`INSERT INTO orders (user_id, total_amount, payment_method, shipping_address) VALUES (?, ?, ?, ?)`,
            [user_id, total_amount, payment_method, shipping_address],
            function(err) {
                if (err) return res.status(500).json({ error: err.message });
                const orderId = this.lastID;
                
                const stmt = db.prepare(`INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`);
                items.forEach(item => {
                    stmt.run(orderId, item.product_id, item.quantity, item.price);
                });
                stmt.finalize();

                // Clear cart
                db.run(`DELETE FROM cart WHERE user_id = ?`, [user_id]);
                
                res.json({ orderId });
            }
        );
    });
});

app.get('/api/orders', (req, res) => {
    const userId = req.query.user_id;
    db.all(`SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});


// --- Serve Frontend in Production ---
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
