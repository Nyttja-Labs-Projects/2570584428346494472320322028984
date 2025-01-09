#!/bin/bash

# Load environment variables from .env if it exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

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

# Enable zrok
echo "Enabling zrok..."
zrok enable --token "$ZROK_TOKEN"
ENABLE_STATUS=$?

if [ $ENABLE_STATUS -ne 0 ]; then
    echo "Failed to enable zrok. Exiting."
    exit 1
fi
echo "zrok enabled successfully."

# Start the Deno server in the background
deno run --allow-all --watch server.ts &
DENOPID=$!
echo "Deno server started with PID $DENOPID"

# Reserve the zrok tunnel in the background
zrok reserve public localhost:3001 --unique-name "$(basename "$PWD")" --backend-mode proxy &
ZROKPID=$!
echo "Zrok reserved with PID: $ZROKPID"
echo "Using UNIQUE_NAME: $UNIQUE_NAME"

# Wait for both background processes
wait $DENOPID
wait $ZROKPID
