$('#carousel').elastislide({
    minItems: 2
});

$(document).ready(function() {
    loadThumbs();
});

$(function() {
    $("#dialog").dialog({
        autoOpen: false,
        resizable: false,
        width: "auto",
        buttons: {
            Close: function() {
                $(this).dialog("close");
            }
        }
    });
});

function showDialog(pth) {

    $("#dialog").html('<img src="pic' + pth + '"><div id="caption"></div>');
    jQuery("#dialog").prev('.ui-dialog-titlebar').css("background", "white");
    $("#dialog").dialog("option", "position", {
        my: "center",
        at: "center",
        of: "#mapholder"
    });
    $.post("caption" + pth, function(data) {
        $("#caption").html(data);
    });
    if ($("#dialog").dialog("isOpen") === false) {
        $("#dialog").dialog("open");
        $(".ui-dialog").attr('top', '50px');
    }
    $("#dialog").dialog('option', 'title', pth.replace(/_/g, " ").replace("/", ""));
    $(".ui-dialog").css({
        top: 50
    });
    $(".ui-dialog").css({
        left: 125
    });
    $(".ui-dialog").css({
        width: 500
    });
}

var show = true;

$(".thumbnail").on("click", function(e) {
    var pth = this.pathname;
    showDialog(pth);
});


$("#switch").click(function() {
    if (show) {
        $("#switch").html("Show");
        show = false;
    } else {
        show = true;
        $("#switch").html("Hide");
    }
    $("#toggle").toggle("slide");
});

$(function() {
    $("input[type=submit], a, button")
        .button()
        .click(function(event) {
            event.preventDefault();
        });
});

$(".t").mouseover(function() {
    alert("sh");
});

var map = new L.Map("map")
    .setView(new L.LatLng(29.95, -90.05), 13)
    .addLayer(new L.TileLayer("http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png"));

map.on('moveend', function() {
    loadThumbs();
});

/* Initialize the SVG layer */
map._initPathRoot();

/* We simply pick up the SVG from the map object */
var svg = d3.select("#map").select("svg"),
    g = svg.append("g");

/* Define the d3 projection */
var path = d3.geo.path().projection(function project(x) {
    var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
    return [point.x, point.y];
});

/* Load and project/redraw on zoom */
d3.json("static/out.json", function(collection) {
    var feature = g.selectAll("path")
        .data(collection.features)
        .enter().append("path")
        .attr("class", function(d) {
            return d.properties.category + " " + d.properties.investigates + " " + d.properties.thumbnail;
        }).attr("id", function(d) {
            return d.properties.address;
        }).attr("lat", function(d) {
            return Math.abs(d.geometry.coordinates[1]);
        }).attr("long", function(d) {
            return Math.abs(d.geometry.coordinates[0]);
        })
        .attr("d", path);

    map.on("viewreset", function reset() {
        feature.attr("d", path);
    });
});

function loadThumbs() {
    var bounds = map.getBounds();
    var f = $("path.yesthumbnail").filter(function() {
        return $(this).attr("long") < Math.abs(bounds._southWest.lng) && $(this).attr("long") > Math.abs(bounds._northEast.lng) && $(this).attr("lat") < Math.abs(bounds._northEast.lat) && $(this).attr("lat") > Math.abs(bounds._southWest.lat);
    });
    var slicetot = 0;
    if (f.length < 10) {
        slicetot = f;
    } else {
        slicetot = 11;
    }

    var newpics = f.slice(0, slicetot);

    for (var i = 0; i < newpics.length; i++) {
        var inner = '<span class="ui-button-text"><img src="thumb/' + f[i].id + '"></span><p class="caption"><span id="' + i + '_caption">' + f[i].id.replace(/_/g, " ") + '</span></p>';
        $("#" + i).html(inner);
        $("#" + i).attr("href", f[i].id);
    }
}