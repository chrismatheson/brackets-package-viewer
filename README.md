[![Stories in Ready](https://badge.waffle.io/chrismatheson/brackets-package-viewer.png?label=ready&title=Ready)](https://waffle.io/chrismatheson/brackets-package-viewer)
#Package viewer - [Brackets](https://github.com/adobe/brackets) extension

tries to build a all encompising info page for the current directory tree parents.


###What is does

starting from a path ```./project/thing/whatever``` the following searches will be done & concatinated into a prettified information page.

**search's**
```
./project/readme.md
./project/readme.txt
./project/package.json
./project/bower.json
./project/thing/readme.md
./project/thing/readme.txt
./project/thing/package.json
./project/thing/bower.json
./project/thing/whatever/readme.md
./project/thing/whatever/readme.txt
./project/thing/whatever/package.json
./project/thing/whatever/bower.json
```

Markdown is rendered via the [github API](http://developer.github.com/v3/markdown/) which should provide links for issues & profiles etc.