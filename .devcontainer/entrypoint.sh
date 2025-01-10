#!/bin/bash
# set -e

export NAME=$(head /dev/urandom | tr -dc '0-9' | head -c24)
echo "Generated NAME: $NAME"

# Function to handle shutdown
cleanup() {
    echo "Shutdown signal received. Executing cleanup..."
    #zrok release "$(basename "$PWD")"
    zrok release "$NAME"
    zrok disable # disable release also the name?
    echo "Cleanup completed. Exiting."
}

# Trap SIGTERM and SIGINT signals
trap cleanup SIGTERM SIGINT SIGKILL

# Load environment variables from .env if it exists
#if [ -f .env ]; then
#    export $(grep -v '^#' .env | xargs)
#fi

# Start the Deno server in the background
deno install --allow-scripts=npm:workerd@1.20241230.0,npm:esbuild@0.17.19
deno run --allow-all --watch server.ts &
DENOPID=$!
echo "Deno server started"

# Export UNIQUE_NAME for use in server.ts
export UNIQUE_NAME="$(basename "$PWD")"

# Enable zrok
zrok enable "$ZROK_TOKEN"
echo "zrok enabled successfully."

# Reserve the zrok tunnel in the background
#zrok reserve public localhost:3001 --unique-name "$(basename "$PWD")" --backend-mode proxy &
zrok reserve public localhost:3001 --unique-name "$NAME" --backend-mode proxy
ZROKPID=$!
echo "Zrok reserved"
echo "Using UNIQUE_NAME: $UNIQUE_NAME"

# Wait for both background processes
#wait $DENOPID &
#DENOWAITPID=$!
#wait $ZROKPID &
#ZROKWAITPID=$!

# Wait for any process to exit
wait -n

# If any process exits, perform cleanup
cleanup
