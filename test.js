var anticache = "20190722";
var template_mode = "ecn";
var ecn_player_mode  = "HTML5";
var $mobileEnvironment = false;
var $MSIE_MODE = false;
//// aklein adding this
var isEmbedMode = "";

var MAP_FRAME_CUSTOM='';
// UA PARSER LIB
var uaparser		= new UAParser();
var uaParserResult	= uaparser.getResult();

// PGWB LIB
var pgwBrowser = jQuery.pgwBrowser();

/*
var $browser = pgwBrowser.browser.name;
var $browserVer = pgwBrowser.browser.majorVersion;
var $OperatingSystem = pgwBrowser.os.group;
var $OperatingSystemVer = pgwBrowser.os.majorVersion;

if (window.navigator.userAgent.indexOf("Edge") > -1)
	$browser = "Edge";
*/
var $browser			= uaParserResult.browser.name;
window.currentBrowser = $browser;
		// var $browser			= "ChromeTEST";
if ($browser == "Edge") {
	$browser = "Chrome";
	// enableDigitalPTZ = "false";
}

var $browserVer			= uaParserResult.browser.version;
var $OperatingSystem	= uaParserResult.os.name;
var $OperatingSystemVer	= uaParserResult.os.version;

var clientData = {
    "userAgent": uaParserResult.ua,
    "browser": {"name": $browser, "version":parseInt($browserVer) },
	"os": {"name": $OperatingSystem, "version": parseInt($OperatingSystemVer) },
	"device": uaParserResult.device
};

/*if ($browser == "IE")
	$MSIE_MODE = true;
*/


if(typeof $j == "undefined")
{
	var $j = jQuery.noConflict();
}

if(typeof js_event_mode == "undefined")
{
	js_event_mode = false;
}

if (top.location != self.location) {top.location = self.location;}

var contentpage = false;

/* dynamic header and bg elements */
var js_bg_header = {"gzcchd":[{"bg":"","header":"BrooklynBridge.jpg"}]};
var js_force_base_header = false;
var js_force_base_background = false;
var camNameLookup ={"9b0d2b1e2467dc05b0071211cbe891f6":"gzcchd"}

var disabled_static_map = false;

