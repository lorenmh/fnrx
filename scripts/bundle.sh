#!/bin/bash

set -o errexit

BUNDLER=./node_modules/.bin/browserify
ROOT=./src/js/root
DEST=./dist/js

for infile in $ROOT/*.js
do
  filepath="${infile%.js}"
  filename=$(basename $filepath)
  outfile="$DEST/$filename.js"

  echo "$infile -> $outfile"

  $BUNDLER -e $infile -o $outfile
done

exit 0
