
var script_loaded = false; 
   
    function loadJSscripts() 
    {
        if(script_loaded) return;
        else
        { 
            script_loaded = true; 
            var static_script = document.getElementsByTagName("script");
            for (i = 0; i <static_script.length; i++) {
                if(static_script[i].getAttribute("data-src") !== null){
                    
                    static_script[i].setAttribute("src",static_script[i].getAttribute("data-src"));
                    delete static_script[i].dataset.src;
                 }
	  if (static_script[i].getAttribute("type") == "lazyloadscript") {
                var s = document.createElement("script");
                for (var i2 = 0; i2 < static_script[i].attributes.length; i2++) {
                    var attrib = static_script[i].attributes[i2];
                    s.setAttribute(attrib.name, attrib.value);
                }
                s["type"] = "text/javascript";
                s.innerHTML = static_script[i].innerHTML;
                static_script[i].parentNode.removeChild(static_script[i]);
                static_script[i].parentNode.insertBefore(s, static_script[i]);
// static_script[i].setAttribute("type", "text/javascript");
            }
            }
              var static_css = document.getElementsByTagName("link");
            for (i = 0; i <static_css.length; i++) { 
                if(static_css[i].getAttribute("data-href") !== null){ 
				  static_css[i].setAttribute("href",static_css[i].getAttribute("data-href"));
                 delete static_css[i].dataset.href;       
                }
            }
        document.dispatchEvent(new CustomEvent('StartKernelLoading')); 
 setTimeout(function() {
            document.dispatchEvent(new CustomEvent('StartAsyncLoading'));
        }, 400);
 
            setTimeout(function() {
              let lazyVideos = [...document.querySelectorAll('.lazy-frame')];
              lazyVideos.forEach(video => {
                  video.src = video.dataset.src;
                   video.classList.remove("lazy-frame");
            })
            }, 200); 
          

        }
    }

    window.addEventListener("scroll", function(event){
        loadJSscripts();
    });

    window.addEventListener("mousemove", function(){
        loadJSscripts();
    });

    window.addEventListener("touchstart", function(){
        loadJSscripts();
    });

    if (window.addEventListener) window.addEventListener("load", function(){setTimeout(loadJSscripts, 7000)}, false);
    else if (window.attachEvent) window.attachEvent("onload", function(){setTimeout(loadJSscripts, 7000)});
    else window.onload = loadJSscripts;