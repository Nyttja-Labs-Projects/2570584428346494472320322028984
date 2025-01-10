#!/bin/bash

export REPO_NAME=$(basename "$PWD")

cleanup() {
    echo "Shutdown signal received. Executing cleanup..."
    
    # Terminate Deno server if running
    # if kill -0 "$DENOPID" 2>/dev/null; then
    #     echo "Terminating Deno server (PID $DENOPID)..."
    #     kill "$DENOPID"
    #     wait "$DENOPID" || true
    # fi

    # # Terminate zrok reserve if running
    # if kill -0 "$ZROKPID" 2>/dev/null; then
    #     echo "Terminating zrok reserve (PID $ZROKPID)..."
    #     kill "$ZROKPID"
    #     wait "$ZROKPID" || true
    # fi

    # # Release the zrok tunnel
    # echo "Releasing zrok tunnel..."
    # if zrok release "$REPO_NAME"; then
    #     echo "Zrok tunnel released successfully."
    # else
    #     echo "Failed to release zrok tunnel."
    # fi

    # # Disable zrok
    # echo "Disabling zrok..."
    # if zrok disable "$REPO_NAME"; then
    #     echo "Zrok disabled successfully."
    # else
    #     echo "Failed to disable zrok."
    # fi

    # echo "Cleanup completed. Exiting."
    # exit 0
}

# Trap SIGTERM and SIGINT signals
trap cleanup SIGTERM SIGINT SIGKILL

kill -9 $(lsof -ti:3001)
deno run --allow-all server.ts &
echo "[+]: Deno server started."

# ====================================
#zrok disable
zrok enable "$ZROK_TOKEN" --headless --description "$REPO_NAME"
#zrok release "$REPO_NAME" 
echo "[+]: Zrok enabled successfully"
zrok reserve public localhost:3001 --unique-name "$REPO_NAME" backend-mode proxy
echo "[+]: Zrok tunnel: '$REPO_NAME' reserved with PID: $ZROKPID."


# Wait for any background process to exit
wait -n

# If any process exits, perform cleanup
# cleanup