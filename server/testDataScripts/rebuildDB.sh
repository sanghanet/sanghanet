#!/usr/bin/env bash

if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    echo "For local action, write: $0 local"
    echo "For atlas action, write: $0 atlas"
    exit
fi

if [[ $1 == "atlas" ]]; then
    echo "Are you sure you would like to DESTROY and RESET the deployment database? (y/n):"
    read answer
    case $answer in
        "y"|"Y" )
            echo "Starting to rebuild the atlas DB..."
            ;;
        "n"|"N" )
            exit
            ;;
        * )
            echo "The answer is invalid"
            exit
            ;;
    esac
fi

export NODE_ENV=$1
node ./dbReset
node ./generateFinanceAccounts.js
