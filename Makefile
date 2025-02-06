clean:
	ls .git >/dev/null 2>&1 && git clean -xfd && git reset HEAD --hard
build: clean
	bash ehome-build.sh
