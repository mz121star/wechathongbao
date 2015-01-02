$(function(){
    $(".main-box").css({"width":$(window).width() +"px" });
    var w=($(window).width()-$("#mcover .zhongjiangtip").width())/2 ;
    $("#mcover .zhongjiangtip").css({"left":w}).show() ;
    $(".main-box").css("top",($(window).height()-478)/3+"px")   ;
    $("#shape").css("top",($(window).height()-478)/3+420+"px")    ;

})