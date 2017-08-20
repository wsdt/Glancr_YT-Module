<?php
include('../../../config/glancrConfig.php');

$YT_Link = getConfigValue('YT_Link');
// wenn der parameter noch nicht gesetzt wurde
if($YT_Link == 'GLANCR_DEFAULT') {
	$YT_Link = 'https://www.youtube.com/watch?v=8fKrlIZCuWw&list=RD8fKrlIZCuWw&index=1'; //Default video
}

echo json_encode($YT_Link);

?>
