//Display labels for channels. If not set, it'll be "Channel #N"
var channelLabels = ["Music", "Effects"];
var defaultChannelPrefix = "Scene"
  //Main document title for display purposes
document.title = 'Moshav Audio Player';

/*An array of arrays of objects

Parameters:

name (REQUIRED): name of the audio file in the CUES folder
isLoop (OPTIONAL): loop the audio playback for this clip
label (OPTIONAL): display name to override file name
multiChannel (OPTIONAL): if true, will not kill all other sounds in this channel
*/
var soundDataList = [
  [{
      name: 'music-intro.mp3',
      isLoop: true,
      label: "Reception",
      multiChannel: true
    },

    {
      name: 'heaven-choir.mp3',
      label: 'Heavenly Choir',
    },
    {
      name: 'beethoven.mp3',
      label: 'Beethoven',
    },
    {
      name: 'knockin-on-heavens-door.mp3',
      label: 'Knockin Heaven\'s Door'
    },
    {
      name: 'imperial-march.mp3',
      label: 'Imperial March'
    },
    {
      name: 'pink-panther.mp3',
      label: 'Pink Panther'
    },

    {
      name: 'cartoon_sneaky_sinister_music_piano_and_xylophone.mp3',
      label: 'Sneaky'
    }
  ],
  [{
    name: 'buzz.mp3',
    label: 'Buzz'
  }, {
    name: 'thunder_strong.mp3',
    label: 'Thunder'
  },
  {
   name: 'traffic.mp3',
   label: 'Traffic'
 },
{
 name: 'boing.mp3',
 label: 'boing'
},
{
 name: 'honk.mp3',
 label: 'Honk'
},
{
 name: 'air_whoosh.mp3',
 label: 'Whoosh'
},

{
 name: 'window_large_smash.mp3',
 label: 'Crash'
},

{
 name: 'fart.mp3',
 label: 'Fart'
},


]
];
