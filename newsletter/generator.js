/* 
	JANDI newsletter generator
	last-update : 2018/12/21
	
*/

var tempLogoURL = "./temp/jandi+logo.png";
var liveLogoURL = "https://s3-ap-northeast-1.amazonaws.com/jandi-ftp/marketing/eDM/Brown+Newsletter+test/2018.11+News+letters/jandi+logo.png";
var currentMonth;
var currentYear;

moment.locale('ko');
currentMonth = moment().format('MMMM'); //moment().format('LT');
currentYear = moment().format('YYYY');
console.log(currentMonth, currentYear);
  
// 계산된 시간을 각각의 요소에 대입
$(".monthInfo").text(currentMonth);
$(".yearInfo").text(currentYear).appendTo(".monthInfo");

$("html img.logo").attr('src', liveLogoURL);

var contentsObject = new Object(); // 섹션과 컨텐트 정보를 섹션별로 묶어둘 객체

var sectionObj = {}; //섹션 객체
var contentObj = {}; //컨텐트 객체
var sectionLength; //섹션 객체의 길이

var filepath = "./json/JANDI Newsletter Content Template.json";


// content-title 이 ""인 경우 두번째 줄을 생성하지 않음.

var gridContentTemplate = '\
<table class="content-template" content-id="" width="" border="0" cellpadding="0" cellspacing="0">\
	<tr>\
		<td>\
			<a class="content-link" href="" target="_blank">\
				<img class="content-thumbnail" src="" width="100%" >\
			</a>\
		</td>\
	</tr>\
	<tr>\
		<td style="padding: 1em 0 0px 0; background-color:#ffffff;">\
			<a class="content-link" href="" target="_blank" style="text-decoration:none;">\
				<span class="content-title" style=" color:#00aaea;font-weight: bold;"></span>\
			</a>\
			<p class="content-description" style="font-size:13px;color:#777777"></p>\
			<p class="content-author" style="color: #aaaaaa; margin-bottom: 0;"></p>\
		</td>\
	</tr>\
</table>\
';


var listContentTemplate = '\
<table class="content-template" content-id="" width="" border="0" cellpadding="0" cellspacing="0" >\
	<tr>\
		<td width="240" valign="top" rowspan="4">\
	        <a class="content-link" href="" target="_blank">\
				<img class="content-thumbnail" src="" width="100%">\
	        </a>\
		</td>\
	</tr>\
	<tr>\
		<td style="padding: 0 0 0 1em;" valign="top">\
			<a class="content-link" href="" target="_blank" style="text-decoration:none;">\
				<span class="content-title" style=" color:#00aaea;font-size: 16px;font-weight: bold;"></span>\
			</a>\
		</td>\
	</tr>\
	<tr>\
		<td style="padding: 0 0 0 1em;" valign="top">\
			<p class="content-description" style="font-size:13px;color:#777777; margin-top: 0.5em; margin-bottom: 0;"></p>\
		</td>\
	</tr>\
	<tr>\
		<td  style="padding: 0 0 0 1em;" valign="bottom">\
			<p class="content-author" style="color: #aaaaaa; ; margin: 0;"></p>\
		</td>\
	</tr>\
</table>\
';


var sectionTemplate = '\
<tr class="section-template" section-id="" section-order="" section-layout="">\
	<td bgcolor="#ffffff" style="padding: 24px 0;">\
    	<table border="0" cellpadding="0" cellspacing="0" width="600">\
    		<tr>\
            	<th bgcolor="#ebebeb" style="padding: 6px 12px 5px; text-align: left;">\
                	<strong class="section-title" style="font-size: 20px;color: #000;"></strong>\
				</th>\
				<th width="20" bgcolor="#e2e2e2" >\
				</th>\
			</tr>\
		</table>\
		<table class="layout-template"></table>\
	</td>\
</tr>\
';


var col1LayoutTemplate = '\
<table class="layout-template" border="0" cellpadding="0" cellspacing="0" width="600">\
    <tr class="repeatable-row">\
        <td class="repeatable-col" width="600" style="padding: 20px 0 0 0; background-color:#ffffff;">\
            <table class="content-template"></table>\
        </td>\
    </tr>\
</table>\
';


var col2LayoutTemplate = '\
<table class="layout-template" border="0" cellpadding="0" cellspacing="0" width="600">\
    <tr class="repeatable-row">\
        <td class="repeatable-col" width="300" valign="top" style="padding: 20px 5px 0 0; background-color:#ffffff;">\
            <table class="content-template"></table>\
        </td>\
        <td class="repeatable-col" width="300" valign="top" style="padding: 20px 0 0 5px; background-color:#ffffff;">\
            <table class="content-template"></table>\
        </td>\
    </tr>\
</table>\
';


