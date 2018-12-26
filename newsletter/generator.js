/* 
	JANDI Newsletter Generator
	last-update : 2018/12/26
	
*/

var localLogoURL = "./img_local/jandi+logo.png"; // local 테스트용
var liveLogoURL = "https://s3-ap-northeast-1.amazonaws.com/jandi-ftp/marketing/eDM/Brown+Newsletter+test/2018.11+News+letters/jandi+logo.png"; //ftp 주소
var currentMonth;
var currentYear;

moment.locale('ko');
currentMonth = moment().format('MMMM'); //moment().format('LT');
currentYear = moment().format('YYYY');
//console.log(currentMonth, currentYear);
  
// 계산된 시간을 각각의 요소에 대입
$(".monthInfo").text(currentMonth);
$(".yearInfo").text(currentYear).appendTo(".monthInfo");

$("html img.logo").attr('src', liveLogoURL);

var contentsObject = new Object(); // 섹션과 컨텐트 정보를 섹션별로 묶어둘 객체

var sectionObj = {}; //섹션 객체
var contentObj = {}; //컨텐트 객체
var sectionLength; //섹션 객체의 길이

//var filepath = "./json/JANDI Newsletter Content Template.json";
//var filepath = "./json/JANDI Newsletter Content Template(dummy).json";
var filepath = "";




let jsonURL = prompt('템플릿을 생성할 JSON 파일의 URL 주소를 입력하세요');
filepath = jsonURL;


if(filepath == "" || filepath == null) {
  alert("URL주소를 확인해주세요");
  let jsonURL = prompt('불러올 JSON 파일의 URL 주소를 입력하세요');
  filepath = jsonURL;
}

console.log("입력한 URL 주소 : ", filepath);


var gridContentTemplate = $.ajax({
      type:"GET",
      url: './template/grid_content.html',
        success:function(html) {
          var tempString = JSON.stringify(html);
          gridContentTemplate = tempString.replace(/\\"/g, '"') // \" -> " 로 교체
                 					      .replace(/\\n/g, "\n") //줄바꿈 적용
                 					      .replace(/\\t/g, "	") //탭 적용
                 					      .replace(/\"</g, "<") //앞뒤 따옴표 제거
                 					      .replace(/\>"/g, ">");
                 							 
          //console.log(gridContentTemplate); //plain text

        }
        
      });


var listContentTemplate = $.ajax({
      type:"GET",
      url: './template/list_content.html',
        success:function(html) {
          var tempString = JSON.stringify(html);
          listContentTemplate = tempString.replace(/\\"/g, '"') // \" -> " 로 교체
                 					      .replace(/\\n/g, "\n") //줄바꿈 적용
                 					      .replace(/\\t/g, "	") //탭 적용
                 					      .replace(/\"</g, "<") //앞뒤 따옴표 제거
                 					      .replace(/\>"/g, ">");
                 							 
          //console.log(listContentTemplate); //plain text

        }
        
      });


var sectionTemplate = $.ajax({
      type:"GET",
      url: './template/section.html',
        success:function(html) {
          var tempString = JSON.stringify(html);
          sectionTemplate = tempString.replace(/\\"/g, '"') // \" -> " 로 교체
                 					      .replace(/\\n/g, "\n") //줄바꿈 적용
                 					      .replace(/\\t/g, "	") //탭 적용
                 					      .replace(/\"</g, "<") //앞뒤 따옴표 제거
                 					      .replace(/\>"/g, ">");
                 							 
          //console.log(sectionTemplate); //plain text

        }
        
      });



var col1LayoutTemplate = $.ajax({
      type:"GET",
      url: './template/col_1_layout.html',
        success:function(html) {
          var tempString = JSON.stringify(html);
          col1LayoutTemplate = tempString.replace(/\\"/g, '"') // \" -> " 로 교체
                 					      .replace(/\\n/g, "\n") //줄바꿈 적용
                 					      .replace(/\\t/g, "	") //탭 적용
                 					      .replace(/\"</g, "<") //앞뒤 따옴표 제거
                 					      .replace(/\>"/g, ">");
                 							 
          //console.log(col1LayoutTemplate); //plain text

        }
        
      });
      
var col2LayoutTemplate = $.ajax({
      type:"GET",
      url: './template/col_2_layout.html',
        success:function(html) {
          var tempString = JSON.stringify(html);
          col2LayoutTemplate = tempString.replace(/\\"/g, '"') // \" -> " 로 교체
                 					      .replace(/\\n/g, "\n") //줄바꿈 적용
                 					      .replace(/\\t/g, "	") //탭 적용
                 					      .replace(/\"</g, "<") //앞뒤 따옴표 제거
                 					      .replace(/\>"/g, ">");
                 							 
          //console.log(col2LayoutTemplate); //plain text

        }
        
      });




/* 외부 HTML을 불러오는 것으로 변경 */


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
    $('.download-button-layer').css('display','block');
    $('body').css('opacity',1);
  })
  .fail(function() {
	console.log("error");
	//&#9874;
	
	$('body').html('<div style="position: absolute; width: 100%; top: 50%; transform: translateY(-50%);"><i style="font-size: 42px;font-style: normal;">☹</i><br><span>JSON 파일 불러오기를 실패했습니다. 새로고침 후 다시 시도해 주세요.</span></div>').css('text-align','center').css('opacity',1);
	$('.download-button-layer').css('display','none');
	$('table').css('display','none');
  });
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

  
