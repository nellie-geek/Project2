$(function () {

    $(".fa-heart").on("click", function(event) {
        event.preventDefault();

        
    })

    $(".all").hide();

    $(".tag-btn").on("click", function () {

            var tag = $(this).attr("id");
            console.log(tag)
            if (tag === "ALL") {
                $(".all").show();
            } else {
                $(".all").hide();
                $("." + tag).show();
            }
       
    });
})