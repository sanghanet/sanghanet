#!/usr/bin/env bash

MSG="\nDeveloper's stat on MASTER\nIf you want ALL branch included in the calculation, use 'stat.sh -a'\n"
BRANCH="master"

if [[ $1 == "-a" ]]; then
    MSG="\nDeveloper's stat on ALL branches\n"
    BRANCH="--all"
fi

# All users on all branches
#$ git shortlog -sne --all

git config --global grep.extendedRegexp true
echo -e $MSG
echo -e "Benji:  \t" `git log $BRANCH --author="JoBenjamin|Benjamin Jozsa|Benjámin Józsa" --all --pretty=tformat: --numstat | gawk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s removed lines: %s total lines: %s\n", add, subs, loc }' -`
echo -e "Ildi:   \t" `git log $BRANCH --author="Ildiko Rigo|ldikoRigo" --pretty=tformat: --numstat | gawk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s removed lines: %s total lines: %s\n", add, subs, loc }' -`
echo -e "Julia:  \t" `git log $BRANCH --author="Julia Ballo" --pretty=tformat: --numstat | gawk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s removed lines: %s total lines: %s\n", add, subs, loc }' -`
echo -e "Kristof:\t" `git log $BRANCH --author="nalesnyik|Kristóf Nalesnyik|Kristóf|Kristof Nalesnyik" --all --pretty=tformat: --numstat | gawk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s removed lines: %s total lines: %s\n", add, subs, loc }' -`
echo -e "Misu:   \t" `git log $BRANCH --author="Misu Ballo|Miklos Ballo|Miklós Balló" --all --pretty=tformat: --numstat | gawk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s removed lines: %s total lines: %s\n", add, subs, loc }' -`
echo -e "Spartan:\t" `git log $BRANCH --author="Spartan|DenesDanko|Denes Danko" --pretty=tformat: --numstat | gawk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s removed lines: %s total lines: %s\n", add, subs, loc }' -`
