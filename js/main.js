$(document).ready(function() {
    $("body").keyup(function(e){
       if(e.keyCode == 32){
           // user has pressed space
           var color = getRandomColor();           
           document.location.hash = color;
           $("#switcher").css("display", "inline-block");
       }
    });
    
    var getRandomColor = function(){
        var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        return randomColor;
    }
    var isVaildHex = function(color){
         var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
         console.log(isOk);
        return isOk;
    }
    var changeColor = function(){
        var color = document.location.hash;  
        console.log(color);
        var valid = isVaildHex(color);
        if(color !== "" && valid){
            $("#rgb-colour-field").css("display", "none");
            $("#colour-field").css("display", "inline-block");
            $("body").css("background-color", color);
            $("#colour-field").text(color);
        }
    }
    
    window.onhashchange = function(){
        changeColor();
    }
    var switchToRgb = function(color){
        $("#colour-field").css("display", "none");
        $("#rgb-colour-field").css("display", "inline-block");
        $("#rgb-colour-field").text("rgb(255,255,255)");

    }
    
    var switchToHex = function(){
        var color = document.location.hash;  
        var valid = isVaildHex(color);
        if(color !== "" && valid){
                        $("#rgb-colour-field").css("display", "none");
            $("#colour-field").css("display", "inline-block");
            $("#colour-field").text(color);
        }
    }
    
    $("#switcher").click(function(){
        var mode = $("body").data("mode");
        if(mode === "hex"){
            $("body").data("mode", "rgb");
            var color = $("#colour-field").text();
            $("#mode").text("hex");
            switchToRgb(color);
        } else {
            $("body").data("mode", "hex");
            $("#mode").text("rgb");
            switchToHex();
        }
    });
    
    $("#info").click(function(){
//        if($("#contact").is(':visible')){
            $("#contact").toggle("fast");
//        }else {
//            $("#contact").show('fast');
//        }
    });
    changeColor();
});