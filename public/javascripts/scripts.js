window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backtotop").style.display = "block";
    } else {
        document.getElementById("backtotop").style.display = "none";
    }
}
function backtotop()
{ 
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
window.addEventListener('click', function(event){
    var links = [];
    // console.log(event.target,event.target.tagName);
    if(event.target.tagName == "A")
    {
        links = document.querySelectorAll(".navlink");
    }
    var reveal = event.target.getAttribute('reveal'); 
    // console.log(reveal);
    for(var i = 0; i < links.length; ++i)
    {
        // console.log(links[i], event.target);
        if(links[i] == event.target)
        {
            removeClass(links[i],"active");
            addClass(links[i],"active");
        }
        else{
            removeClass(links[i],"active");
        }
    } 
    if(reveal && links.length)
    { 
        hideAndReveal(reveal);
    }
}); 
 
function hideAndReveal(reveal)
{
    var elements = ["skills","works","contact"];
    for(var i=0; i<elements.length; ++i)
    {
        hide(document.getElementById(elements[i]));
    }
    // console.log(reveal); 
    show(document.getElementById(reveal));
}

function hide(element)  
{
    element.style.display = 'none';
}

function show(element)
{
    element.style.display = 'block';
}

function removeClass(element,classname)
{
    if(element.classList.contains(classname))
    {
        element.classList.remove(classname);
    }
}

function addClass(element, classname)
{
    if(!element.classList.contains(classname))
    {
        element.classList.add(classname); 
    }  
}

function changeBackground()
{
    var element = document.getElementById('custom_bg');
    var color = element.options[element.selectedIndex].value;
    document.body.style.backgroundColor = color;
    localStorage.setItem('bg',color);
    localStorage.setItem('index',element.selectedIndex);
    backtotop();
}

function mobile_menu()
{
    var element = document.getElementById('mobile_menu');
    var page = element.options[element.selectedIndex].value;
    var url = window.location.protocol + "//" + window.location.host + "/" + page;
    //console.log(url);
    window.location.replace(url);
    location.reload();
}

function rememberBG()
{
    var choosen_bg = localStorage.getItem('bg');
    if(choosen_bg)
    {
        var index = localStorage.getItem('index');
        index = parseInt(index);
        document.getElementById('custom_bg').getElementsByTagName('option')[index].selected = 'selected';
        document.body.style.backgroundColor = choosen_bg;
    }
    var form = document.getElementById('contact-form');
    if (form.attachEvent) {
        form.attachEvent("submit", processForm);
    } else {
        form.addEventListener("submit", processForm);
    }

    // load specific section from url
    var url = window.location.href;
    if(url.includes("#"))
    {
        var get = url.indexOf('#');
        get = url.substr(get+1,10);
        //console.log(get);
        if(get.length)
        {
            if(get == "resume")
            {
                
window.open("http://localhost:3001/resume/resume.pdf",'_blank');
            }
            else{
                hideAndReveal(get);
            }
            // set select option
            var opts = document.getElementById('mobile_menu').options;
            for (var opt, j = 0; opt = opts[j]; j++) {
                if (opt.value == get) {
                    document.getElementById('mobile_menu').selectedIndex = j;
                    break;
                }
            }
        }
    }
}

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var form_data = "name="+name+"&email="+email+"&message="+message;
    ajax_send(form_data);
    return false;
}

function ajax_send(data)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            console.log(xmlHttp.responseText);
        }
    }
    xmlHttp.open("post", "/contact",true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(data); 
}


