//Display labels for channels. If not set, it'll be "Channel #N"
var channelLabels = ["Music", "Effects"];

//Main document title for display purposes
document.title = 'Moshav Audio Player';

/*An array of arrays of objects

Parameters:

name (REQUIRED): name of the audio file in the CUES folder
isLoop (OPTIONAL): loop the audio playback for this clip
label (OPTIONAL): display name to override file name
*/
var soundDataList = [
  [{
    name: 'clapping.mp3',
    isLoop: true,
  }, {
    name: 'cartoon_sneaky_sinister_music_piano_and_xylophone.mp3',
    label: "Sneak Up"
  }],

  [{
    name: 'cartoon_character_climb_stairs_or_ladder.mp3'
  }, {
    name: 'cartoon_boing_or_spring_jaw_harp_.mp3',
    isLoop: true,
  }],

  [{
    name: 'clapping.mp3',
    isLoop: true,
  }, {
    name: 'cartoon_sneaky_sinister_music_piano_and_xylophone.mp3',
    label: "Sneak Up"
  }],

  [{
    name: 'cartoon_character_climb_stairs_or_ladder.mp3'
  }, {
    name: 'cartoon_boing_or_spring_jaw_harp_.mp3',
    isLoop: true,
  }]
];
