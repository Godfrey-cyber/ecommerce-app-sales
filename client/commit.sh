#!/bin/bash

MESSAGE=$1

if [ -z "$MESSAGE" ]; then
  echo "Error: Please provide a commit message"
  echo "Usage: ./commit.sh \"your message\" [file1 file2 ...]"
  exit 1
fi

shift  # Remove the message from args, leaving only files

if [ $# -eq 0 ]; then
  # No files specified — add everything
  git add .
  echo "Staged all changes"
else
  # Add specific files
  git add "$@"
  echo "Staged: $@"
fi

git commit -m "$MESSAGE"