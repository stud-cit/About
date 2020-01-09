#!/bin/bash

CONTAINER_HUB="docker.pkg.github.com";
REPOSITORY='stud-cit/about/server';

NEW_VERSION=$(npx -c 'echo "$npm_package_version"');
OLD_VERSION=$(npx -c 'echo "$npm_package_version"');
TYPE_VERSION=("major" "minor" "patch" "premajor" "preminor" "prepatch" "prerelease")

printf "Current repository: $REPOSITORY\n";
printf "Current version: $OLD_VERSION\n\n";

function select_option {
    ESC=$( printf "\033")

    cursor_blink_on() { printf "$ESC[?25h\n"; }
    cursor_blink_off() { printf "$ESC[?25l"; }
    cursor_to() { printf "$ESC[$1;${2:-1}H\n"; }
    print_option() { printf " -  $1 "; }
    print_selected() { printf "  $ESC[7m $1 $ESC[27m"; }
    get_cursor_row() { IFS=';' read -sdR -p $'\E[6n' ROW COL; echo ${ROW#*[}; }
    key_input() {
			read -s -n3 key 2>/dev/null >&2
      if [[ $key = $ESC[A ]]; then echo up; fi;
      if [[ $key = $ESC[B ]]; then echo down; fi;
      if [[ $key = ""     ]]; then echo enter; fi;
		}

    for opt; do printf "\n"; done
    local lastrow=`get_cursor_row`
    local startrow=$(($lastrow - $#))

    trap "cursor_blink_on; stty echo; printf '\n'; exit" 2
    cursor_blink_off

    local selected=0
    while true; do
      local idx=0
      for opt; do
        cursor_to $(($startrow + $idx))
        if [ $idx -eq $selected ]; then print_selected "$opt"
        else print_option "$opt"; fi
        ((idx++))
      done

      case `key_input` in
        enter) break;;
        up)    ((selected--));
        	if [ $selected -lt 0 ]; then selected=$(($# - 1)); fi;;
        down)  ((selected++));
          if [ $selected -ge $# ]; then selected=0; fi;;
      esac
    done

    cursor_to $lastrow;
    cursor_blink_on;

    return $selected;
}

printf "Select one option using up/down keys and enter to confirm:\n";
select_option "${TYPE_VERSION[@]}";

CHOICE=$?
NEW_VERSION=$(npm version ${TYPE_VERSION[$CHOICE]} --no-git-tag-version);

printf "Version changed $OLD_VERSION to $NEW_VERSION\n\n";
read -r -p "Are you sure? [Y/n] " input;

case $input in
  [yY][eE][sS]|[yY])
		printf "\n";
		docker image tag \
			"$CONTAINER_HUB/$REPOSITORY:latest" \
			"$CONTAINER_HUB/$REPOSITORY:$OLD_VERSION";
		docker build -t "$CONTAINER_HUB/$REPOSITORY:latest" .;
		docker push "$CONTAINER_HUB/$REPOSITORY:$OLD_VERSION";
		docker push "$CONTAINER_HUB/$REPOSITORY:latest";
	;;

	[nN][oO]|[nN])
		git checkout package*.json;
		printf "Version changed $NEW_VERSION to $OLD_VERSION\n";
	;;
  *) printf "Invalid input...";;
esac
