#!/usr/bin/env bash

CHECK_IMPORTS_FAILED=false

function forbidden_ts() {
    if grep --color --include=\*.ts --exclude=\*.spec.ts -E "$2" "$1" -R; then
        echo [FAIL-TS] path \""$1"\" should not contain imports from \""$2"\"
        CHECK_IMPORTS_FAILED=true
    fi
}

# Should not import entities in migrations
forbidden_ts ./src/migration "import.*\.\.\/entity"

# EXIT
if [ $CHECK_IMPORTS_FAILED = true ]; then
    exit 1
else
    exit 0
fi
