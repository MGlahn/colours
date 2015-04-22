$(document).ready(function() {
    var getRandomColor = function(){
        var randomColor = '#'+ ('000000' + (Math.random()*0xFFFFFF<<0).toString(16)).slice(-6);
        return randomColor;
    }
    var isVaildHex = function(color){
         var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
        console.log(color +' '+'ok?: '+ isOk);
        return isOk;
    }
    
    var setBg = function(color){
        $("body").css("background-color", color);
    }
    
    var setMode = function(mode){
        $("body").data("mode", mode);
    }
    
    
    var setAndShowField = function(){
    
    }
    
    var changeColor = function(){
        var color = document.location.hash,
            valid = isVaildHex(color);
        if(color !== "" && valid){
            var mode = $("body").data("mode");
            if(mode === "hex"){
                setBg(color);
                showHex(color);
            }else{
                setBg(color);
                switchToRgb(color);
            }
        }
    }
    
    var showHex = function(color){
        $("#rgb-colour-field").css("display", "none");
        $("#colour-field").css("display", "inline-block");
        setBg(color);
        $("#colour-field").text(color);
        setMode("hex");
        //$("body").data("mode", "hex");
        $("#mode").text("To rgb");

    }
    
    //converting a hex color to rgb and returning a string like: 'rgb(23,24,25)'
    var convertHexToRgb = function(hexcolor){
        //See http://jsfiddle.net/mantisimo/qNp8C/
        var h=hexcolor.replace('#', '');
        h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));
        for(var i=0; i<h.length; i++){
            h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);
        }
        return 'rgb('+h.join(',')+')';
    }
    
    //When switching from hex to rgb
    var switchToRgb = function(hexcolor){
        $("#colour-field").css("display", "none");
        var rgbColor = convertHexToRgb(hexcolor);
        $("#rgb-colour-field").text(rgbColor);
        $("#rgb-colour-field").show(); 
        setMode("rgb");

        $("#mode").text("To hex");
    }
    
    //When switching from rgb to hex without changing the color
    var switchToHex = function(){
        var color = document.location.hash;  
        var valid = isVaildHex(color);
        if(color !== "" && valid){
            $("#rgb-colour-field").css("display", "none");
            $("#colour-field").show();
            $("#colour-field").text(color);
            //$("body").data("mode", "hex");
            setMode("hex");

            $("#mode").text("To rgb");
        }
    }
    
    //Calling this function when switcher is pressed
    var switchMode = function(){
        var mode = $("body").data("mode");
        if(mode === "hex"){
            var color = $("#colour-field").text();
            switchToRgb(color);
        } else {
            switchToHex();
        }
    }
    
    //When hash change (new color is written in the hash)
    window.onhashchange = function(){
        changeColor();
    }
    
    //If space is pressed:
    $("body").keyup(function(e){
       if(e.keyCode == 32){
           // user has pressed space
           var color = getRandomColor(); 
           //Writes in the random color in the hash:
           document.location.hash = color;
       }
    });
    
    //Clicking btn to switch from hex to rgb or vice versa
    $("#switcher").click(function(){
        //console.log('switch');
        switchMode();
    });
    
    //View page info:
    $("#info").click(function(){
        $("#contact").toggle("fast");
    });
    
    changeColor();
    //switchMode();
});