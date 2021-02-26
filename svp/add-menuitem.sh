#!/bin/bash

SVP4_BIN=`dirname "$0"`

CUR_DIR=`pwd`
cd "${SVP4_BIN}"
SVP4_BIN=`pwd`
cd "${CUR_DIR}"

ICON_NAME=svp-manager4
TMP_DIR=`mktemp --directory`
DESKTOP_FILE=$TMP_DIR/svp-manager4.desktop
cat << EOF > $DESKTOP_FILE
[Desktop Entry]
Version=1.0
Encoding=UTF-8
Name=SVP 4 Linux
GenericName=Real time frame interpolation
Type=Application
Categories=Multimedia;AudioVideo;Player;Video;
MimeType=video/x-msvideo;video/x-matroska;video/webm;video/mpeg;video/mp4;
Terminal=false
StartupNotify=true
Exec="$SVP4_BIN/SVPManager" %f
Icon=$ICON_NAME.png
EOF

xdg-desktop-menu install $DESKTOP_FILE
xdg-icon-resource install --size  32 "$SVP4_BIN/svp-manager4-32.png"  $ICON_NAME
xdg-icon-resource install --size  48 "$SVP4_BIN/svp-manager4-48.png"  $ICON_NAME
xdg-icon-resource install --size  64 "$SVP4_BIN/svp-manager4-64.png"  $ICON_NAME
xdg-icon-resource install --size 128 "$SVP4_BIN/svp-manager4-128.png" $ICON_NAME

rm $DESKTOP_FILE
rm -R $TMP_DIR
