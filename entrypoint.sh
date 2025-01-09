#!/bin/bash

# Function to handle shutdown
shutdown() {
    echo "Shutdown signal received. Executing cleanup..."
    # Release the zrok tunnel
    zrok release --unique-name "$(basename "$PWD")"
    echo "Cleanup completed. Exiting."
    exit 0
}

# Trap SIGTERM and SIGINT signals
trap shutdown SIGTERM SIGINT

# Export UNIQUE_NAME for use in server.ts
export UNIQUE_NAME="$(basename "$PWD")"

# Start the Deno server in the background
deno run --allow-all --watch server.ts &
DENOPID=$!
echo "Deno server started with PID $DENOPID"

# Reserve the zrok tunnel in the background
zrok reserve public 80 --unique-name "$(basename "$PWD")" --backend-mode pro &
ZROKPID=$!
echo "zrok reserved with PID $ZROKPID"

# Wait for both background processes
wait $DENOPID
wait $ZROKPID
