#!/bin/sh

#
# 使用方法
# mmall : front_deploy.sh mmall-fe
# admin : front_deploy.sh admin-fe
# 

GIT_HOME=/developer/git-repository/
DEST_PATH=/product/frontend/

#cd dir
if [ ! -n "$1"];
    then
    echo -e "请输入要发布的项目！"
    exit
fi

if [ $1 = "mmall-fe"];
    then
    echo -e "==================Enter mmall-fe==================="
    cd $GIT_HOME$1

elif [$1 = "admin-fe"];
    then 
    echo -e "==================Enter admin-fe==================="
    cd $GIT_HOME$1

else
    echo -e "输入的项目名没有找到！"
    exit
fi

#clear git dist
echo -e "==================Clear Git Dist==================="
rm -rf ./dist

#git 操作
echo -e "==================git checkout master==================="
git checkout master

echo -e "==================git pull==================="

#npm install
echo -e "==================npm install==================="
npm install --registry=https://registry.npm.taobao.org

#npm run dist
echo -e "==================npm run dist==================="
npm run dist

if [ -d "./dist" ];
    then 
    #backup dist 备份dist
    echo -e "==================dist backup==================="
    mv $DEST_PATH$1/dist $DEST_PATH$1/disk.bak

    #copy
    echo -e "==================copy==================="
    cp -R ./dist $DEST_PATH$1

    # echo result
    echo -e "==================Deploy success==================="
else
    echo -e "==================npm install==================="
fi