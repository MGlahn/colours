$(document).ready(function() {
    var colorField = $("#colour-field"),
        darkText = "black",
        lightText = "white",
        textToChange = $(".absolute-center p"),
        colourarray = new Array,
        circleArea = $('#circlearea');
    
    //localStorage.removeItem("selectedcolours");
    
    if(typeof localStorage["selectedcolours"] !== 'undefined' ){
        colourarray = JSON.parse(localStorage["selectedcolours"]);
        //console.log(localStorage["selectedcolours"]);
    }
    
    var getRandomColor = function(){
        var randomColor = '#'+ ('000000' + (Math.random()*0xFFFFFF<<0).toString(16)).slice(-6);
        return randomColor;
    }
    var isVaildHex = function(color){
        var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
        return isOk;
    }
    
    var setBg = function(color){
        $("body").css("background-color", color);
    }
    
    var setMode = function(mode){
        $("body").data("mode", mode);
    }
    
    //Function to check how bright the given color is.
    //http://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black?answertab=votes#tab-top
    var determineTextColor = function(color){
        var color = color.substring(1);      // strip #
        var rgb = parseInt(color, 16);   // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff;  // extract red
        var g = (rgb >>  8) & 0xff;  // extract green
        var b = (rgb >>  0) & 0xff;  // extract blue

        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

        if (luma > 180) {
            return darkText;
        }else {
            return lightText;
        }
    }
    
    var setAndShowField = function(color, mode, to){
        colorField.text(color);
        setMode(mode);
        $("#mode").text("To "+to);
    }
    
    var showHex = function(color){
        //setBg(color);
        colorField.text(color);
        setMode("hex");
        $("#mode").text("To rgb");
    }
    
    var changeColor = function(){
        var color = document.location.hash,
            valid = isVaildHex(color);
        if(color !== "" && valid){
            if($('#add').hasClass('hidden')) {
                $('#add').removeClass('hidden');
            }
            var mode = $("body").data("mode");
            setBg(color);
            if(mode === "hex"){
                showHex(color);
            }else{
                switchToRgb(color);
            }
            var textColor = determineTextColor(color);
            textToChange.css("color", textColor);
        }
    }
    

    
    //converting a hex color to rgb and returning a string like: 'rgb(23,24,25)'
    var convertHexToRgb = function(hexcolor){
        //See http://jsfiddle.net/mantisimo/qNp8C/
        var h=hexcolor.replace('#', '');
        h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));
        for(var i=0; i<h.length; i++){
            h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);
        }
        var rgb = 'rgb('+h.join(',')+')';
        return rgb;
    }
    
    //When switching from hex to rgb
    var switchToRgb = function(hexcolor){
        var rgbColor = convertHexToRgb(hexcolor);
        setAndShowField(rgbColor, "rgb", "hex");
    }
    
    //When switching from rgb to hex without changing the color
    var switchToHex = function(){
        var color = document.location.hash;  
        var valid = isVaildHex(color);
        if(color !== "" && valid){
            setAndShowField(color, "hex", "rgb");
        }
    }
    
    //Calling this function when switcher is pressed
    var switchMode = function(){
        var mode = $("body").data("mode");
        if(mode === "hex"){
            var color = colorField.text();
            switchToRgb(color);
        } else {
            switchToHex();
        }
    }
    
    var appendColourCircle = function(colour) {
        var circleHtml = '<span class="circle" data-circlecolour="'+colour+'" style="background:'+colour+';"></span>';
        circleArea.append(circleHtml);
        
    }
    //Events:
    
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
    $("#mode").click(function(){
        switchMode();
    });
    
    //Clicking btn to switch from hex to rgb or vice versa
    $("#add").click(function(){
        //console.log(colourarray);

        if(typeof(Storage) !== "undefined") {
            var colour = document.location.hash;
            if(colourarray.indexOf(colour) === -1){     
                colourarray.push(colour);
                localStorage["selectedcolours"] = JSON.stringify(colourarray);
                appendColourCircle(colour);
            }
            //console.log(colourarray);
        } else {
            console.log('not supported');

            // Sorry! No Web Storage support..
        }
    });
    
    //View page info:
    $("#info").click(function(){
        $("#contact").toggle("fast");
    });
    
    changeColor();
                console.log(colourarray);
});