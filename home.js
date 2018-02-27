'use strict'
import './frontend/stylesheets/hamburgers.css'; // этот файл подключен в глобальный скоуп в head
import './frontend/plugins/blueimp-gallery/css/blueimp-gallery.css';
import './frontend/plugins/blueimp-gallery/css/blueimp-gallery-indicator.css';
import './frontend/plugins/blueimp-gallery/css/blueimp-gallery-video.css';
import './frontend/plugins/jPlayer-2.9.2/dist/skin/pink.flag/css/jplayer.pink.flag.css';

import './frontend/stylesheets/main.styl';

var full = $('.container');
var w_height = $(window).height();
console.log($(window).height());
const NUM_OF_PHOTO = 29;

var mouse_wheel = function(event) {
    if (false === !!event) event = window.event;
    let direction = ((event.wheelDelta) ? event.wheelDelta/120 : event.detail/-3) || false;
    return direction;
};

// upload the photos in HTML for slider-image

var uploadPhotos = function () {

    for (let i = 1; i < NUM_OF_PHOTO; i++) {
        $('#links').append('<a></a>');
        $('#links a:last-child').attr({
            href: 'frontend/img/photo/' + i + '.jpg'
        }).append('<img>');
        $('a:last-child img').attr({
            src: 'frontend/img/photo/180x180/' + i + '.jpg',
            class: 'img-size'
        });
    };
};
uploadPhotos();

// hamburger animation

$('.hamburger').click(function () {

    if (this.opened === true) {
        $('.container').removeClass('background_width');
        $('.hamburger').removeClass('is-active');
        $('.sidebar').removeClass('sidebar_right');


        // $('.background').animate({
        //     width: '100%'
        // }, 200);
    } else {
        $('.container').addClass('background_width');
        $('.hamburger').addClass('is-active');
        $('.sidebar').addClass('sidebar_right');

        // $('.background').animate({
        //     // width: '-webkit-calc(100% - 270px)',
        //     // width: '-moz-calc(100% - 270px)',
        //     width: '-webkit-calc(100px + 270px)'
        //
        //
        // }, 200);
    }

    this.opened = !this.opened
});

// page slider

var counter = 0;
const NUM = $('.section').length;
var moveUp = function () {
    if (counter <= 0) return counter;
    if (counter <= 4) {
        $('.mobile').css({
            'opacity' : '1',
            'transition' : 'opacity 0.4s'
        });
    };
    if (counter === 3) {
        $('.mobile').css({
            'color' : '#292727',
            'transition' : 'color 0.4s'
        });
    }
    --counter;
    return counter;
};
var moveDown = function () {
    if (counter >= NUM - 1) return counter;
    if (counter === 2) {
        $('.mobile').css({
            'color' : '#fff7b9',
            'transition' : 'color 0.4s'
        });
    };
    if (counter === 3) {
        $('.mobile').css({
            'opacity' : '0',
            'transition' : 'opacity 0.4s'
        });
    };
    ++counter;
    return counter;
};

$(window).on('mousewheel', function () {
    let windowH = document.documentElement.clientHeight;

    if (mouse_wheel() === -1) {
        moveDown();
        console.log('mouseDown counter -> ', counter);
        $('.container').css({
            'transform' : 'translate(0, -' + (counter * windowH) + 'px)',
            'transition' : 'width 0.3s, transform 0.7s'
        });
    } else {
        moveUp();
        console.log('mouseUp counter -> ', counter);
        $('.container').css({
            'transform' : 'translate(0, -' + (counter * windowH) + 'px)',
            'transition' : 'width 0.3s, transform 0.7s'
        });
    }

});

// menu navigation

function moveOnMenu() {
    let class_name = $(this).attr('class');
    counter = $('.' + class_name).index();
    console.log('counter' + counter);

    $('.container').css({
        'transform' : 'translate(0, -' + (counter * w_height) + 'px)',
        'transition' : 'width 0.3s, transform 0.7s'
    });

    if (counter === 3) {
        $('.mobile').css({
            'color' : '#fff7b9',
            'transition' : 'color 0.4s'
        });
    } else {
        $('.mobile').css({
            'color' : '#292727',
            'transition' : 'color 0.4s'
        });
    }

    if (counter === 4) {
        $('.mobile').css({
            'opacity' : '0',
            'transition' : 'opacity 0.4s'
        });
    } else {
        $('.mobile').css({
            'opacity' : '1',
            'transition' : 'opacity 0.4s'
        });
    }

};

$('.menu-mainPage, .menu-biogr, .menu-video, .menu-photo, .menu-footer').click(moveOnMenu);


// for slider-image plagin

document.getElementById('links').onclick = function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {index: link, event: event},
        links = this.getElementsByTagName('a');
    blueimp.Gallery(links, options);
};

var fullscreenOptions = {
    // Defines if the gallery should open in fullscreen mode:
    fullScreen: true
};


// for audio-player 'jplayer'

