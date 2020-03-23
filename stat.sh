#!/usr/bin/env bash

echo -e "\nDeveloper's stat\n"
echo -e "Benji:  \t" `git log --author="JoBenjamin" --pretty=tformat: --numstat | gawk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s removed lines: %s total lines: %s\n", add, subs, loc }' -`
echo -e "Ildi:   \t" `git log --author="Ildiko Rigo" --pretty=tformat: --numstat | gawk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s removed lines: %s total lines: %s\n", add, subs, loc }' -`
echo -e "Misu:   \t" `git log --author="Misu Ballo" --pretty=tformat: --numstat | gawk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s removed lines: %s total lines: %s\n", add, subs, loc }' -`
echo -e "Spartan:\t" `git log --author="Spartan" --pretty=tformat: --numstat | gawk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s removed lines: %s total lines: %s\n", add, subs, loc }' -`
