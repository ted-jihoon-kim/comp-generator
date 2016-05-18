/* 
	JANDI Component Generator
	last-update : 2016/04/28
	
	@author : ted.kim@tosslab.com
*/



var selectedClass; //selected class variable.
var selectedKeyID; //selected key ID.
var currentComponent = 'jui-button'; //current component name.
var classListObject = new Object(); // create new object which contains all class array lists.


$(document).ready(function() {

  initGenerator();

});



/* 
	Initialize Component Generator
*/

function initGenerator() {
  
  console.log("init - current component is :", currentComponent); //현재 컴포넌트를 체크.
  
  updateSelectOptions(currentComponent); //선택한 컴포넌트에 맞게 셀렉트 버튼을 재구성.
  
  updateCurrentComponentCodeToPreivew(); //선택된 컴포넌트를 프리뷰영역에 띄운다.
  
  updatePreviewComponentsCode(); //프리뷰 코드를 업데이트 한다.
  
  resetSelectOptions(); //컴포넌트 변경 시, 폼 셀렉트 이외의 것들도 리셋 한다.
  
}

/* 컴포넌트 관련 이외의 셀렉트를 리셋하는 함수 */
function resetSelectOptions() {
  //TBD.
}


/* 
	Form 항목 2,3,4 번째 셀렉트 태그의 옵션을 재구성하는 함수.
	컴포넌트 선택시에만 호출된다. (key : Component1stDepth)
*/

function updateSelectOptions(selectedComponent) {
  
  /* 기존 셀렉트 버튼의 옵션을 제거 */
  for(var formCount = 2; formCount < 5; formCount++) {
	$('#form'+formCount+'Depth > select').empty();
  }
  
  var targetComponent; //타겟 컴포넌트의 클래스 옵션 리스트.
  
  if(currentComponent == "jui-button") {
	targetComponent = 'Button';
  }
  else if (currentComponent == "jui-nav--tab") {
	targetComponent = 'NavTab';
  }
  
  /* 매치되는 배열의 클래스를 셀렉트 하위의 옵션으로 삽입 */
  for(var optionCount = 2; optionCount < 5; optionCount++) {
	$('#form'+optionCount+'Depth > select').attr('id',targetComponent+optionCount+'Depth');
	replaceSelectOptions('#form'+optionCount+'Depth', targetComponent+optionCount+'Depth');
  }
    
}


/* 선택된 컴포넌트에 사용되는 클래스 배열을 삽입하는 함수 */
function replaceSelectOptions(targetOption, currentOption) {
  
  var currentOptionArray = classListObject[currentOption];
  var currentOptionArrayLength = currentOptionArray.length;

  //console.log(currentOptionArray, currentOptionArrayLength);
  
  for(var secondArrayCount=1; secondArrayCount<currentOptionArrayLength; secondArrayCount++) {
	$(targetOption + '> select').append('<option>' + currentOptionArray[secondArrayCount]+ '</option>');
  }
  
}


function updateCurrentComponentCodeToPreivew() {
  $('.output-section.preview').empty(); //아웃풋 섹션을 비운다.
  
  //현재 컴포넌트가 버튼 일 경우
  if(currentComponent == 'jui-button') {
	
	$('.output-section.preview').append(buttonComponentCode);
	
	$('#preview-components').bind( 'click', componentClick );
  }
  
  //현재 컴포넌트가 네비게이션 > 탭 일 경우
  else if(currentComponent == 'jui-nav--tab') {
	$('.output-section.preview').append(navTabComponentCode);
	
	$('#preview-components > ul > li > a').bind( 'click', componentClick );
  }
  
  
  
}



//버튼 컴포넌트 html (tip : 스페이스 + \ 입력하면 변수 안에서도 줄바꿈을 표현할 수 있음! )

var buttonComponentCode = 
"<button id='preview-components' \
         class='jui-button--round jui-type--body--default jui-color--primary'> \
   <i class='icon-angle-down'></i> \
   <i class='editable icon-check'></i> \
   <span>Confirm</span> \
   <label>7</label> \
</button>";

//buttonComponentCode = buttonComponentCode.replace(/\s+/g, '');


