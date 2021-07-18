#!/usr/bin/env bash

rm -rf client/src/types/*.common.d.ts
rm -rf server/src/types/*.common.d.ts

TYPES=`ls ./commonTypes`
for type in $TYPES
do
    typeName=${type%.d.ts}
    cp commonTypes/$type server/src/types/$typeName.common.d.ts
    cp commonTypes/$type client/src/types/$typeName.common.d.ts
done
