function openNav(){
    document.getElementById("mySidebar").style.width = "250px";
}

function closeNav(){
    document.getElementById("mySidebar").style.width = "0";
}

function testStyleChange(event){
        
        var parent = event.target.parentNode;
        var element = parent.querySelector('.sub-menu');
        
        var style = window.getComputedStyle(element);
        //top = style.getPropertyValue('top');
        var display = style.getPropertyValue('display');
        
        if(display == "block"){
            element.style.display = "none";
        }
        else if(display == "none"){
            element.style.display = "block"
        }
        
        // for (let i = 0; i < parent.children.length; i++) {
        //     console.log(parent.children[i].tagName);
        // //parent.querySelector('.sub-menu').classList.toggle("show");
        // }
}