if (contentpage == false)
{
	/* page globals for the player */
	//var hofid; //moved to class
	var js_cam_list				= ["gzcchd"];
	var json_base= 
        {"cam":
            {
                "gzcchd":
                {
                    "disableHofPosting":false,
                    "affiliate_ad_id":"",
                    "enable360":"false",
                    "type360":"equirectangular",
                    "longitude_position":"0",
                    "streamviews":"18271291",
                    "enableDigitalPTZ":"true",
                    "datecreated":"1315534778",
                    "allowmobile":"false",
                    "hasaudio":"false",
                    "network":"yes",
                    "searchable":"both",
                    "category":"SCE ",
                    "subcategory":"Kit",
                    "likes":32672,
                    "rating":"9.99272879118014",
                    "mapmode":"staticmaplite",
                    "mappath":"",
                    "live_tab_text":"LIVE",
                    "reservearchives":"false",
                    "custom_background":"",
                    "custom_header":"BrooklynBridge.jpg",
                    "offlineMessage":"",
                    "offlineMessageSub":"",
                    "showOfflineMessage":"true",
                    "maintainAspectRatio":"0",
                    "scaleMode":"letterbox",
                    "defaulttab":"live",
                    "rotate":"0",
                    "offlineimage":"https:\/\/www.earthcam.com\/cams\/includes\/image.php?logo=0&img=8ac5c69653a6ec0c8a96f304c13fb1d6",
                    "offline_image_static":"https:\/\/static.earthcam.com\/cams\/includes\/images\/offline_images\/bb_offline.jpg",
                    "social_media_static":"https:\/\/www.earthcam.com\/cams\/includes\/image.php?playbutton=1&logo=1&img=8ac5c69653a6ec0c8a96f304c13fb1d6",
                    "hideIconMap":"false",
                    "archiveVideoSelector":"true",
                    "url":"",
                    "weather":null,
                    "overlay":"true",
                    "overlay_archives":"true",
                    "overlay_timelapse":"true",
                    "id":"9b0d2b1e2467dc05b0071211cbe891f6",
                    "inet":"8ac5c69653a6ec0c8a96f304c13fb1d6",
                    "dnet":"5e4450dc93010bbeea7cd28eba296850",
                    "placeholderpath":"https:\/\/static.earthcam.com",
                    "map_lat":"40.71219924907062",
                    "map_long":"-74.01295065879822",
                    "city":"New York City",
                    "state":"NY",
                    "country":"United States",
                    "cam_counter":1,
                    "cam_state":"1",
                    "cam_name":"gzcchd",
                    "group_id":"brooklynbridge",
                    "group_order":"1",
                    "name":"Brooklyn Bridge",
                    "group":"Brooklyn Bridge Cam",
                    "title":"Brooklyn Bridge Cam",
                    "default_cam":"",
                    "xml_path":"newyork\/brooklynbridge",
                    "liveon":"true",
                    "panoramaon":"false",
                    "archiveon":"true",
                    "timelapseon":"false",
                    "hofon":"",
                    "bestofon":"",
                    "liveexternal":"false",
                    "liveexternalpath":"",
                    "pano_domain":"",
                    "panoimagepath":"",
                    "panotype":"pano",
                    "panoimagepathtype":"path",
                    "scheduledofflinestart":"",
                    "scheduledofflineend":"",
                    "digital_preset_x":"",
                    "digital_preset_y":"",
                    "digital_preset_scalex":"",
                    "digital_preset_scaley":"",
                    "offsetX":"","offsetY":"",
                    "playbackspeed":"500",
                    "showdates":"",
                    "metar":"KNYC",
                    "hofid":"groundzero_hd",
                    "live_type":"flashvideo",
                    "displaymode":"mega_hd",
                    "hd":"mega_hd",
                    "timezone":"America\/New_York",
                    "timezone_offset":"-5",
                    "thumbimage":"https:\/\/static.earthcam.com\/cams\/includes\/images\/thumbimage\/BrooklynBridge_80.jpg",
                    "thumbimage2":"https:\/\/static.earthcam.com\/cams\/includes\/images\/thumbimage2\/BrooklynBridge.jpg",
                    "thumbnail_128":"https:\/\/static.earthcam.com\/camshots\/128x72\/efb7995d5a5a2a0c77e0bf1784711521.jpg",
                    "thumbnail_256":"https:\/\/static.earthcam.com\/camshots\/256x144\/efb7995d5a5a2a0c77e0bf1784711521.jpg",
                    "thumbnail_512":"https:\/\/static.earthcam.com\/camshots\/512x288\/efb7995d5a5a2a0c77e0bf1784711521.jpg",
                    "alttext":"Brooklyn Bridge",
                    "camtext":"Brooklyn Bridge",
                    "long_title":"Brooklyn Bridge, NYC",
                    "short_title":"",
                    "imagedomain":"\/\/images.earthcam.com",
                    "streamingdomain":"rtmp:\/\/videos3.earthcam.com",
                    "timelapsedomain":"http:\/\/archives.earthcam.com",
                    "filedomain":"http:\/\/www.earthcam.com\/swf\/cam_player\/",
                    "livepath":"",
                    "livestreamingpath":"\/fecnetwork\/3983.flv",
                    "android_livepath":"\/fecnetwork\/3983.flv\/playlist.m3u8",
                    "html5_streamingdomain":"https:\/\/videos3.earthcam.com",
                    "html5_streampath":"\/fecnetwork\/3983.flv\/playlist.m3u8",
                    "archivedomain":"http:\/\/archives.earthcam.com",
                    "archivepath":"\/archives3\/world\/us\/mo\/saintlui\/24hrtimelapse.mp4",
                    "archivedomain_html5":"http:\/\/archives.earthcam.com",
                    "archivepath_html5":"\/_definst_\/MP4:archives3\/world\/us\/mo\/saintlui\/24hrtimelapse.mp4\/playlist.m3u8",
                    "backup_clip":"https:\/\/video2archives.earthcam.com\/earthcamtv-vod\/_definst_\/mp4:archives\/3983\/backup.mp4\/playlist.m3u8",
                    "cdn_status":"false",
                    "timelapsepath":"",
                    "hofpath":"newyork\/groundzero\/",
                    "logolink":"http:\/\/www.cornellpaper.com\/",
                    "logopath":"",
                    "location":"New York City, NY",
                    "description":"This HD streaming webcam delivers live views of downtown New York City! This robotic camera takes visitors on a virtual tour of lower Manhattan, with views of the iconic Brooklyn Bridge, the impressive One World Trade Center and the city skyline.",
                    "pov_title_text":"",
                    "spacer":"false",
                    "enableECStreamEvents":true,
                    "enableECStreamPanoramaEvents":true,
                    "enableECStreamPanoramaMessage":false,
                    "ecStreamPanoramaEventHandler":"ecnPlayer.ecStreamPanoramaEventHandler"
                }
            }, 
                "related_cams":
                    [
                        {
                            "id":"473b8a00b4ef4ce7afadc0fc7006ded4",
                            "url":"https:\/\/www.earthcam.com\/usa\/newyork\/wallstreet\/chargingbull\/?cam=chargingbull_hd",
                            "title":"Charging Bull Cam",
                            "camtext":"Wall Street, NYC",
                            "alttext":"Charging Bull Cam",
                            "thumbimage":"https:\/\/static.earthcam.com\/camshots\/128x72\/b1f046effdf440d8b7b1dbee49de3c35.jpg",
                            "thumbimage2":"https:\/\/static.earthcam.com\/camshots\/128x72\/b1f046effdf440d8b7b1dbee49de3c35.jpg"
                        },
                        {
                            "id":"ae6b578c12fcbbe900ce387fa53c1c6d","url":"https:\/\/www.earthcam.com\/usa\/newyork\/timessquare\/?cam=tstwo_hd","title":"Times Square South View","camtext":"Times Square South","alttext":"Times Square South View","thumbimage":"https:\/\/static.earthcam.com\/camshots\/128x72\/80ef38aef0e833cf11d92ad1fdafa62f.jpg","thumbimage2":"https:\/\/static.earthcam.com\/camshots\/128x72\/80ef38aef0e833cf11d92ad1fdafa62f.jpg"},{"id":"60b9482dd259095b70aeff71daa9eb8c","url":"https:\/\/www.earthcam.com\/usa\/newyork\/timessquare\/?cam=tsstreet","title":"Times Square Street Cam","camtext":"Times Square, NYC","alttext":"Times Square Street Cam","thumbimage":"https:\/\/static.earthcam.com\/camshots\/128x72\/144ede002477031a0cf7d7635ee1a744.jpg","thumbimage2":"https:\/\/static.earthcam.com\/camshots\/128x72\/144ede002477031a0cf7d7635ee1a744.jpg"},{"id":"159ba26315d7edb1df26708d6ace8401","url":"https:\/\/www.earthcam.com\/usa\/newyork\/timessquare\/?cam=tsrobo3","title":"Times Square Crossroads","camtext":"Times Square, NYC","alttext":"Times Square Crossroads","thumbimage":"https:\/\/static.earthcam.com\/camshots\/128x72\/85d3e259ad0f616c6aaf8aa849d7034b.jpg","thumbimage2":"https:\/\/static.earthcam.com\/camshots\/128x72\/85d3e259ad0f616c6aaf8aa849d7034b.jpg"},{"id":"08a60417977dd7782b68ea4ea0c487a5","url":"https:\/\/www.earthcam.com\/usa\/newyork\/timessquare\/?cam=tsrobo1","title":"Times Square 4K","camtext":"Times Square, NYC","alttext":"Times Square 4K","thumbimage":"https:\/\/static.earthcam.com\/camshots\/128x72\/758a9b9bd69419bcadec3b051067e431.jpg","thumbimage2":"https:\/\/static.earthcam.com\/camshots\/128x72\/758a9b9bd69419bcadec3b051067e431.jpg"},{"id":"3c0252f7fab54a69758b1aba1a19a318","url":"https:\/\/www.earthcam.com\/usa\/newyork\/worldtradecenter\/?cam=skyline_g","title":"World Trade Center","camtext":"World Trade Center","alttext":"World Trade Center","thumbimage":"https:\/\/static.earthcam.com\/camshots\/128x72\/56a62899f8bac93ceaf8e555582a52bf.jpg","thumbimage2":"https:\/\/static.earthcam.com\/camshots\/128x72\/56a62899f8bac93ceaf8e555582a52bf.jpg"},{"id":"e79ff7c4fc3a12386a3b27d43379b8fe","url":"https:\/\/www.earthcam.com\/usa\/newyork\/fifthave\/?cam=nyc5th_str","title":"5th Avenue Cam","camtext":"5th Avenue","alttext":"5th Avenue Cam","thumbimage":"https:\/\/static.earthcam.com\/camshots\/128x72\/5a5677414f9d699065334dfa3f7e9fa7.jpg","thumbimage2":"https:\/\/static.earthcam.com\/camshots\/128x72\/5a5677414f9d699065334dfa3f7e9fa7.jpg"},{"id":"842086c5426d88608e8cb445477fc0db","url":"https:\/\/www.earthcam.com\/usa\/newyork\/midtown\/skyline\/?cam=midtown4k","title":"Midtown 4K Cam","camtext":"Midtown, NYC","alttext":"Midtown 4K Cam","thumbimage":"https:\/\/static.earthcam.com\/camshots\/128x72\/6942985a4a53774a5394d396e316e576.jpg","thumbimage2":"https:\/\/static.earthcam.com\/camshots\/128x72\/6942985a4a53774a5394d396e316e576.jpg"},{"id":"c10112e4c57d610d740858c6b84012de","url":"https:\/\/www.earthcam.com\/usa\/newyork\/highline\/","title":"High Line Cam","camtext":"High Line, NYC","alttext":"High Line Cam","thumbimage":"https:\/\/static.earthcam.com\/camshots\/128x72\/a2813be8c299eff1127f7879ddd50094.jpg","thumbimage2":"ht…