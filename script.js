$(function () {
  var playerTrack = $("#player-track"),
    bgArtwork = $("#bg-artwork"),
    bgArtworkUrl,
    albumName = $("#album-name"),
    trackName = $("#track-name"),
    albumArt = $("#album-art"),
    sArea = $("#s-area"),
    seekBar = $("#seek-bar"),
    trackTime = $("#track-time"),
    insTime = $("#ins-time"),
    sHover = $("#s-hover"),
    playPauseButton = $("#play-pause-button"),
    i = playPauseButton.find("i"),
    tProgress = $("#current-time"),
    tTime = $("#track-length"),
    seekT,
    seekLoc,
    seekBarPos,
    cM,
    ctMinutes,
    ctSeconds,
    curMinutes,
    curSeconds,
    durMinutes,
    durSeconds,
    playProgress,
    bTime,
    nTime = 0,
    buffInterval = null,
    tFlag = false,
    albums = [
      "the mamas & the papas",
      "liana flores",
      "fizz",
      "laufey",
      "lucy dacus"
    ],
    trackNames = [
      "dream a little dream of me",
      "rises the moon",
      "high in brighton",
      "valentine",
      "la vie on rose"
    ],
    albumArtworks = ["_1", "_2", "_3", "_4", "_5"],
    trackUrl = [
      "https://ssrpde.ytjar.xyz/rr2---sn-4g5edndl.googlevideo.com/videoplayback?expire=1725683214&ei=roHbZufEIYOH6dsPwtqJ8Aw&ip=2a01%3A4f8%3A1c1c%3A15cc%3A9d19%3A5848%3A2a50%3A43e1&id=o-ALT1siSgLk31c5nVD0HtNjNjoS9285pn1D2YelRnX4wg&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&gcr=de&bui=AQmm2ex5z-VWFMkaBUVG6Ad3C2rZcOoImXPZTfn7csQOM-fDiNduy32hY95GoNJo8KuV0ZBC3A1Ek30A&spc=Mv1m9pVYZMdLCckK5u-ejOznlkffdqvLOeSLQda036CDWFfLcnN9&vprv=1&svpuc=1&xtags=heaudio%3Dtrue&mime=video%2Fmp4&ns=71Y1F5IwR3ZrLQPtASis6wsQ&rqh=1&cnr=14&ratebypass=yes&dur=194.501&lmt=1664193693375492&c=WEB&sefc=1&txp=5438434&n=FY-cL3GmY_-9lw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhANIPo5aX2oK4Mfvbh3tOd3nIAP20k0fZYDaX3ssIR0fRAiEAr_xYnUpA4qdzVM2ui2xHK9lzvoQlOPbaCVOZDRgfsjk%3D&redirect_counter=1&rm=sn-4g5ere7s&rrc=104&fexp=24350516,24350518,24350557,24350561&req_id=ab1012d06a85a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=bc&mip=2a01:4f8:1c1b:5785:eadd:e691:ab07:68b5&mm=31&mn=sn-4g5edndl&ms=au&mt=1725661253&mv=m&mvi=2&pl=53&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=ABPmVW0wRgIhAJNwwtxd_7_cDfVKCUn-BEE2jT9VWjwjcJd8kVMbuRSsAiEA18yuR74mWtXVFS4aoorlm0LsLGiWmRvEJNUZeg_oSfg%3D",
      "https://rr1---sn-u5a3u5a3-cimd.googlevideo.com/videoplayback?expire=1725683181&ei=jYHbZrakFu7R6dsP3pDp-As&ip=2a01%3A4f8%3A1c1c%3A15cc%3A9d19%3A5848%3A2a50%3A43e1&id=o-AJHNAszfMlOJvaekvwf7NhMJLv1O_m2mUMY7NMZo5idI&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AQmm2exVMNAFIrYLhBMjkfrBcTN1VBMKQ61RCocjezYzdA4zrD7log8kHgIu295JoPlc5vYUDnt2gJNu&spc=Mv1m9shJUmWdsyRLoMNdemX-Pti9r-ofioRxMVAWe4HpqLPgOkBi&vprv=1&svpuc=1&mime=video%2Fmp4&ns=bpyTpknT0_iE_JSGUajv4UIQ&rqh=1&gir=yes&clen=8638345&ratebypass=yes&dur=162.191&lmt=1713225887589797&c=WEB&sefc=1&txp=5538434&n=WrigUem6HXlV7Q&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhALYlUmEQIFKlUcG9t4ufnFdP6EETCq00-zbs7Or9B3M9AiBF9-d_UFsFL_7Dio7IRU9hz-Ykrn6YwQETFJeTH1FTvw%3D%3D&redirect_counter=1&rm=sn-4g5erz7e&rrc=104&fexp=24350516,24350518,24350557,24350561&req_id=93546117949ba3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=UV&mip=89.241.27.41&mm=31&mn=sn-u5a3u5a3-cimd&ms=au&mt=1725661253&mv=m&mvi=1&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=ABPmVW0wRQIgbGKQwPNNS0PePSjP3mnq0VkBhPJDUzPtBza5zO3uYYwCIQCa_JwVTlZzRRSSfFsvz-QYWNvSbANcziqMMh64tWLn8w%3D%3D",
      "https://ssrpde.ytjar.xyz/rr3---sn-4g5lznes.googlevideo.com/videoplayback?expire=1725683140&ei=ZIHbZtz-KJqL6dsPjJfOaA&ip=2a01%3A4f8%3A1c1c%3A15cc%3A9d19%3A5848%3A2a50%3A43e1&id=o-ACauBur5hwVvOIDGmkZiHglKdmknxICQB3n6enc99Lcd&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&gcr=de&bui=AQmm2eyz8a_SYLkQm3Tsa1o-o9QubWd0Ctct2bBlEALYoxnjnm9GPi59qkn7F1tQTTYmpfip2deBj4l5&spc=Mv1m9hamNENk0IXtHJVLbYky593t1x-JulqJyQD7uQKU_vRZQIOT&vprv=1&svpuc=1&xtags=heaudio%3Dtrue&mime=video%2Fmp4&ns=NKInZPC4_rvx0tdpF4HsORYQ&rqh=1&cnr=14&ratebypass=yes&dur=171.316&lmt=1702769937403564&c=WEB&sefc=1&txp=5318224&n=fRZfGG0KiyrJPQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgZc08G0YX1sWS3HV34yeIqz7D5uADpI_TB7S_nweS8DoCIQDXg6mRAko6MVkAnCcOMsSurW05J3oRevXI_1f1A4m3zw%3D%3D&redirect_counter=1&cm2rm=sn-4g5edr7s&rrc=80&fexp=24350516,24350518,24350557,24350561&req_id=bcd8dd4ebaa5a3ee&cms_redirect=yes&cmsv=e&mh=VW&mip=2a01:4f8:1c1b:5785:eadd:e691:ab07:68b5&mm=34&mn=sn-4g5lznes&ms=ltu&mt=1725661232&mv=m&mvi=3&pl=53&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=ABPmVW0wRQIgMQdE8gS-ctg3E1vninN-8-ehOrodKSHAWdGIvEzSJMQCIQCQdYd3YH4wEuiAkWX4ABK-rLS4BPvEtRm33kJ2OIg3sw%3D%3D",
      "https://rr2---sn-u5a3u5a3-cimd.googlevideo.com/videoplayback?expire=1725682917&ei=hYDbZvCSB4Di6dsPzYfHwAY&ip=2a01%3A4f8%3A1c1c%3A15cc%3A9d19%3A5848%3A2a50%3A43e1&id=o-AERO7Te-r_zAtZZxdha4q75-Q2uTZtfI8dw7ODMTTKW6&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AQmm2exXlagv2XbUpzpRvCB9_Qq5KhPihx09aGFOl97rkwWR16qxpppbXb6B_I5Lm27DISM4aQ8ZnMmU&spc=Mv1m9pM7-E-3T9VwPpLGDcbJxt3EuxQe2lsWhdUqG89jGoL0DmnZ&vprv=1&svpuc=1&mime=video%2Fmp4&ns=BXB3O7wvKeBgkfyZqXktmaUQ&rqh=1&cnr=14&ratebypass=yes&dur=168.948&lmt=1709044602696931&c=WEB&sefc=1&txp=4538434&n=9Fo1hvsz9yHArQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgbvW3qFKNkd8KikSKJNCZHepx33Jeu7fNiuZWTn0Kar0CID_0xzcbe2FnaNQzSsTSMkwsDOw5KYXM5OcULVfT-zyU&redirect_counter=1&rm=sn-4g5er67l&rrc=104&fexp=24350516,24350518,24350557,24350561&req_id=8394899c05d8a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=LC&mip=89.241.27.41&mm=31&mn=sn-u5a3u5a3-cimd&ms=au&mt=1725660771&mv=m&mvi=2&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=ABPmVW0wRAIgMcDEi6V7Jbq-bLseuCPGodX6e4Yx8I-qU8M6NeglyIYCIGGdxaeJwKROfqPVU-cWjeXOuEuVi8SuhXK7JDRKbwtS",
      "https://rr3---sn-u5a3u5a3-cimd.googlevideo.com/videoplayback?expire=1725682865&ei=UYDbZtvbLNO66dsPnNbMyAY&ip=2a01%3A4f8%3A1c1c%3A15cc%3A9d19%3A5848%3A2a50%3A43e1&id=o-AMFclgGhufp6hO1KtVphn_Hh8AsiWEUMvNSeFsnLYKgg&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AQmm2ewQcyCjbiJX4_ewuWsNMAJw6hGVDFBD23vkApHFhxhjSODBAJQ5h8EVwRLoKHRDJ3sMlbCnAM1A&spc=Mv1m9owO3Rs4JUpxx2es4XmrM8EMk35Ez7ZKALwwJs5870A5NB-s&vprv=1&svpuc=1&mime=video%2Fmp4&ns=h2jgjOY1w3-AedswnC5PJlQQ&rqh=1&cnr=14&ratebypass=yes&dur=170.852&lmt=1706022230209363&c=WEB&sefc=1&txp=4438434&n=Su-Fg2MquyG7dQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhAMth4oVZ_52l2zSg3Zx7Ywdq05I0MwpuMJcvU5hm10sXAiBb4qB4SYlpI49ZrrmAhzDT35TkaXt0PVb7453wjT6evA%3D%3D&redirect_counter=1&rm=sn-4g5e6776&rrc=104&fexp=24350516,24350518,24350557,24350561&req_id=2d9f2dbc64aba3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=oh&mip=89.241.27.41&mm=31&mn=sn-u5a3u5a3-cimd&ms=au&mt=1725660771&mv=m&mvi=3&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=ABPmVW0wRQIgUhhvYtiOPrpbZrJvIGMD84B7Kx0LZnYzGf3ATZt0UBACIQDu5pN7C1qdRmSeU7-_7T0pdbe951z-9ZPFakO8xyYAFg%3D%3D"
    ],
    playPreviousTrackButton = $("#play-previous"),
    playNextTrackButton = $("#play-next"),
    currIndex = -1;

  function playPause() {
    setTimeout(function () {
      if (audio.paused) {
        playerTrack.addClass("active");
        albumArt.addClass("active");
        checkBuffering();
        i.attr("class", "fas fa-pause");
        audio.play();
      } else {
        playerTrack.removeClass("active");
        albumArt.removeClass("active");
        clearInterval(buffInterval);
        albumArt.removeClass("buffering");
        i.attr("class", "fas fa-play");
        audio.pause();
      }
    }, 300);
  }

  function showHover(event) {
    seekBarPos = sArea.offset();
    seekT = event.clientX - seekBarPos.left;
    seekLoc = audio.duration * (seekT / sArea.outerWidth());

    sHover.width(seekT);

    cM = seekLoc / 60;

    ctMinutes = Math.floor(cM);
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
    if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

    if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");
    else insTime.text(ctMinutes + ":" + ctSeconds);

    insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
  }

  function hideHover() {
    sHover.width(0);
    insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
  }

  function playFromClickedPos() {
    audio.currentTime = seekLoc;
    seekBar.width(seekT);
    hideHover();
  }

  function updateCurrTime() {
    nTime = new Date();
    nTime = nTime.getTime();

    if (!tFlag) {
      tFlag = true;
      trackTime.addClass("active");
    }

    curMinutes = Math.floor(audio.currentTime / 60);
    curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

    durMinutes = Math.floor(audio.duration / 60);
    durSeconds = Math.floor(audio.duration - durMinutes * 60);

    playProgress = (audio.currentTime / audio.duration) * 100;

    if (curMinutes < 10) curMinutes = "0" + curMinutes;
    if (curSeconds < 10) curSeconds = "0" + curSeconds;

    if (durMinutes < 10) durMinutes = "0" + durMinutes;
    if (durSeconds < 10) durSeconds = "0" + durSeconds;

    if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
    else tProgress.text(curMinutes + ":" + curSeconds);

    if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
    else tTime.text(durMinutes + ":" + durSeconds);

    if (
      isNaN(curMinutes) ||
      isNaN(curSeconds) ||
      isNaN(durMinutes) ||
      isNaN(durSeconds)
    )
      trackTime.removeClass("active");
    else trackTime.addClass("active");

    seekBar.width(playProgress + "%");

    if (playProgress == 100) {
      i.attr("class", "fa fa-play");
      seekBar.width(0);
      tProgress.text("00:00");
      albumArt.removeClass("buffering").removeClass("active");
      clearInterval(buffInterval);
    }
  }

  function checkBuffering() {
    clearInterval(buffInterval);
    buffInterval = setInterval(function () {
      if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
      else albumArt.removeClass("buffering");

      bTime = new Date();
      bTime = bTime.getTime();
    }, 100);
  }

  function selectTrack(flag) {
    if (flag == 0 || flag == 1) ++currIndex;
    else --currIndex;

    if (currIndex > -1 && currIndex < albumArtworks.length) {
      if (flag == 0) i.attr("class", "fa fa-play");
      else {
        albumArt.removeClass("buffering");
        i.attr("class", "fa fa-pause");
      }

      seekBar.width(0);
      trackTime.removeClass("active");
      tProgress.text("00:00");
      tTime.text("00:00");

      currAlbum = albums[currIndex];
      currTrackName = trackNames[currIndex];
      currArtwork = albumArtworks[currIndex];

      audio.src = trackUrl[currIndex];

      nTime = 0;
      bTime = new Date();
      bTime = bTime.getTime();

      if (flag != 0) {
        audio.play();
        playerTrack.addClass("active");
        albumArt.addClass("active");

        clearInterval(buffInterval);
        checkBuffering();
      }

      albumName.text(currAlbum);
      trackName.text(currTrackName);
      albumArt.find("img.active").removeClass("active");
      $("#" + currArtwork).addClass("active");

      bgArtworkUrl = $("#" + currArtwork).attr("src");

      bgArtwork.css({ "background-image": "url(" + bgArtworkUrl + ")" });
    } else {
      if (flag == 0 || flag == 1) --currIndex;
      else ++currIndex;
    }
  }

  function initPlayer() {
    audio = new Audio();

    selectTrack(0);

    audio.loop = false;

    playPauseButton.on("click", playPause);

    sArea.mousemove(function (event) {
      showHover(event);
    });

    sArea.mouseout(hideHover);

    sArea.on("click", playFromClickedPos);

    $(audio).on("timeupdate", updateCurrTime);

    playPreviousTrackButton.on("click", function () {
      selectTrack(-1);
    });
    playNextTrackButton.on("click", function () {
      selectTrack(1);
    });
  }

  initPlayer();
});