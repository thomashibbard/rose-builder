/* ROSETTA OBJECTS FOR 160x600 BANNER*/

var cat_wallpaper = R.create("div").set({
    css: {
        top: 0,
        left: 0,
        width: 1222,
        height: 917,
        backgroundImage: "Cat-Wallpaper.jpg",
        cursor: "pointer",
        opacity: 1,
        backgroundScale: "cover"
    },
    attr: {
        id: "cat_wallpaper"
    },
    rosetta: {
        parentNode: stage,
        directoryType: "size"
    }
}).render();

var evergreen = R.create("div").set({
    css: {
        top: 0,
        left: 0,
        width: 160,
        height: 600,
        backgroundImage: "evergreen.gif",
        cursor: "pointer",
        opacity: 1,
        backgroundScale: "cover"
    },
    attr: {
        id: "evergreen"
    },
    rosetta: {
        parentNode: stage,
        directoryType: "size"
    }
}).render();

var legal = R.create("div").set({
    css: {
        top: 0,
        left: 0,
        width: 159,
        height: 24,
        backgroundImage: "legal.png",
        cursor: "pointer",
        opacity: 1,
        backgroundScale: "cover"
    },
    attr: {
        id: "legal"
    },
    rosetta: {
        parentNode: stage,
        directoryType: "size"
    }
}).render();

var bottle = R.create("div").set({
    css: {
        top: 0,
        left: 0,
        width: 78,
        height: 308,
        backgroundImage: "bottle.png",
        cursor: "pointer",
        opacity: 1,
        backgroundScale: "cover"
    },
    attr: {
        id: "bottle"
    },
    rosetta: {
        parentNode: stage,
        directoryType: "size"
    }
}).render();

var pic1 = R.create("div").set({
    css: {
        top: 0,
        left: 0,
        width: 160,
        height: 600,
        backgroundImage: "pic1.jpg",
        cursor: "pointer",
        opacity: 1,
        backgroundScale: "cover"
    },
    attr: {
        id: "pic1"
    },
    rosetta: {
        parentNode: stage,
        directoryType: "size"
    }
}).render();

var large_siamese_cat_tosses_a_mouse = R.create("div").set({
    css: {
        top: 0,
        left: 0,
        width: 3415,
        height: 2268,
        backgroundImage: "Large_Siamese_cat_tosses_a_mouse.jpg",
        cursor: "pointer",
        opacity: 1,
        backgroundScale: "cover"
    },
    attr: {
        id: "large_siamese_cat_tosses_a_mouse"
    },
    rosetta: {
        parentNode: stage,
        directoryType: "size"
    }
}).render();

var pic2 = R.create("div").set({
    css: {
        top: 0,
        left: 0,
        width: 200,
        height: 232,
        backgroundImage: "pic2.png",
        cursor: "pointer",
        opacity: 1,
        backgroundScale: "cover"
    },
    attr: {
        id: "pic2"
    },
    rosetta: {
        parentNode: stage,
        directoryType: "size"
    }
}).render();

var cta = R.create("div").set({
    css: {
        top: 0,
        left: 0,
        width: 107,
        height: 36,
        backgroundImage: "cta.png",
        cursor: "pointer",
        opacity: 1,
        backgroundScale: "cover"
    },
    attr: {
        id: "cta"
    },
    rosetta: {
        parentNode: stage,
        directoryType: "size"
    }
}).render();

var t1 = R.create("div").set({
    css: {
        top: 0,
        left: 0,
        width: 104,
        height: 52,
        backgroundImage: "t1.png",
        cursor: "pointer",
        opacity: 1,
        backgroundScale: "cover"
    },
    attr: {
        id: "t1"
    },
    rosetta: {
        parentNode: stage,
        directoryType: "size"
    }
}).render();

var t2 = R.create("div").set({
    css: {
        top: 0,
        left: 0,
        width: 139,
        height: 43,
        backgroundImage: "t2.png",
        cursor: "pointer",
        opacity: 1,
        backgroundScale: "cover"
    },
    attr: {
        id: "t2"
    },
    rosetta: {
        parentNode: stage,
        directoryType: "size"
    }
}).render();

var newBatch = R.create("batch")
  .add([])
  .require(["cat_wallpaper", "evergreen", "legal", "bottle", "pic1", "large_siamese_cat_tosses_a_mouse", "pic2", "cta", "t1", "t2"])
  .success(function() { /*success callback*/ })
  .fail(function() { /*error callback*/ })
  .render();