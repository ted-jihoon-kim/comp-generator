/* 
	JANDI Newsletter Template Downloader 
	last-update : 2018/12/26

*/

var htmlPreText = "<!DOCTYPE HTML>";
var titleTemplate = "JANDI Newsletter ";
var convertedString;


//download current template.
$('#downloadTemplate').click(function() {
	
	//페이지 타이틀 보정
	titleTemplate = titleTemplate + currentMonth + "_"+ currentYear;
	$('title').text(titleTemplate);
	
	convertedString = $('html').html();
	
	convertedString = convertedString.replace(/<script.*<\/script>/g, '') //스크립트 태그 사이의 문자 제거
					  .replace(/<!--.*-->/g, '') //주석 사이의 문자 제거
					  .replace(/<div.*<\/div>/g, '') //하단 버튼 영역 문자 제거
					  .replace(/<\/body>/, '</body>\n</html>') //html 닫는 태그 추가
					  .replace(/\n{2,9}/g, '\n') //개행이 2회 이상 9회 미만 반복된 영역 제거
					  .replace(/\r{2,9}/g, '\n') 
					  .replace(/<\/tr>\n{2,9}<tr/g, '\n') // </tr> - <tr 사이의 개행 제거
					  .replace(/<\/title>\n*<\/head>/m, '\n') // </title> - <head> 사이의 개행 제거
					  .replace(/<\/table>\n*<\/body>/m, '\n') // </table> - <body> 사이의 개행 제거
					  .replace(/<head>/, htmlPreText +"\n<html>\n<head>"); //doctype, head 태그 추가
					 
	
	//external library (http://danml.com/download.html)
	//download(data, strFileName, strMimeType);
	
	//console.log(convertedString)
	download(convertedString, titleTemplate+'.html', "text/html");
	
	
});