//네비게이션 - 탭 컴포넌트 html
var navTabComponentCode = 
"<div id='preview-components' \
      class='jui-nav--tab jui-nav--tab_round jui-type--body--default jui-color--primary'> \
   <ul class='jui-nav--tab--tabs'> \
     <li><a class='is_active'> \
       <i class='editable icon-check'></i> \
       <span>First tab title</span> \
     </a></li> \
     <li><a> \
       <i class='editable icon-check'></i> \
       <span>Second tab title</span> \
     </a></li> \
   </ul> \
 </div>";











/*
	Component Class Arrays
	(same as select's ID)
*/

var Component1stDepthAr = ['',
						   'jui-button',
						   'jui-nav--tab' ];
classListObject.Component1stDepth = Component1stDepthAr;



var Button2DepthAr = ['',
					  'jui-button--round',
					  'jui-button--round_angular',
					  'jui-button--round_circular',
					  'jui-button--text' ];
classListObject.Button2Depth = Button2DepthAr;
//console.log(classListObject);
			  
var Button3DepthAr = ['',
					  'default',
					  'is_invert',
					  'is_outline',
					  'is_outline_invert',
					  'is_transparent',
					  'is_icon_only',
					  'is_icon_only_invert',
					  'is_icon_only_transparent' ];
classListObject.Button3Depth = Button3DepthAr;
//console.log(classListObject);
  
var Button4DepthAr = ['',
				      'default',
				      'has_left_icon',
				      'has_right_icon',
				      'has_dn_arrow',
				      'has_arrow_and_count' ];
classListObject.Button4Depth = Button4DepthAr;
//console.log(classListObject);




var NavTab2DepthAr = ['',
				      'jui-nav--tab_round',
				      'jui-nav--tab_angular' ];
classListObject.NavTab2Depth = NavTab2DepthAr;
//console.log(classListObject);

var NavTab3DepthAr = ['',
				      'default',
				      'is_border' ];
classListObject.NavTab3Depth = NavTab3DepthAr;
//console.log(classListObject);

var NavTab4DepthAr = ['',
				      'default',
				      'has_left_icon' ];
classListObject.NavTab4Depth = NavTab4DepthAr;
//console.log(classListObject);




var Color1stDepthAr = ['',
					 'jui-color--primary',
					 'jui-color--brand',
					 'jui-color--mono',
					 'jui-color--alert',
					 'jui-color--notification',
					 'jui-color--white' ];
classListObject.Color1stDepth = Color1stDepthAr;
//console.log(classListObject);
	
			 
var Color4thDepthAr = ['',
					 'default',
					 'hover',
					 'active',
					 'focus',
					 'disabled'];
classListObject.Color4thDepth = Color4thDepthAr;
//console.log(classListObject);


var Type1stDepthAr = ['',
					'jui-type--heading--large',
					'jui-type--heading--default',
					'jui-type--heading--small',
					'jui-type--body--name',
					'jui-type--body--default',
					'jui-type--body--small',
					'jui-type--caption--name',
					'jui-type--caption--default',
					'jui-type--caption--small' ];
classListObject.Type1stDepth = Type1stDepthAr;
//console.log(classListObject);
				

var Grid1stDepthAr = ['',
					'auto',
					'jui-grid--1_of_12',
					'jui-grid--2_of_12',
					'jui-grid--3_of_12',
					'jui-grid--4_of_12',
					'jui-grid--5_of_12',
					'jui-grid--6_of_12',
					'jui-grid--7_of_12',
					'jui-grid--8_of_12',
					'jui-grid--9_of_12',
					'jui-grid--10_of_12',
					'jui-grid--11_of_12',
					'jui-grid--12_of_12' ];
classListObject.Grid1stDepth = Grid1stDepthAr;
//console.log(classListObject);				

					
var previewIcon = ['',
				   'icon-check',
				   'icon-bell',
				   'icon-cog',
				   'icon-cog-fill',
				   'icon-refresh',
				   'icon-user-plus',
				   'icon-user',
				   'icon-reorder',
				   'icon-more',
				   'icon-long-arrow-left',
				   'icon-plus',
				   'icon-upload',
				   'icon-star-off',
				   'icon-file',
				   'icon-chat',
				   'icon-at',
				   'icon-wrench',
				   'icon-lock',
				   'icon-angle-right',
				   'icon-arrow-right' ];


