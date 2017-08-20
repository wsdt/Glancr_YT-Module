function ytLinkData(url, requested_value) { //possible values for 'requested_value' --> 'videoid', 'addit_parameters'
    var return_value;
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(\S+)?$/;
    if (url.match(p)) {
        if (requested_value === 'videoid') {
            return_value = RegExp.$1;
        } else if (requested_value === 'addit_parameters') {
            return_value = RegExp.$3; //$2 nur letzter Wert von VideoId
        }
    } else {
        return_value = false;
    }
    return return_value;
}


function getYT_Link() {
    $.ajax({
        dataType: 'json',
        url: '../modules/YouTube/assets/getYT_Link.php',
        success: function (data) { //data = Video-URL
            var donot = false;
            if (data.indexOf('embed?listType=search&list=') === -1) {
                var videoid = ytLinkData(data, 'videoid');
                var addit_parameters = ytLinkData(data, 'addit_parameters');
                var yt_allparameters = ""; //do not append here the videoid, because embed-urls have another syntax
                if (videoid !== false) {


                    //Create Parameter-List of YT-Url
                    var parameters = ["controls", "autoplay", "vq", "loop", "list", "showinfo"]; //Only place here attributes which should be adjustable! (html5 should not be changeable)
                    yt_allparameters = addit_parameters.substr(1); //remove first & from given parameters
                    if (yt_allparameters.slice(-1) !== '&') {
                        yt_allparameters += '&'; //append & at the end
                    }

                    var are_addit_parameters_available = addit_parameters !== "" && addit_parameters !== null && addit_parameters !== false;

                    for (var parameter of parameters) {
                        //Set Default Settings and if already set, then take it from the url

                        var parameter_validation;
                        if (are_addit_parameters_available) {
                            parameter_validation = addit_parameters.indexOf(parameter) === -1;
                        } else {
                            parameter_validation = !are_addit_parameters_available;
                        }

                        if (parameter_validation) {
                            //Search standard setting
                            var default_setting;
                            if (parameter === 'controls' || parameter === 'showinfo') {
                                default_setting = '0';
                            }
                            else if (parameter === 'autoplay' || parameter === 'loop') {
                                default_setting = '1';
                            }
                            else if (parameter === 'vq') {
                                default_setting = 'large';
                            }
                            else if (parameter === 'list') {
                                default_setting = videoid;
                            }
                            else {
                                console.log('Parameter will be ignored: ' + parameter);
                            }

                            yt_allparameters += parameter + '=' + default_setting + '&';

                        }
                    }


                    //&loop=1&playlist='+data --> scheinbar list jetzt?!
                    //vq= Qualität von Video erzwingen (um Stocken zu vermeiden)
                    data = 'https://www.youtube.com/embed/' + videoid + '?html5=True&rel=0&' + yt_allparameters; // if playlist_data = video_id (data) --> loops single video again
                } else {
                    alert("Error: Could not load VideoId");
                    donot=true;
                }
            } else {
                //TODO: Autoplay does not work
                data = data + '&html5=True&autoplay=1&controls=0&vq=large&loop=1&rel=0&showinfo=0'; //when Playlist
            }
            if (!donot) {
                var ifr = $('#YT_Link');
                alert(data);
                ifr.attr("src", data);


            }
        }
    });

    /*// alle 5 Sekunden aktualiseren
     window.setTimeout(function() {
     getYT_Link();
     }, 5000);*/
}


$(document).ready(function () {
    getYT_Link();
});