// $(document).ready(function(){
//     $("#jquery_jplayer_1").jPlayer({
//         ready: function () {
//             $(this).jPlayer("setMedia", {
//                 title: "Мама",
//                 m4a: "frontend/audio/Tura_mama.mp3",
//             });
//         },
//         cssSelectorAncestor: "#jp_container_1",
//         swfPath: "/js",
//         supplied: "m4a, oga",
//         useStateClassSkin: true,
//         autoBlur: false,
//         smoothPlayBar: true,
//         keyEnabled: true,
//         remainingDuration: true,
//         toggleDuration: true
//     });
// });

// $(document).ready(function(){
//     var myPlaylist = new jPlayerPlaylist({
//         jPlayer: "#jquery_jplayer_1",
//         cssSelectorAncestor: "#jp_container_1"
//     }, [
//         {
//
//         }
//     ], {
//         playlistOptions: {
//             enableRemoveControls: false
//         },
//         swfPath: "js",
//         supplied: "webmv, m4v, ogv, oga, mp3"
//     });
//
//     myPlaylist.setPlaylist([
//         {
//             title:"Мама",
//             artist:"IOWA",
//             mp3: "./frontend/audio/Tura_mama.mp3",
//             // poster: "flash/pics/flphricc2.png"
//         },
//         {
//             title:"Без тебя",
//             artist:"Наталия Валевская",
//             mp3: "./frontend/audio/Tura_bez_tebia.mp3",
//             // poster: "flash/pics/flpingridarthur.png"
//         },
//         {
//             title:"??????",
//             artist:"?????",
//             mp3: "./frontend/audio/Ksyu1.wav",
//             // poster: "flash/pics/flphricc2.png"
//         },
//         {
//             title:"???",
//             artist:"???",
//             mp3: "./frontend/audio/Ksyu2.wav",
//             // poster: "flash/pics/flphricc2.png"
//         }
//     ]);
//
//     myPlaylist.option("autoPlay", false);
//     // myPlaylist.option("displayTime", 0);
//
//     // The shuffle commands
//     $("#playlist-shuffle").click(function() {
//         myPlaylist.shuffle();
//     });
//     $("#playlist-shuffle-false").click(function() {
//         myPlaylist.shuffle(false);
//     });
//     $("#playlist-shuffle-true").click(function() {
//         myPlaylist.shuffle(true);
//     });
//     // The select commands
//     $("#playlist-select--2").click(function() {
//         myPlaylist.select(-2);
//     });
//     $("#playlist-select--1").click(function() {
//         myPlaylist.select(-1);
//     });
//     $("#playlist-select-0").click(function() {
//         myPlaylist.select(0);
//     });
//     $("#playlist-select-1").click(function() {
//         myPlaylist.select(1);
//     });
//     $("#playlist-select-2").click(function() {
//         myPlaylist.select(2);
//     });
//     // The next/previous commands
//     $("#playlist-next").click(function() {
//         myPlaylist.next();
//     });
//     $("#playlist-previous").click(function() {
//         myPlaylist.previous();
//     });
//     // The play commands
//     $("#playlist-play").click(function() {
//         myPlaylist.play();
//     });
//     $("#playlist-play--2").click(function() {
//         myPlaylist.play(-2);
//     });
//     $("#playlist-play--1").click(function() {
//         myPlaylist.play(-1);
//     });
//     $("#playlist-play-0").click(function() {
//         myPlaylist.play(0);
//     });
//     $("#playlist-play-1").click(function() {
//         myPlaylist.play(1);
//     });
//     $("#playlist-play-2").click(function() {
//         myPlaylist.play(2);
//     });
//     // The pause command
//     $("#playlist-pause").click(function() {
//         myPlaylist.pause();
//     });
//     // Changing the playlist options
//     // Option: autoPlay
//     $("#playlist-option-autoPlay-true").click(function() {
//         myPlaylist.option("autoPlay", true);
//     });
//     $("#playlist-option-autoPlay-false").click(function() {
//         myPlaylist.option("autoPlay", false);
//     });
//     // Option: shuffleTime
//     $("#playlist-option-shuffleTime-0").click(function() {
//         myPlaylist.option("shuffleTime", 0);
//     });
//     $("#playlist-option-shuffleTime-fast").click(function() {
//         myPlaylist.option("shuffleTime", "fast");
//     });
//     $("#playlist-option-shuffleTime-slow").click(function() {
//         myPlaylist.option("shuffleTime", "slow");
//     });
//     $("#playlist-option-shuffleTime-2000").click(function() {
//         myPlaylist.option("shuffleTime", 2000);
//     });
//
// });

$(document).ready(function(){
    $("#jquery_jplayer_1").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                title: "Bubble",
                mp3: "./frontend/audio/Tura_mama.mp3",
                // oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
            });
        },
        cssSelectorAncestor: "#jp_container_1",
        swfPath: "/js",
        supplied: "mp3, m4a, oga",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true
    });
    var myPlaylist = new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_N",
        cssSelectorAncestor: "#jp_container_N"
    }, [
        {
            title:"Cro Magnon Man",
            artist:"The Stark Palace",
            mp3:"./frontend/audio/Tura_mama.mp3",
            oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
            poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
        }
    ], {
        playlistOptions: {
            enableRemoveControls: true
        },
        swfPath: "/js",
        supplied: "mp3, ogv, m4v, oga",
        smoothPlayBar: true,
        keyEnabled: true,
        audioFullScreen: true // Allows the audio poster to go full screen via keyboard
    });
});