var tooltipText = ['',
				   '컴포넌트의 종류를 선택합니다.',
				   '컴포넌트의 외관을 선택합니다.',
				   '컴포넌트의 타입을 선택합니다.',
				   '컴포넌트의 내부 레이아웃을 선택합니다.',
				   '기본 컬러를 선택합니다.',
				   '적용될 컴포넌트가 선택됩니다. (자동선택)',
				   '컴포넌트의 상태를 선택합니다.',
				   ];





/* 
	When select tag will be changed, update preview element.
	
*/	  
$('select').change(function() {
    
  $(this).find('option:selected' ).each(function() {
    
    selectedClass = $( this ).text(); // selectedClass 변수에 현재 선택된 옵션요소에 적힌 클래스 명을 입력.
	selectedKeyID = $(this).parent().attr('id'); //해당 셀렉트 태그에서 id값 (스트링)을 받아와서 selectedKeyID 에 입력.
	
	console.log('selected key(ID) :', selectedKeyID);
	//console.log(classListObject[updatedClassList]);

	
	if(selectedKeyID=='select-background'){
	  updatePreviewBackground();
    }
    
    else if( selectedKeyID=='select-icon'){
	  updatePreviewIcon(previewIcon);
    }
    
    else if(selectedKeyID == 'Component1stDepth') {
	  //buildPreviewComponents() 컴포넌트가 변경되면 프리뷰 마크업을 재구성 함.
	  currentComponent = selectedClass;
	  initGenerator();
	  //console.log(selectedKeyID);
	}
	
    else {

	  if(selectedKeyID== 'Button2ndDepth') {
	    //console.log(updatedClassList);
	    updateColorTarget();
	  }
	  
	  updatePreviewComponents(classListObject[selectedKeyID]); //클래스 모음 오브젝트에서 키 값 updateClassList 에 대응하는 array를 불러옴.
	
	}
	
    
	/* remove condition code.
    if( $(this).parent().hasClass('button-2nd-depth') ){
	  updatePreviewComponents(Button2ndDepth);
	  updateColorTarget();
    }
    else if( $(this).parent().hasClass('button-3rd-depth') ){
	  updatePreviewComponents(Button3rdDepth);
    }
    else if( $(this).parent().hasClass('button-4th-depth') ){
	  updatePreviewComponents(Button4thDepth);
    }
    else if( $(this).parent().hasClass('color-1st-depth') ){
	  updatePreviewComponents(Color1stDepth);
    }
    else if( $(this).parent().hasClass('color-4th-depth') ){
	  updatePreviewComponents(Color4thDepth);
    }
    else if( $(this).parent().hasClass('type-1st-depth') ){
	  updatePreviewComponents(Type1stDepth);
    }
    else if( $(this).parent().hasClass('type-2nd-depth') ){
	  updatePreviewComponents(Type2ndDepth);
    }
    else if( $(this).parent().hasClass('grid-1st-depth') ){
	  updatePreviewComponents(Grid1stDepth);
    }
    else if( $(this).parent().hasClass('select-background') ){
	  updatePreviewBackground();
    }
    
    else if( $(this).parent().hasClass('select-icon') ){
	  updatePreviewIcon(previewIcon);
	  //console.log('update preview icon');
    }
    
    */
    
    
  });
  
  
  
});




/* 
	when select class, update preview component's class 
	클래스를 선택했을 때, 프리뷰 오브젝트의 클래스를 업데이트 하는 함수.
*/

