#!/bin/sh
echo "Remove static Content"
if [ -d "canooradio-server/src/main/resources/static" ]; then
    rm -r canooradio-server/src/main/resources/static
fi