const db = require('./database');

console.log("Verifying Database Setup...");

db.serialize(() => {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
        if (err) {
            console.error("❌ Database Error:", err.message);
            process.exit(1);
        }
        
        const tableNames = tables.map(t => t.name);
        const expectedTables = ['users', 'products', 'orders', 'order_items', 'cart', 'vendor_requests'];
        
        const missing = expectedTables.filter(t => !tableNames.includes(t));
        
        if (missing.length > 0) {
            console.error("❌ Missing tables:", missing.join(', '));
            process.exit(1);
        } else {
            console.log("✅ All tables present:", tableNames.join(', '));
        }

        // Check if Admin exists
        db.get("SELECT * FROM users WHERE role='admin'", [], (err, row) => {
             if (err) {
                 console.error("❌ Error checking admin:", err.message);
             } else if (!row) {
                 console.log("⚠️ No admin user found. You can register one via the API or frontend.");
             } else {
                 console.log("✅ Admin user exists:", row.email);
             }
             
             console.log("\nSetup Verification Complete! You can start the server.");
        });
    });
});