function updatePreviewComponents(targetArray) {
  
  var currentArray = targetArray; // 클래스오브젝트에서 키값을 통해 받아온 배열을 currentArray 에 대입.
  var currnetArrayLength = currentArray.length; //대입한 배열의 길이를 측정.
  //console.log(currnetArrayLength);
  
  
  for(var i=1; i<currnetArrayLength; i++){
	$('.preview > #preview-components').removeClass(currentArray[i]); //배열내 클래스 이름과 매치되는 클래스를 프리뷰 오브젝트에서 제거.
	//console.log(currentArray[i]);
  }
  
  
  $('.preview > #preview-components').addClass(selectedClass); //선택한 클래스만 프리뷰 오브젝트에 추가.
  console.log('Selected Class Name :'+ selectedClass);
  
  
  if(selectedKeyID=='Color4thDepth') {
	
	if(selectedClass=='disabled') {
	  $('.preview > #preview-components').removeClass(selectedClass);
      $('.preview > #preview-components').attr('disabled', 'disabled');
    }
    else {
	  $('.preview > #preview-components').removeAttr("disabled");
    }
  }
  
  
  /* Exceptions will be removed (none, auto, and default ) */
  if(selectedClass=='none' || selectedClass=='auto' || selectedClass=='default') {
	$('.preview > button').removeClass(selectedClass);
  }
  
  else if(selectedClass=='has_right_icon') {

    $('#preview-components > i.editable').detach().insertAfter('#preview-components > span');
    
    $('#preview-components > ul > li:first-child > a > i.editable').detach().insertAfter('#preview-components > ul > li:first-child > a > span');
    $('#preview-components > ul > li:last-child > a > i.editable').detach().insertAfter('#preview-components > ul > li:last-child > a > span');
	//$('#second-components > i').detach().insertAfter('#second-components>span');
  }
  
  else if(selectedClass=='has_left_icon') {

    $('#preview-components > i.editable').detach().insertBefore('#preview-components > span');
    
    $('#preview-components > ul > li:first-child > a > i.editable').detach().insertBefore('#preview-components > ul > li:first-child > a > span');
    $('#preview-components > ul > li:last-child > a > i.editable').detach().insertBefore('#preview-components > ul > li:last-child > a > span');
	//$('#second-components > i').detach().insertBefore('#second-components>span');
  }
  
  
  
  //when all updates applied to target, then...
  updatePreviewComponentsCode();
	
}


// update preview area's background color 
function updatePreviewBackground() {
  
  if(selectedClass=="default") {
	$('.output-section.preview').css('background-color','#F8F9FD');
  }
  else if(selectedClass=="navy") {
	$('.output-section.preview').css('background-color','#366480');
  }
  else if(selectedClass=="white") {
	$('.output-section.preview').css('background-color','#FFF');
  }

}




/* bottom of preview button area, html code also will be updated */
function updatePreviewComponentsCode() {
  var firstComponentsCode = $('#preview-components').prop('outerHTML');
  //console.log(firstComponentsCode);
  $('.output-section.code-block > p').text(firstComponentsCode);
}


function updatePreviewIcon(iconArray) {
  var currnetArrayLength = iconArray.length;
  
  for(var i=1; i<currnetArrayLength; i++){
	$('#preview-components i.editable').removeClass(iconArray[i]);
  }
  
  $('#preview-components i.editable').addClass(selectedClass);
  
  //all updates applied to target, then...
  updatePreviewComponentsCode();
}





function updateColorTarget() {
  $( '.color-2nd-depth > option' ).text(selectedClass);
}


/* toolip은 i 버튼에 hover할 경우에 노출한다. */

var currentTooltip;

$('form h3 > i').mouseover(function() {
  var currentpos = $(this).offset();
  var currentXpos = Math.floor(currentpos.left)-10;
  var currentYpos = Math.floor(currentpos.top)+20;
  
  currentTooltip =  $(this).parent().attr('id');
  //console.log(currentYpos,currentXpos);
  //console.log(currentTooltip);
  
  $('.tooltip').css('top', currentYpos);
  $('.tooltip').css('left', currentXpos);
  $('.tooltip').addClass('hover');
  
  
  updateTooltipText(currentTooltip);
  
});


$('form h3 > i').mouseout(function() {
  $('.tooltip').removeClass('hover');
});

function updateTooltipText(currentTooltip) {
  var currentTooltip = tooltipText[currentTooltip];
  
  $('.tooltip>span').text(currentTooltip);
}