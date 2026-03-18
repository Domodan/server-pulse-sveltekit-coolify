<script>
	import { enhance } from '$app/forms';

    let { data } = $props();

</script>

<div class="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
    <h1 class="text-4xl font-bold mb-8 text-cyan-400">Server Pulse</h1>
    
    <form method="POST" use:enhance>
        <button class="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-bold transition">
            Send Heartbeat Pulse
        </button>
    </form>

    <!-- Dashbord Stats -->
     
    <div class="mt-12 w-full max-all-md">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-800 p-4 rounded-xl border border-cyan-900/50">
                <h3 class="text-cyan-400 font-bold mb-2">Server Health</h3>
                <p>Uptime: {data.serverHealth.uptime} mins</p>
                <p>RAM: {data.serverHealth.memUsage} / {data.serverHealth.totalMem} GB Free</p>
                <p>CPUs: {data.serverHealth.cpus}</p>
                <p>CPU Load: {data.serverHealth.loadAvg}</p>
            </div>

            <div class="bg-gray-800 p-4 rounded-xl border border-purple-900/50">
                <h3 class="text-purple-400 font-bold mb-2">Connectivity</h3>
                <p>IP: {data.connectivity.ip}</p>
                <p>Protocol: {data.connectivity.protocol.toUpperCase()}</p>
                <p>Platform: {data.connectivity.platform.toUpperCase()}</p>
                <p>Referer: {data.connectivity.referrer}</p>
                <p>User Agent: {data.connectivity.userAgent}</p>
            </div>

            <div class="bg-gray-800 p-4 rounded-xl border border-green-900/50">
                <h3 class="text-green-400 font-bold mb-2">Deployment</h3>
                <p>Node: {data.devOps.nodeVersion}</p>
                <p>Env: {data.devOps.nodeEnv}</p>
                <p class="text-xs font-mono">Commit: {data.devOps.commitHash.slice(0, 7)}</p>
                <p class="text-xs font-mono">ID: {data.devOps.containerId}</p>
            </div>
        </div>
    </div>

    <!--  Recent Pulses -->
    <div class="mt-12 w-full max-all-md">
        <h2 class="text-xl mb-4 border-b border-gray-700 pb-2">Recent Pulses</h2>
        {#each data.pulses as pulse}
            <div class="bg-gray-800 p-4 mb-2 rounded border-l-4 border-cyan-500 flex justify-between">
                <span>{new Date(pulse.created_at).toLocaleString()}</span>
                <span class="text-gray-400 text-xs truncate ml-4">{pulse.user_agent.slice(0, 50)}...</span>
                <p class="text-xs text-gray-500">{pulse.server_info}</p>
            </div>
        {/each}
    </div>
</div>