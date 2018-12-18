

/* 
	JANDI newsletter composer

*/



var keyObject = new Object();

var sectionObj = {};
var contentObj = {};



var filepath = "http://localhost:8080/newsletter/json/JANDI Newsletter Content Template.json";

function getJSON(filepath, callback){
  $.getJSON(filepath, function(parsedData) {
    sectionObj = parsedData["section"];
    contentObj = parsedData["contents"];
    
    callback(sectionObj,contentObj);
  })
  .fail(function() { console.log("error") });
};

function generateTemplate(sectionObj, contentObj){
  console.log(sectionObj, contentObj);
  $("td[section-id=0] .section-title").text(sectionObj[0].sectionTitle);
  $("td[section-id=1] .section-title").text(sectionObj[1].sectionTitle);
  $("td[section-id=2] .section-title").text(sectionObj[2].sectionTitle);
  $("td[section-id=3] .section-title").text(sectionObj[3].sectionTitle);
  
  $("table[content-id=11] .contents-link").attr('href', contentObj[0].contentLink);
  $("table[content-id=11] .contents-thumbnail").attr('src', contentObj[0].contentThumbnail);
  $("table[content-id=11] .contents-title").html(contentObj[0].contentTitle.replace(/\n/g, "<br />"));
  $("table[content-id=11] .contents-description").html(contentObj[0].contentDescription);
  $("table[content-id=11] .contents-author").html(contentObj[0].contentAuthor);
  
  $("table[content-id=12] .contents-link").attr('href', contentObj[1].contentLink);
  $("table[content-id=12] .contents-thumbnail").attr('src', contentObj[1].contentThumbnail);
  $("table[content-id=12] .contents-title").html(contentObj[1].contentTitle.replace(/\n/g, "<br />"));
  $("table[content-id=12] .contents-description").html(contentObj[1].contentDescription);
  $("table[content-id=12] .contents-author").html(contentObj[1].contentAuthor);
  
  $("table[content-id=13] .contents-link").attr('href', contentObj[2].contentLink);
  $("table[content-id=13] .contents-thumbnail").attr('src', contentObj[2].contentThumbnail);
  $("table[content-id=13] .contents-title").html(contentObj[2].contentTitle.replace(/\n/g, "<br />"));
  $("table[content-id=13] .contents-description").html(contentObj[2].contentDescription);
  $("table[content-id=13] .contents-author").html(contentObj[2].contentAuthor);
  
  $("table[content-id=14] .contents-link").attr('href', contentObj[3].contentLink);
  $("table[content-id=14] .contents-thumbnail").attr('src', contentObj[3].contentThumbnail);
  $("table[content-id=14] .contents-title").html(contentObj[3].contentTitle.replace(/\n/g, "<br />"));
  $("table[content-id=14] .contents-description").html(contentObj[3].contentDescription);
  $("table[content-id=14] .contents-author").html(contentObj[3].contentAuthor);
  
  $("table[content-id=15] .contents-link").attr('href', contentObj[4].contentLink);
  $("table[content-id=15] .contents-thumbnail").attr('src', contentObj[4].contentThumbnail);
  $("table[content-id=15] .contents-title").html(contentObj[4].contentTitle.replace(/\n/g, "<br />"));
  $("table[content-id=15] .contents-description").html(contentObj[4].contentDescription);
  $("table[content-id=15] .contents-author").html(contentObj[4].contentAuthor);

  $("table[content-id=16] .contents-link").attr('href', contentObj[5].contentLink);
  $("table[content-id=16] .contents-thumbnail").attr('src', contentObj[5].contentThumbnail);

}

getJSON(filepath, generateTemplate);



/*
    
    for (var i = 0; i < keyObject.length; i++) {
	  sectionObj[keyObject[i].KEY] = keyObject[i].KO;
	  ENL10nObj[keyObject[i].KEY] = keyObject[i].EN;
	  JAL10nObj[keyObject[i].KEY] = keyObject[i].JA;
	  TCL10nObj[keyObject[i].KEY] = keyObject[i]["TC(zh-tw)"];
	  SCL10nObj[keyObject[i].KEY] = keyObject[i]["SC(zh-cn)"];
	}
    
*/
   
   
   
   
        