#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ Please provide a commit message"
  echo 'Usage: ./gcommit.sh "your commit message"'
  exit 1
fi

git add .

git commit -m "$1"
