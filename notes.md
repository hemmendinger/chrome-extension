## anti-copy hijack ideas
try adding ctrl-c as extension specific command in manifest
	have background attempt to write to the clipboard
	http://developer.chrome.com/extensions/commands.html

## check 
If copy event listener is only being added on the active tab whenn the option is enabled.


## saving a copy of the selection
such as on CTRL or right-click,
and comparing it after a copy event,
can see if the start matches, etc