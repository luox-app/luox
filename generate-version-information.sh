#!/usr/bin/env bash
LATEST_TAG=`git tag --sort=-taggerdate | tail -n 1`
LATEST_SHA=`git rev-parse HEAD`
echo "{ \"latestTag\": \"$LATEST_TAG\", \"latestCommitSha\": \"$LATEST_SHA\" }" > src/version.json
