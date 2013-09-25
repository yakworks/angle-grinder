#!/bin/bash

SERVER_PORT=8000

# start the backend server and wait till it's fully operational
PORT="$SERVER_PORT" ./node_modules/nodemon/nodemon.js server/index.coffee --watch server &
while ! nc -vz localhost "$SERVER_PORT" &> /dev/null; do
  echo "Waiting for the backend server..."
  sleep 0.250
done

echo "Backend server is fully operational!"

# grab the PID
SERVER_PID=$!

# run the frontend server
grunt server --force

# kill the backend server
kill -9 "$SERVER_PID"
