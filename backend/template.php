<?php
//Dependency Pruefung
function webkit_installed()
{
    return shell_exec("dpkg-query -W -f='\${Status}\n' libwebkitgtk-3.0-0");
}

for ($i = 0; $i < 3; $i++) {
    $is_webkit_installed = strpos(webkit_installed(), 'install ok installed'); //if found it's not true!
    if ($is_webkit_installed === false && $i < 2) {
        $output = shell_exec("sudo apt-get install libwebkitgtk-3.0-0");
        //Do not place here a break or similar
    } else if ($is_webkit_installed !== false) {
        //Everything ok (Maybe you want to place here a message)
        //echo "Found 'libwebkitgtk-3.0-0' :) <br />";
        break;
    } else if ($i >= 2) {
        echo "ERROR: Could not install 'libwebkitgtk-3.0-0'.<br />Please run 'sudo apt-get install libwebkitgtk-3.0-0' on your Pi.<br />";
        if (!empty($output)) {
            var_dump($output);
        }
        break;
    }
}


$YT_Link = getConfigValue('YT_Link');
// wenn der parameter noch nicht gesetzt wurde
if ($YT_Link == 'GLANCR_DEFAULT') {
    $YT_Link = 'https://www.youtube.com/watch?v=8fKrlIZCuWw&list=RD8fKrlIZCuWw&index=1'; //Default video
}


//SET NEW URL (for Apps)
if (!empty($_POST['YT_Url'])) {
    $isUrlSet = !empty(setConfigValue('YT_Link', $_POST['YT_Url'])) ? true : false; //setConfigValue provides null when error
}

?>

<!-- $('#target-div').load('http://www.mywebsite.com/portfolio.php #portfolio-sports'); für Iframe youtube-->
<label for="YT_Link"
       title="Copy your Video-URL (with all parameters): https://www.youtube.com/watch?v=WQCJ35pHI-w&index=4&list=RD8fKrlIZCuWw">YT-Video-URL: </label>
<input type="text" id="YT_Link"
       placeholder="Place here your Video Url: (e.g. https://www.youtube.com/watch?v=WQCJ35pHI-w&index=4&list=RD8fKrlIZCuWw)"
       value="<?php echo $YT_Link; ?>"/>
<p class="text-info"><strong>Tipp: </strong><br/>
    If you paste a url with 'list'-parameter (e.g.: <i>https://www.youtube.com/watch?v=gkpKXT23Hmc&list=RDgkpKXT23Hmc#t=3</i>), then this module will play all your videos of that
    playlist and loops through it until you
    change the parameter or you can just use the search below (but there Youtube will block some playlists). </p>

<div class="block__add" id="YT-Link__edit">
    <button class="YT-Link__edit--button" href="#" id="save_button">
        <span><?php echo _('Link speichern'); ?></span>
    </button>
</div>

<p>&nbsp;</p>

<form onsubmit="search_yt_videos(); return false;">
    <label for="search_field">Search on YouTube: </label>
    <input type="text"  id="search_field"/>
    <input type="submit" value="Search Playlists" />
</form>
<iframe class=center" id="vorschau_playlist" width="50%" height="auto" frameborder="0" allowfullscreen></iframe>
<p><br />
<input class="center" type="button" value="Use searched video" onclick="search_use_video()" title="This uses and saves the searched video. You won't need to click on the 'Save'-Button." />
</p>


<p id="creator">
    <span id="copyright">© Riedl Kevin (WSDT), 2017 <br />
        If you have any problems, just contact me: kevin.riedl.privat@gmail.com</span>
</p>
