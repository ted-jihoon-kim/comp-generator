/* 
	Template Downloader 
	last-update : 2018/12/21

*/

var htmlPreText = "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>";
var convertedString;

//download current template.
$('#downloadTemplate').click(function() {

	
	convertedString = $('html').html();
	
	convertedString = convertedString.replace(/<script.*<\/script>/g, '') //스크립트 영역 제거
					  .replace(/<!--.*-->/g, '') //주석 제거
					  .replace(/<button.*<\/button>/g, '') 
					  .replace(/<\/body>/, '</body>\n</html>')
					  
					  .replace(/<head>/, htmlPreText +"\n<html>\n<head>").replace(/\n/g, "\n"); //줄바꿈 적용
					  
					 
	
	//external library (http://danml.com/download.html)
	//download(data, strFileName, strMimeType);
	
	console.log(convertedString)
	download(convertedString, 'JANDI_newsletter.html', "text/html");
	
	
});
