#!/bin/bash
BASEDIR=$(dirname "$0")

replace() {
    find=$1
    replace=$2
    filename=$3
    sed -i "" "s~$find~$replace~" $filename
}

deleteLineStartingWith() {
    sed "/^$1/d" "$2" > "$2.tmp"
    mv "$2.tmp" "$2"
}

insertAtFirstLine() {
    cat <(echo "$1") "$2" > "$2.tmp"
    mv "$2.tmp" "$2"
}

cp "$BASEDIR/Dockerfile.sample" "$BASEDIR/Dockerfile"

PS3='Choose your PHP version: '
versions=("PHP 7.4" "PHP 8.0")
select version in "${versions[@]}"; do
    case $version in
        "PHP 7.4")
            deleteLineStartingWith "FROM" "$BASEDIR/Dockerfile"
            insertAtFirstLine "FROM php:7.4-fpm" "$BASEDIR/Dockerfile"
            break
        # optionally call a function or run some code here
            ;;
        "PHP 8.0")
            deleteLineStartingWith "FROM" "$BASEDIR/Dockerfile"
            insertAtFirstLine "FROM php:8.0-fpm" "$BASEDIR/Dockerfile"
            break
        # optionally call a function or run some code here
            ;;
    esac
done

[ -d mysql_data ] || mkdir mysql_data

cp "$BASEDIR/Makefile.sample" "$BASEDIR/Makefile"
replace ":service" "${PWD##*/}" "$BASEDIR/Makefile"

cp "$BASEDIR/sample.env" "$BASEDIR/.env"

read -p "Nginx Port (default: 8888): " nginx_port
nginx_port=${nginx_port:-8888}
replace ":nginx_port" "$nginx_port" "$BASEDIR/.env"

read -p "Mysql Port (default: 3307): " mysql_port
mysql_port=${mysql_port:-3307}
replace ":mysql_port" "$mysql_port" "$BASEDIR/.env"

replace ":home_dir" "$HOME" "$BASEDIR/.env"

chmod -R +x  "$BASEDIR/recipes"