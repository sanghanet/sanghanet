#!/usr/bin/env bash

echo Install post-checkout hooks to:
echo '    - syncCommonTypes'
echo '    - manage version data'
POST_CHECKOUT=.git/hooks/post-checkout
cat <<EOT > $POST_CHECKOUT
#!/bin/sh

./syncCommonTypes.sh

DATE=\`git show --no-patch --no-notes --date=short --pretty='%ad' HEAD\`
HASH=\`git show --no-patch --no-notes --pretty='%h' HEAD\`

cat <<EOT > client/src/version.ts
/*
 * Auto generated file, do not edit or commit to git!
 */

const version: Version = {
    date: '\$DATE',
    hash: '\$HASH'
};

export default version;
EOT

echo EOT >> $POST_CHECKOUT
chmod +x $POST_CHECKOUT
