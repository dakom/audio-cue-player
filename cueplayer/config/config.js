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
      isLoop: true,
      multiChannel: true
    }, {
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
    },

    {
      name: 'psycho.mp3',
      label: 'Psycho'
    },
  ],
  [{
    name: 'electricity_high_voltage_spark.mp3',
    label: 'Electric Hit'
  }, {
    name: 'thunder_strong.mp3',
    label: 'thunder'
  },
  {
   name: 'traffic.mp3',
   label: 'traffic'
 },
 {
  name: 'clapping.mp3',
  label: 'clapping'
},
{
 name: 'boing.mp3',
 label: 'boing'
},
{
 name: 'honk.mp3',
 label: 'honk'
},
{
 name: 'air_whoosh.mp3',
 label: 'Whoosh'
},
{
 name: 'car_interior_spritzer_cleaning.mp3',
 label: 'Spray'
},

{
 name: 'rubbing_polishing_surface_with_cloth.mp3',
 label: 'Cleaning'
},

{
 name: 'window_large_smash.mp3',
 label: 'Crash'
},



]
];
