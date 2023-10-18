class Button {
    // constructor for button, which has the html for the button and the audio connected to the button
    constructor(htmlItem, audio) {
        this._htmlItem = htmlItem;
        this._audio = audio;
    }

    //when playing audio, button is darkened and audio plays
    playAudio() {
        this._htmlItem.css("filter", "brightness(70%)");
        
        this._audio.play();
        
        setTimeout(() =>  {
            this._htmlItem.css("filter", "brightness(100%)");
        }, this._audio.duration * 1000);
            
    }

    //get the audio duration of the audio
    get audioDuration() {
        return this._audio.duration;
    }
}

var cNote = new Audio("C.mp3");
var dNote = new Audio("D.mp3");
var eNote = new Audio("E.mp3");
var gNote = new Audio("G.mp3");
var aNote = new Audio("A.mp3");


var playList = [];
var inputList = [];
var loopNum = 1;
$(function() {
    $("h3").hide()

    var buttonList = [new Button($('#c'), cNote), new Button($('#d'), dNote), new Button($('#e'), eNote), new Button($('#g'), gNote), new Button($('#a'), aNote)]
    
    //clicking corresponding buttons should play the button's sound and add it to the input list
    $('#c').on("click", function(){
        buttonList[0].playAudio();
        inputList.push(0);
    })
    $('#d').on("click", function(){
        buttonList[1].playAudio();
        inputList.push(1);
    })
    $('#e').on("click", function(){
        buttonList[2].playAudio();
        inputList.push(2);
    })
    $('#g').on("click", function(){
        buttonList[3].playAudio();
        inputList.push(3);
    })
    $('#a').on("click", function(){
        buttonList[4].playAudio();
        inputList.push(4);
    })

    $("h4").html("Press any key to start!");
    $("#buttonContainer").addClass("unclickable");
    $(document).on("keypress", nextRound);

    //
    function nextRound() {

        //add an random button to the next play cycle
        playList.push(Math.floor(Math.random() * 5));

        //the buttons should not be clickable while the computer is playing the play list
        $("#buttonContainer").addClass("unclickable");
        
        //playback of playlist
        for (var i = 0; i < playList.length; i++) {
            var index = playList[i];
            if (i >= 1) {
                delayButton(index, i);
            }  
            else {buttonList[index].playAudio();}
            
        }
        $("h4").html("Wait until computer is done.");
        setTimeout(() => {$("h4").html("Play!");}, totalDelay(playList.length));
        $("#buttonContainer").removeClass("unclickable");
        
        setTimeout(() => {
            playerTurn(playList.length);
          }, totalDelay(playList.length));

       /*
        buttonList[0].playAudio();
        setTimeout(() => {buttonList[1].playAudio();}, buttonList[0].audioDuration * 1000);
        setTimeout(() => {buttonList[2].playAudio();}, buttonList[1].audioDuration * 1000 + buttonList[0].audioDuration * 1000);
        */
        
      }


    var n = 0;

    //if player clicks any of the buttons, remaining taps goes down
    $('#buttonContainer').on("click", function(){
        const remainingTaps = playList.length - inputList.length;
        $("h4").html("Remaining taps: " + remainingTaps);
        
        //if player enters something that doesn't match play list, buttons are hidden and game ends
        if (playList.length > 0) {
            for (var i = 0; i < inputList.length; i++) {
                if (inputList[i] != playList[i]) {
                    $(".button").hide()
                    $("h4").html("GAME OVER");
                    localStorage.setItem("score", playList.length - 1);
                    $("h3").show()
                    return;
                }
            }
        }
        
        //if player ends up getting all button inputs right, 
        // clears input list, adds a pt to score, and goes to next round
        if (inputList.length >= playList.length) {
            $("h4").html("Good job!");
            $("p").html("Score: " + inputList.length);
            
            setTimeout(() =>  {nextRound()}, buttonList[playList[playList.length -1]].audioDuration * 1000 + 200);
            inputList = [];
        }
    
    });

    //calculates delay needed for total playback of buttons
    function totalDelay(c) {
        var t = 0
        for (var i = 0; i < c; i++) {
            t += buttonList[playList[i]].audioDuration;
        }
        return t * 1000 + 200;
    }

    //calculates delay needed for playback of one button
    function delayButton(index, state) {
        setTimeout(() => {
            buttonList[index].playAudio();
        }, totalDelay(state));
    }

    //once computer finishes playing the buttons, player can now click on buttons
    function playerTurn() {
        $(".button").removeClass("unclickable");
        //creates display shows how many more buttons player needs to tap
        $("h4").html("Remaining taps: " + playList.length);
    }


})
