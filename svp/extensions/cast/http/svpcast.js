
lastDirId = '';
progressId = -1;
manager = false;

showPage = function(id)
{
    $.each(["files","tracks","streaming"], function(i,page)
    {
        $("#page-"+page).toggle(page==id);
    });
}

parseReply = function(res)
{
    if(!res.ok) return;

    if(res.state === "idle")
    {
	var ddns = "https://www.svp-team.com/cast";
	$("#header").html("<i>"+(res.path==="." ? (manager ? ("<a href=\""+ddns+"\">"+ddns+"</a>"):"home"):res.path)+"</i>");

        $('#files-list').empty();
        $.each(res.list, function(index, data)
        {
            if(data.d)
                $('#files-list').append("<li><a href=\"#\" id=\"" + data.h + "\">" + data.n + "</a></li>");
            else
                $('#files-list').append("<li><a href=\"#\" id=\"" + data.h + "\" class=\"ui-btn ui-icon-action ui-btn-icon-left\">" + data.n + "</a></li>");

            $('#'+data.h).click(function()
            {
                if(data.d)
                    loadFilesList($(this).prop("id"));
                else
                {
                    $.ajax({
                        type: "GET",
                        url: "r/start?id="+$(this).prop("id"),
                        success: parseReply
                    });
                }
            });
        });

        $('input[data-type="search"]').val("");
        $("#files-list").listview("refresh");

        showPage("files");
    }
    else if(res.state === "noroot")
    {
        $("#header").html("No home folder selected!");
        showPage("");
    }
    else if(res.state === "tracks")
    {
        var fillList = function(list,sel)
        {
            $("#"+sel).empty();
            if(!list.length) return;

            $.each(list, function(i, data) {
                $("#"+sel).append("<option value=\"" + data.d + "\">" + data.t + "</option>");
            });
            $("#"+sel).val(list[0].d);
            $("#"+sel).selectmenu("refresh");
        }

        $("#header").html("<i>"+res.title+"</i>");

        fillList(res.devices,"device");
        $("#device").val(res.dev);
        $("#device").selectmenu("refresh");

        fillList(res.audio,"audio");
        $("#audio").prop("disabled",res.audio.length===0);

        fillList(res.subs,"subs");
        $("#subs").prop("disabled",res.subs.length<=1);

        fillList(res.profiles,"profile");

        showPage("tracks");
    }
    else if(res.state === "streaming")
    {
        showPage("streaming");
        changingProgress = false;

        $("#header").html("<i>"+res.title+"</i>");
        $("#lbl-conversion").html(res.cs);
        $("#lbl-total").html(secsToStr(res.dur,false));
        $("#slider-progress").attr("max",res.dur).slider("refresh");

        $("#m3u8").toggle(res.devType==0);
        $("#chromecast").toggle(res.devType>=1);
        $("#volume-ctrl").toggle(res.devType==1);
        $("#lbl-device").html(res.dev);

        updateProgress();
        progressId = setInterval(updateProgress,1000);
    }
}

loadFilesList = function(dirId)
{
    $.ajax({
            type: "GET",
            url: dirId.length ? "r/state?id="+dirId : "r/state",
            success: parseReply,
            error: function(){
                //alert("something went wrong");
            }
        });
    if(dirId.length)
        lastDirId = dirId;
}

updateProgress = function()
{
    $.ajax({
            type: "GET", url: "r/progress",
            success: function(res)
            {
                if(res.state != "streaming")
                {
                    clearInterval(progressId);
                    loadFilesList(lastDirId);
                }
                else
                {
                    if(!changingProgress)
                    {
                        $("#lbl-total").html(secsToStr(res.dur,false));
                        $("#lbl-current").html(secsToStr(res.pos,true));
                        $("#slider-progress").attr("max",res.dur).val(res.pos).slider("refresh");
                    }

                    $("#slider-volume").val(res.vol).slider("refresh");
                    $("#btn-mute").html(res.mute ? "Unmute":"Mute").toggleClass("ui-btn-b",res.mute);
                    $("#btn-pause").html(res.pause ? "Play":"Pause").toggleClass("ui-btn-b",res.pause);

                    if(!res.url.length)
                        $("#url-m3u8").html("waiting for the stream...").attr("href","#");
                    else
                        $("#url-m3u8").html(res.url).attr("href",res.url);
                }
            }
        });
}

cancel = function()
{
    $.ajax({
        type: "GET", url: "r/cancel",
        success: function() { loadFilesList(lastDirId); }
    });

};

secsToStr = function(secs,plus)
{
    var h = Math.floor(secs/3600);
    var m = Math.floor(secs/60) - h*60;
    var s = secs%60;
    return (plus ? "+":"") + h + ":" + (m<10 ? "0":"")+m + ":" + (s<10 ? "0":"")+s;
}

$.mobile.document.on( "pagecreate", "#svpcast", function()
{
    manager = document.location.search.indexOf("from-manager")>0;
    $("#qr-code").toggle(manager);

    $("#btn-start").on("click",function()
    {
        $.ajax({
            type: "GET", url: "r/start",
            data: {dev: $("#device").val(), audio: $("#audio").val(), subs: $("#subs").val(), p: $("#profile").val()},
            success: function() { loadFilesList(''); }
        });
    });

    $("#btn-cancel").on("click",cancel);
    $("#btn-stop").on("click",cancel);

    $("#btn-pause").on("click",function()
        { $.ajax({type: "GET", url: "r/pause"}); });

    $("#btn-mute").on("click",function()
        { $.ajax({type: "GET", url: "r/mute"}); });

    $("#slider-volume").on("slidestop",function(event,ui)
    {
        $.ajax({type: "GET", url: "r/volume",
                   data:{ v: $("#slider-volume").val() }
               });
    });

    changingProgress = false;

    $("#slider-progress").on("slidestart",function(event,ui)
    {
        changingProgress = true;
    });

    $("#slider-progress").on("slidestop",function(event,ui)
    {
        if(!changingProgress) return;

        $.ajax({type: "GET", url: "r/seek",
                   data:{ t: $("#slider-progress").val() }
               });

        setTimeout(function() { changingProgress = false; }, 1000);
    });

    $("#slider-progress").on("change",function(event,ui)
    {
        if(changingProgress)
            $("#lbl-current").html(secsToStr($("#slider-progress").val(),true));
    });

    $("#slider-progress").hide();
    $("#slider-progress").parent().find('.ui-slider-track').css('margin','0 0');
    $("#slider-volume").parent().find('.ui-slider-track').css('margin','0 0 0 68px');

    showPage("");

    loadFilesList('');
});
