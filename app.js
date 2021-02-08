var express = require("express");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let artistArray = [
  {
    id: 1,
    name: "Kanye",
    albumsArray: [
      {
        id: 1,
        name: "The coding dropout",
      },
    ],
    topSongs: [
      {
        id: 1,
        name: "The Javascript State of Mind",
      },
    ],
  },
  {
    id: 2,
    name: "Chris Brown",
    albumsArray: [
      {
        id: 1,
        name: "The Greatest Algorithm",
      },
    ],
    topSongs: [
      {
        id: 1,
        name: "Wheel on the bus",
      },
    ],
  },
];

function checkIfExists(req, res) {
  let found = false;
  artistArray.forEach((item) => {
    if (item.id === Number(req.params.artistID)) {
      found = true;
    }
  });
  if (found) {
    res.status(200).send(`found`);
  } else {
    res.status(404).send(`Sorry the artist you are looking for does not exist`);
  }
}
console.log(checkIfExists)


  
  app.get("/artist", function (req, res) {
    console.log(req.query);
    res.status(200).json({
      artistArray,
      query: req.query,
    });
  
  });
  console.log(JSON.stringify(artistArray));

  app.get("/artist/:artistID", function (req, res) {
    let targetArtist = null;
    let artistIDNumber = Number(req.params.artistID);
  
    artistArray.forEach((artist) => {
      if (artist.id === artistIDNumber) {
        targetArtist = artist;
      }
    });
    if (!targetArtist) {
      return res.status(404).send("Sorry, that artist does not exist!");
    }
  
    res.status(200).json({
      artist: targetArtist,
      
    });
  
  });

  app.get("/artist/:artistID/:albumID", function (req, res) {
    let result = checkIfExists
    let artistID = Number(req.params.artistID);
    let albumID = Number(req.params.albumID);
  
      artistArray.forEach((artist) => {
        if (artist.id === artistID) {
          artist.albumsArray.forEach((album) => {
            if(album.id === albumID) {
              result = album.name;
            }
          }) 
        }
      });
      res.status(200).json({
        result,
      });
      
    });

  app.get("/artist/:artistID/:albumID/:songID", function(req, res) {
    let result = checkIfExists
    let artistID = Number(req.params.artistID);
    let songID = Number(req.params.albumID);

  artistArray.forEach((artist) => {
    if (artist.id === artistID) {
      artist.topSongs.forEach((song) => {
        if (song.id === songID) {
          result = song.name;
        }
      })
    }
  })
  res.status(200).json({
    result,
  });
});

app.post("/add-artist/:artistID", function (req, res) {
  let artistIDNumber = Number(req.params.artistID);

  artistArray.forEach((artist) => {
    if (artist.id !== artistIDNumber) {
      artistArray.push(req.body);
      return;
        }
      });
  res.status(200).json({
    artistArray,
  });
});

app.put("/edit-artist/:artistID", function(req, res) {
  let artistID = Number(req.params.artistID);
  let artistIndex;
  let obj = {};

  artistArray.forEach((artist, index) => {
    if(artist.id === artistID) {
      obj = {...artist, ...req.body}
      artistIndex = index;
    }
  })

  artistArray[artistIndex] = obj;
  res.status(200).json({
    artistArray
  })
  console.log(JSON.stringify(artistArray))
});

app.listen(3000, () => {
  console.log("STARTED");
});
