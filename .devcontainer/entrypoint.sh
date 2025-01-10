#!/bin/bash
set -e

# Function to handle shutdown
cleanup() {
    echo "Shutdown signal received. Executing cleanup..."
    # Release the zrok tunnel
    zrok release "$(basename "$PWD")"
    zrok disable
    echo "Cleanup completed. Exiting."
    exit 0
}

# Trap SIGTERM and SIGINT signals
trap cleanup SIGTERM SIGINT

# Load environment variables from .env if it exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Export UNIQUE_NAME for use in server.ts
export UNIQUE_NAME="$(basename "$PWD")"

# Enable zrok
echo "Enabling zrok..."
zrok enable "$ZROK_TOKEN"
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
wait $DENOPID &
DENOWAITPID=$!
wait $ZROKPID &
ZROKWAITPID=$!

# Wait for any process to exit
wait -n

# If any process exits, perform cleanup
cleanup
