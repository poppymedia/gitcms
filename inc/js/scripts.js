/* CMS-Generated Update January 14, 2015, 10:17 am */

 if ('querySelector' in document && 'addEventListener' in window) { document.getElementsByTagName('body')[0].className+=' js'; var links = document.links; var inputs = document.getElementsByTagName('input'); function hasClass(ele,cls) { return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); }; function addClass(ele,cls) { if (!this.hasClass(ele,cls)) ele.className += " "+cls; }; function removeClass(ele,cls){ if (hasClass(ele,cls)) { var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)'); ele.className=ele.className.replace(reg,' '); } }; function assignClickEvent(){ for(var i =0; i < links.length; i++){ links[i].onmousedown = findClick; } for(var i =0; i < inputs.length; i++){ inputs[i].onmousedown = findClick; } }; function findClick(e) { for(var i=0; i < links.length; i++){ links[i] == this ? addClass(links[i],'click') : removeClass(links[i],'click'); } for(var i=0; i < inputs.length; i++){ inputs[i] == this ? addClass(inputs[i],'click') : removeClass(inputs[i],'click'); } }; assignClickEvent(); }if(typeof(Shadowbox) !== 'undefined'){ Shadowbox.init({ overlayOpacity: 0.8 }, setupScripts); }; function setupScripts(){ Shadowbox.setup('a.gallery-group', { gallery: 'Gallery', continuous: true, counterType: 'skip' }); }; var marquee = new Array("<p data-date='1 Nov'>Full news item 4 article.</p>", "<p data-date='30 Oct'>News item 3 full text.</p>", "<p data-date='25 Oct'>News item 2 body copy.</p>", "<p data-date='22 Jul'>News item 1 full body copy.</p>"); var groupnum = 2; var groupreset = 0; var html = ""; var mystyle = ''; for (var i=0;i<marquee.length;i++){ if(groupreset == 0){ html += "<div class='group'" + mystyle + ">"; } groupreset++; html += "<blockquote id='slice" + i + "'>"; html += marquee[i]; html += "</blockquote>"; if(groupreset == groupnum){ html += "</div>"; groupreset = 0; } } document.getElementById("testimonials").innerHTML = html; var holder = document.getElementById("testimonials"); var element = 'div'; /* .class or data- or tag */ if(element.substring(0, 1) == "."){ divs = holder.getElementsByClassName(element.slice(1)); } else { divs = holder.getElementsByTagName(element); }; var total = divs.length; var duration = 500; /* fade duration in millisecond */ var hidetime = duration / 10; /* time to stay hidden (between fadeout and fadein) */ var showtime = 3000; /* time to stay visible */ var running = 0; /* Used to check if fade is running */ var iEcount = 0; /* Element Counter */ document.getElementsByClassName = function(cl) { var retnode = []; var myclass = new RegExp('\\b'+cl+'\\b'); var elem = this.getElementsByTagName('*'); for (var i = 0; i < elem.length; i++) { var classes = elem[i].className; if (myclass.test(classes)){ retnode.push(elem[i]); } } return retnode; }; function SetOpa(Opa) { holder.style.opacity = Opa; holder.style.MozOpacity = Opa; holder.style.KhtmlOpacity = Opa; holder.style.filter = 'alpha(opacity=' + (Opa * 100) + ');'; }; function StartFade() { if (running != 1) { running = 1; var i; for ( i = 0; i < total; i++ ) { if(i == 0){ divs[i].style.display = "block"; } else { divs[i].style.display = "none"; } } setTimeout("fadeOut()", showtime); } }; function fadeOut() { for (i = 0; i <= 1; i += 0.01) { setTimeout("SetOpa(" + (1 - i) +")", i * duration); } setTimeout("FadeIn()", (duration + hidetime)); }; function FadeIn() { for (i = 0; i <= 1; i += 0.01) { setTimeout("SetOpa(" + i +")", i * duration); } if (iEcount == total - 1) { iEcount = 0; for (i = 0; i < total; i++ ) { if(i == iEcount){ divs[iEcount].style.display = "block"; } else { divs[i].style.display = "none"; } } } else { for (i = 0; i < total; i++ ) { if(i == 0){ divs[iEcount + 1].style.display = "block"; } else { divs[iEcount].style.display = "none"; } } iEcount = iEcount+1; } setTimeout("fadeOut()", (duration + showtime)); }; StartFade(); 