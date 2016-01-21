#!/bin/sh
BASEDIR=$(dirname $0)
echo "Enable git hooks..."
ln -sf ../../contrib/git/hooks/pre-commit $BASEDIR/../.git/hooks/pre-commit
echo "Hooks enabled."
echo
echo "Please enable editorconfig plugin in your IDE."
echo
echo "Please run below command manually:"
echo "    npm install -g eslint babel-eslint eslint-plugin-react"
