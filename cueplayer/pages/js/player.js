'use strict'

const PATH = '../../CUES/';

let audioContext;

//give it a function which can use soundData, channelIndex, soundInChannelIndex (doesn't have to use them all)
function allSoundsIterator(iterator) {
  for (let lidx = 0; lidx < soundDataList.length; lidx++) {
    for (let idx = 0; idx < soundDataList[lidx].length; idx++) {
      iterator(soundDataList[lidx][idx], lidx, idx);
    }
  }
}

$(document).ready(function() {

  audioContext = new AudioContext();

  allSoundsIterator(function(soundData, channelIndex) {
    soundData.request = new XMLHttpRequest();
    soundData.hasLoaded = false;
    soundData.isPlaying = false;
    soundData.channelIndex = channelIndex;
    soundData.request.responseType = 'arraybuffer';
    soundData.request.open('GET', PATH + soundData.name, true);

    soundData.request.onload = function() {
      var undecodedAudio = soundData.request.response;
      audioContext.decodeAudioData(undecodedAudio, function(buffer) {
        soundData.rawBuffer = buffer;
        soundData.hasLoaded = true;

        $("#status").append("<br/>" + soundData.name);

        var allLoaded = true;

        allSoundsIterator(function(soundData) {
          if (!soundData.hasLoaded) {
            allLoaded = false;
          }
        });

        if (allLoaded) {
          allSoundsLoaded();
        }
      });
    }
    soundData.request.send();
  });

});



function allSoundsLoaded() {


  $("#status").html(document.title + `<p/><button type="button" class="btn btn-info" id="stopall">Stop All</button><p/>`);

  drawButtons();

  $(".audioButton").on('click', function() {
    toggleSound($(this).data('soundData'))
  })

  $("#stopall").on('click', function() {
    allSoundsIterator(function(soundData) {
      stopSound(soundData);

    });

  })

  $(".stopChannel").on('click', function() {
    var channelIndex = $(this).data('channelIndex');
    for (let idx = 0; idx < soundDataList[channelIndex].length; idx++) {
      stopSound(soundDataList[channelIndex][idx]);
    }
  })
}

function drawButtons() {

  for (let lidx = 0; lidx < soundDataList.length; lidx++) {
    var section = $(`<div class="col-md-12 text-center"></div>`);
    if (lidx % 2 == 0) {
      section.addClass('bg-warning');
    } else {
      section.addClass('bg-danger');
    }
    var channelLabelString = (channelLabels[lidx]) ? (channelLabels[lidx]) : defaultChannelPrefix + " #" + lidx;

    var channelLabel = $(`<h3>` + channelLabelString + `</h3>`);


    var stopChannelButton = $(`<button type="button" class="btn btn-info stopChannel">Stop Channel</button>`);
    stopChannelButton.data('channelIndex', lidx);

    section.append(channelLabel);
    section.append(stopChannelButton);
    section.append('<br/>');
    for (let idx = 0; idx < soundDataList[lidx].length; idx++) {
      var soundData = soundDataList[lidx][idx];
      var audioButton = $(`<button type="button" class="btn btn-primary audioButton"  />`);

      var label = soundData.label ? soundData.label : soundData.name;

      audioButton.append(`<span class="audioButtonText">` + label + `</span>`);
      if (soundData.isLoop) {
        audioButton.append(`<span class="glyphicon glyphicon-repeat"></span>`);
      } else if (lidx == 0) {
        //audioButton.append(`<span class="glyphicon glyphicon-music"></span>`);
      }

      audioButton.data('soundData', soundData);
      soundData.audioButton = audioButton;
      section.append(audioButton);
    }

    $("#audioButtons").append(section);
  }
}

function toggleSound(soundData) {
  if (soundData.isPlaying) {
    stopSound(soundData);

  } else {
    startSound(soundData);
  }

}

function stopSound(soundData) {
  if (soundData.isPlaying) {

    soundData.sourceBuffer.stop();

    soundData.audioButton.addClass('btn-primary');
    soundData.audioButton.removeClass('btn-success');

    soundData.isPlaying = false;
  }
}

function startSound(soundData) {

  if (!soundData.multiChannel) {
    allSoundsIterator(function(targetSoundData) {

      if (targetSoundData.channelIndex == soundData.channelIndex) {
        stopSound(targetSoundData);
      }
    });
  }

  soundData.sourceBuffer = audioContext.createBufferSource();
  if (soundData.isLoop) {
    soundData.sourceBuffer.loop = true;
  }

  soundData.sourceBuffer.buffer = soundData.rawBuffer;
  soundData.sourceBuffer.connect(audioContext.destination);

  soundData.sourceBuffer.onended = function() {
    stopSound(soundData);
  }

  soundData.sourceBuffer.start();

  soundData.audioButton.removeClass('btn-primary');
  soundData.audioButton.addClass('btn-success');

  soundData.isPlaying = true;
}
