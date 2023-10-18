var score = localStorage.getItem("score");

//save new high score if the current score is higher than the current high score
if (localStorage.getItem("hiScore") < localStorage.getItem("score")) {
    hscore = score;
    localStorage.setItem("hiScore", hscore);
}
$(function() {
    $("#score").html("Score: " + localStorage.getItem("score"));
    $("#highscore").html("High Score: " + localStorage.getItem("hiScore"));
})
