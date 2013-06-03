#!/usr/bin/env bash

PWD=`pwd`
project=$1

ver=`cat package.json | json version`
cd $project

cat package.json | json -e "this.dependencies['grunt-handlebars-seajs'] = \"=$ver\"" > package.json.tmp
echo "New package.json look likes:"
cat package.json.tmp
echo -n "Is ok for you? (no): "
read ret
if [[ "$ret" != "yes" ]]; then
    rm package.json.tmp
    cd $PWD
    exit 0
fi

mv package.json.tmp package.json
git commit -m "MOD: upgrade grunt-handlebars-seajs#$ver" -- package.json
cd $PWD
