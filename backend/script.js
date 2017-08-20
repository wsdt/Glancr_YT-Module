/**
 * JavaScript function to match (and return) the video Id
 * of any valid Youtube Url, given as input string.
 * @author: Stephan Schmitz <eyecatchup@gmail.com>
 * @url: https://stackoverflow.com/a/10315969/624466
 */
function ytVidId(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(\S+)?$/;
    var p2 = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(embed\?listType=search&list=.+))/; //for yt-playlist search
    return (url.match(p) || url.match(p2)) ? RegExp.$1 : false;
}


$('#YT-Link__edit').click(function () {
    var url = $("#YT_Link").val();
    if (ytVidId(url) !== false) {
        $.post('setConfigValueAjax.php', {'key': 'YT_Link', 'value': url})
            .done(function () {
                $('#ok').show(30, function () {
                    $(this).hide('slow');
                })
            });
    } else {
        alert("Error: Please type in/paste a valid YouTube-Url!");
    }
});


function search_yt_videos(){
    var base_url = 'http://www.youtube.com/embed?listType=search&list=';
    var search_field = document.getElementById('search_field').value;
    var target_url = base_url + search_field;
    var ifr = document.getElementById('vorschau_playlist');
    ifr.src = target_url;
    return false;
}

function search_use_video() {
    var ifr = document.getElementById('vorschau_playlist');
    document.getElementById('YT_Link').value = ifr.src;
    $("#save_button").click(); //simulate click on save button
}