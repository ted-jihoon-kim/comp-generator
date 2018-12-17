

/* 
	JANDI newsletter composer

*/

var currentMonth;
var currentYear;


	
function init() {
  moment.locale('ko');
  currentMonth = moment().format('MMMM'); //moment().format('LT');
  currentYear = moment().format('YYYY');
  console.log(currentMonth, currentYear);
  
	// 계산된 시간을 각각의 요소에 대입
	$(".monthInfo").text(currentMonth);
	$(".yearInfo").text(currentYear).appendTo(".monthInfo");
}

init();




