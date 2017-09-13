$(function() {

    $("#explore-nav li a").click(function() {
        
        // Figure out current list via CSS class
        var curList = $("#explore-nav li a.current").attr("rel");
        
        // List moving to
        var $newList = $(this);
        
        // Set outer wrapper height to height of current inner list
        var curListHeight = $("#all-list-wrap").height();
        $("#all-list-wrap").height(curListHeight);
        
        // Remove highlighting - Add to just-clicked tab
        $("#explore-nav li a").removeClass("current");
        $newList.addClass("current");
        
        // Figure out ID of new list
        var listID = $newList.attr("rel");
        
        if (listID != curList) {
            
            // Fade out current list
            $("#"+curList).fadeOut(300, function() {
                
                // Fade in new list on callback
                $("#"+listID).fadeIn();
                
                // Adjust outer wrapper to fit new list snuggly
                var newHeight = $("#"+listID).height();
                $("#all-list-wrap").animate({
                    height: newHeight
                });
            
            });
            
        }        
        
        // Don't behave like a regular link
        return false;
    });

});