/* listLayout template 은 col-1-grid와 동일         <td class="col-divider" width="10"></td>\
var listLayoutTemplate = '\
<table class="layout-template" border="0" cellpadding="0" cellspacing="0" width="600">\
    <tr class="repeatable-row">\
        <td width="600" style="padding: 20px 0 0 0; background-color:#ffffff;">\
            <table class="content-template"></table>\
        </td>\
    </tr>\
</table>\
';
*/




function getJSON(filepath, callback){
  
  $.getJSON(filepath, function(parsedData) {
    
    sectionObj = parsedData["section"];
    sectionLength = sectionObj.length;
    contentObj = parsedData["contents"];
    
    for (var i = 0; i < sectionObj.length; i++) {
	  contentsObject[i] = $.makeArray(sectionObj[i]);
	}
	
	for (var i = 0; i < contentObj.length; i++) {
	  
	  var targetSectionID = contentObj[i].targetSectionID;
	  
	  contentsObject[targetSectionID].push(contentObj[i]);
	   
	}

    callback(contentsObject);
    
  })
  .fail(function() { console.log("error") });
};


function generateTemplate(contentsObject) {
  
  console.log(contentsObject);
  
  /* 
  $('body').append('<p class="raw-txt"></p>')
  .find('.raw-txt').text(JSON.stringify(contentsObject, null, "\t")).attr('style','white-space:pre-wrap');
  */
  
  generateSection(contentsObject);
  
  generateLayout(contentsObject);
  
  generateContent(contentsObject, 0);
  generateContent(contentsObject, 1);
  generateContent(contentsObject, 2);
  generateContent(contentsObject, 3);
 
}



getJSON(filepath, generateTemplate);






/* 
 * generateTemplate 함수에서 generateSectionNLayout, generateContent 함수를 각각 실행 (반복 여부는 각 섹션 배열의 길이에 따라 다르도록..)
 *
 * 필요한 section entity : sectionId, sectionOrder, sectionLayout, sectionTitle, 
 * sectionLayout 값이 col-1-grid이거나 list 인 경우 col1LayoutTemplate 치환 (그외는 col2LayoutTemplate 치환)
 * 필요한 content entity : contentID, contentLink, contentThumbnail, contentTitle, contentDescription, contentAuthor
 *
 * contentCount(섹션 객체외에 컨텐트 객체를 몇개나 가지고 있는지)는 함수 내에서 처리
 * 
 */
 


function generateSection(contentsObject) {
  
  //nth-child의 경우 모든 tr을 카운트하므로 header section tr을 포함. 따라서 2부터 카운트
  for(var i = 0;i < sectionLength;i++) {
	
	var childrenCount = i+2;
	//console.log(i, childrenCount);
	
	if (childrenCount < 5) {
      $('.section-template:nth-child('+childrenCount+')')
      .replaceWith(sectionTemplate).clone()
      .insertAfter('.section-template:nth-child('+childrenCount+')').replaceWith(sectionTemplate);
    }
    
    $('.section-template:nth-child('+childrenCount+')')
    .attr('section-id', contentsObject[i][0].sectionID)
    .attr('section-order', contentsObject[i][0].sectionOrder)
    .attr('section-layout', contentsObject[i][0].sectionLayout)
    .find('.section-title').text(contentsObject[i][0].sectionTitle);
    
  }
  
}


function generateLayout(contentsObject) {
  
  for(var i = 0;i < sectionLength;i++) {
    
    var contentLength = contentsObject[i].length -1;
    //console.log('contentLength', contentLength, contentsObject[i][0].sectionLayout);
    
    if(contentsObject[i][0].sectionLayout=="col-1-grid" || contentsObject[i][0].sectionLayout=="list") {
      $('.section-template[section-id="'+i+'"]').find('.layout-template').replaceWith(col1LayoutTemplate);
      var targetID = contentsObject[i][0].sectionID;
      
      //list, col-1-grid layout의 경우 contentLength가 2 이상일 경우 해당 값 만큼 row를 복제한다.
      if (contentLength > 1) {
	  	
        for( var cloneCount = 1; cloneCount < contentLength; cloneCount++ ) {

	      // console.log(i, targetID, contentLength, cloneCount);
	      $('.section-template[section-id="'+targetID+'"]').find('.repeatable-row:nth-child('+cloneCount+')').clone()
	      .insertAfter('.section-template[section-id="'+targetID+'"] .repeatable-row:nth-child('+cloneCount+')');
        }
      }
      
    } 
    else if( contentsObject[i][0].sectionLayout == "col-2-grid") {
	  
	  $('.section-template[section-id="'+i+'"]').find('.layout-template').replaceWith(col2LayoutTemplate);
	  var targetID = contentsObject[i][0].sectionID;
	  
	  if (contentLength > 1 ) {
	    
	    for( var cloneCount = 1; cloneCount < contentLength/2; cloneCount++ ) {
		  
	      //console.log(i, targetID, contentLength, contentLength/2 , cloneCount);
	      $('.section-template[section-id="'+targetID+'"]').find('.repeatable-row:nth-child('+cloneCount+')').clone()
	      .insertAfter('.section-template[section-id="'+targetID+'"] .repeatable-row:nth-child('+cloneCount+')');
        }
        
	  }
	  
    }
  }
  
}


