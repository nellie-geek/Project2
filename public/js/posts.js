$(function () {

    $(".fa-heart").on("click", function(event) {
        event.preventDefault();
    })

    $(".tag-btn").on("click", function () {

            var tag = $(this).attr("id");
            if (tag === "ALL") {
                window.location = "/posts/all"
            } else {
            window.location = "/posts/tag/" + tag
        }
    });

})