#!/usr/bin/env bash

echo Install post-checkout hook to manage version data

POST_CHECKOUT=.git/hooks/post-checkout

cat <<EOT > $POST_CHECKOUT
#!/bin/sh

DATE=\`git show --no-patch --no-notes --date=short --pretty='%ad' HEAD\`
HASH=\`git show --no-patch --no-notes --pretty='%h' HEAD\`

cat <<EOT > client/src/version.js
/*
 * Auto generated file, do not edit or commit to git!
 */
const version = {
    date: '\$DATE',
    hash: '\$HASH'
};

export default version;
EOT

chmod +x $POST_CHECKOUT