var $targetContent;
var $targetParentContent;

function generateContent(contentObject, targetNum) {
  
  var targetObject = contentObject[targetNum];
  //console.log(targetObject, targetNum);
  
  var contentLength = targetObject.length -1;
  //console.log(contentLength);
  
  $targetContent = $('.section-template[section-id="'+targetNum+'"] .content-template');
  $targetParentContent = $('.section-template[section-id="'+targetNum+'"] .layout-template');
  
  for(var i = 0;i < contentLength;i++) {
    var childOrder = i+1; //0, 1, 2, 3 ,...
    var contentWidth; //600 or 295
    var contentNode; //list layout인 경우 repeatable-row > repeatable-col 형태로 보정
    var titleFontSize;
    
    //console.log(targetObject[0].sectionLayout);
    
    if ( targetObject[0].sectionLayout == "list") {
      $targetContent.replaceWith(listContentTemplate);
      contentWidth = 600;
      contentNode = ".repeatable-row:nth-child("+childOrder+") .repeatable-col:nth-child(1)";
      
    }
    else if (targetObject[0].sectionLayout == "col-1-grid") {
	  $targetContent.replaceWith(gridContentTemplate);
	  contentWidth = 600;
	  contentNode = ".repeatable-row:nth-child("+childOrder+") .repeatable-col:nth-child(1)";
	  titleFontSize = "1.17em";
    }
    else if (targetObject[0].sectionLayout == "col-2-grid") {
	  $targetContent.replaceWith(gridContentTemplate);
	  contentWidth = 295;
	  titleFontSize = "16px";
	  
	  var sectionIndex = Math.ceil(childOrder/2);
	  var contentIndex;
	  
	  /* 1,2 인 경우 row1에, 3,4인 경우 row2에 5,6인 경우 row3을 선택할 수 있게함. */
	  if ( (childOrder/2) - sectionIndex < 0 ) {
		contentIndex = 1;
	  }
	  else {
		contentIndex = 2;
	  }  
	  
	  contentNode = ".repeatable-row:nth-child("+sectionIndex+") .repeatable-col:nth-child("+contentIndex+")";
	  
	  // 1-1-1, 1-2-2, 2-1-3, 2-2-4, 3-1-5, 3-2-6, ...
	  //console.log("sectionIndex contentIndex childOrder", sectionIndex, contentIndex, childOrder);
	  
    }
    
    
    // content-title 이 ""인 경우 두번째 줄 지움
    if( targetObject[childOrder].contentTitle == "" ) {
	  $($targetContent.selector).find('tr:nth-child(2)').remove();
    }
   
    // to-do : content가 홀수일때 col-2-grid의 경우 마지막 table 제거 필요
    
    
    $($targetParentContent.selector).find(contentNode)
    .find(".content-template").attr('content-id', targetObject[childOrder].contentID).attr('width', contentWidth);
    
    $($targetParentContent.selector).find(contentNode)
    .find(".content-link").attr('href', targetObject[childOrder].contentLink);
    
    $($targetParentContent.selector).find(contentNode)
    .find(".content-thumbnail").attr('src', targetObject[childOrder].contentThumbnail);
    
    $($targetParentContent.selector).find(contentNode)
    .find(".content-title").html(targetObject[childOrder].contentTitle.replace(/\n/g, "<br />")).css('font-size', titleFontSize);
    
    $($targetParentContent.selector).find(contentNode)
    .find(".content-description").html(targetObject[childOrder].contentDescription);
    
    $($targetParentContent.selector).find(contentNode)
    .find(".content-author").html(targetObject[childOrder].contentAuthor);

  }
  
}

  
