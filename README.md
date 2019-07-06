# whichbeatle-web
## My whichbeatle program, ported to html/css/js

*If you haven't checked it out yet, I'd recommend going over to [jrgermain/whichbeatle](https://github.com/jrgermain/whichbeatle) for some context.*

This webpage will find the writer, singer, and/or album appearances of any Beatles song. Originally, I made a command-line Java program, but I figured a website would be more user-friendly. So now I'm bringing whichbeatle to the masses!

## The making of whichbeatle-web

My philosophy for this port of whichbeatle was to avoid over-engineering and make the web version clean and javascript-y instead of retrofitting my old code. This basically led to a complete re-write, which involved dumping SQLite for JSON, and keeping libraries/frameworks to a minimum, but still using them when it led to simpler code.
