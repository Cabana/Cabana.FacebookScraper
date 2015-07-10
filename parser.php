<?php header("Access-Control-Allow-Origin: *");

$context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));

if (isset($_GET['parse'])) {

$url = $_GET['parse'];

$sitemap = file_get_contents($url, false, $context);
$sitemapXML = simplexml_load_string($sitemap);

$sitemapJSON = json_encode($sitemapXML);

print $sitemapJSON;

exit;
}
?>

<!doctype html>
<html>
	<head>
		<title>Cabana.FacebookScraper</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	</head>
	<body>
		<input type="text" name="parse" data-scrape-url />
		<input type="submit" value="Scrape!" data-scrape />
		<div data-scrape-status></div>

		<script src="build/Cabana.FacebookScraper.js"></script>
	</body>
</html>