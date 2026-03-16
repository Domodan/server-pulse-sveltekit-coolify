import pg from 'pg';
import 'dotenv/config'; // Requires: npm install dotenv

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function checkConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('✅ Connection Successful! Server time:', res.rows[0].now);
        process.exit(0);
    } catch (err: any) {
        console.error('❌ Connection Failed:', err.message);
        process.exit(1);
    }
}

checkConnection();