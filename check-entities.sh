#!/usr/bin/env bash
CHECK_ENTITIES_FAILED=false

function check-entity() {
  grepOutput=`grep '@Entity(' $1`
  grepExitCode=$?
  if [ $grepExitCode -ne 0 ]; then
      echo [FAIL-TS] path \""$1"\" is missing @Entity annotation
      CHECK_ENTITIES_FAILED=true
  fi
}

# Every file with @Column annotation should have @Entity annotation
for i in $(grep -lRnw './src' -e '@Column('); do
    check-entity $i
done

# EXIT
if [ $CHECK_ENTITIES_FAILED = true ]; then
    exit 1
else
    exit 0
fi
