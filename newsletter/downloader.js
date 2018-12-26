/* 
	JANDI Newsletter Template Downloader 
	last-update : 2018/12/26

*/

var htmlPreText = "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>";
var titleTemplate = "JANDI Newsletter ";
var convertedString;


//download current template.
$('#downloadTemplate').click(function() {
	
	//페이지 타이틀 보정
	titleTemplate = titleTemplate + currentMonth + "_"+ currentYear;
	$('title').text(titleTemplate);
	
	convertedString = $('html').html();
	
	convertedString = convertedString.replace(/<script.*<\/script>/g, '') //스크립트 영역 제거
					  .replace(/<!--.*-->/g, '') //주석 제거
					  .replace(/<div.*<\/div>/g, '') //하단 버튼 영역 제거
					  .replace(/<\/body>/, '</body>\n</html>') //html 닫는 태그 추가
					  
					  .replace(/<head>/, htmlPreText +"\n<html>\n<head>").replace(/\n/g, "\n"); //doctype, head 태그 추가
					  
					 
	
	//external library (http://danml.com/download.html)
	//download(data, strFileName, strMimeType);
	
	//console.log(convertedString)
	download(convertedString, titleTemplate+'.html', "text/html");
	
	
});
