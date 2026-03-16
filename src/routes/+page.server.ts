import pg from 'pg';
import os from 'os';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';

const pool = new pg.Pool({ connectionString: env.DATABASE_URL });

export const load = async ({ request, getClientAddress }) => {

    // 1. Resource Consumption
    const serverHealth = {
        uptime: Math.floor(os.uptime() / 60), // in minutes
        memUsage: (process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2), // MB
        totalMem: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), // GB
        loadAvg: os.loadavg()[0].toFixed(2),
        cpus: os.cpus().length,
    };

    // 2. Connectivity
    const connectivity = {
        ip: getClientAddress(),
        protocol: request.headers.get('x-forwarded-proto') || 'http',
        platform: os.platform(),
        referrer: request.headers.get('referer') || 'Direct',
        userAgent: request.headers.get('user-agent'),
    };

    // 3. DevOps Metadata
    const devOps = {
        nodeEnv: process.env.NODE_ENV || 'Development',
        containerId: os.hostname(), // Hostname is the Container ID in Docker,
        nodeVersion: process.version,
        // Coolify auto-injects these if configured
        commitHash: env.COOLIFY_COMMIT_SHA || 'Local Development',
    };

    // Pull last 5 pulses from DB
    const res = await pool.query('SELECT * FROM pulses ORDER BY created_at DESC LIMIT 10');

    return {
        serverHealth: serverHealth,
        connectivity: connectivity,
        devOps: devOps,
        pulses: res.rows
    };
};

export const actions = {
    default: async ({ request }) => {
        const ua = request.headers.get('user-agent');
        const stats = `Node: ${process.version} | RAM: ${Math.round(os.freemem() / 1024 / 1024)}MB free`;
        
        try {
            await pool.query('INSERT INTO pulses (user_agent, server_info) VALUES ($1, $2)', [ua, stats]);
        } catch (err) {
            return fail(500, { message: 'DB Connection Failed' });
        }
    }
};