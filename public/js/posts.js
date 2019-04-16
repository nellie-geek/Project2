$(document).ready(function () {



    $(".tag-btn").on("click", function () {


            var tag = $(this).attr("id");

            $.get("/api/posts/" + tag, function (data) {

                res.render("posts", data);

            });









});