let today = new Date();
let num_list =[1, 3, 6, 7, 9];
let inputDate = today.getFullYear() + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + ('0' + (today.getDate())).slice(-2);

const url = 'https://www.daelim.ac.kr/ajaxf/FrBistroSvc/BistroCarteInfo.do'

function fn_list() {
	$.ajax({
		type: "POST",
		url: "https://cors-anywhere.herokuapp.com/https://www.daelim.ac.kr/ajaxf/FrBistroSvc/BistroCarteInfo.do",
		data: $("#sendForm").serialize(),
		dataType: "json",
		success: function(response) {
			if(response != null && response != "") {
				console.log(response.data.BISTRO_SEQ);
				if (response.data.BISTRO_SEQ == 1) {
					for (let i = 0; i < 5; i++) {
						console.log(i);
						setTableData(response.data, response.data.BISTRO_SEQ, num_list[i], i + 1, -1);
						setTableData(response.data, response.data.BISTRO_SEQ, num_list[i], i + 1, today.getDay());
						console.log("end");
					}
					
				} else if (response.data.BISTRO_SEQ == 2) {
					for (let i = 1; i <= 2; i++) {
						setTableData(response.data, response.data.BISTRO_SEQ, i, i, -1);
						setTableData(response.data, response.data.BISTRO_SEQ, i, i, today.getDay());
					}
				}
			}
		}
	})
}

function setTableData(data, bistro, num, num2, day) {
    if (day == -1) {
        for (let i = 1; i <= 5; i++) {
            let foodData = eval(`data.CCT${i}${num}`);
			if (foodData != null) {
            	$(`#weekend_data_${bistro} tr:nth-child(${num2}) td:nth-child(${i + 1})`).html(foodData.replace(/\n/g,"<br>"));
			}
        }
    } else if (day >= 1 && day <=5) {
        let foodData = eval(`data.CCT${day}${num}`);
		if (foodData != null) {
        $(`#today_data_${bistro} div:nth-child(${num2}) p`).html(foodData.replace(/\n/g,"<br>"));
		}
    } else {
		$(`#today_data_${bistro} div:nth-child(${num2}) p`).text("오늘은 학식이 없습니다.");
	}
}


$("#sendForm input:hidden[name=START_DAY]").val(inputDate);
fn_list();
$("#sendForm input:hidden[name=BISTRO_SEQ]").val(2);
fn_list();

// window.open('src/popup.html','팝업','width=500,height=500');

const headerEl = document.querySelector("header");

window.addEventListener('scroll', function() {
    requestAnimationFrame(scrollCheck);
});

function scrollCheck() {
    let browerScrollY = window.scrollY ? window.scrollY : window.pageYOffset;

    if (browerScrollY > 0) {
        headerEl.classList.add("active");
    } else {
        headerEl.classList.remove("active");
    }
}

const animationMove = function(selector) {
    const targetEl = document.querySelector(selector);
    const browserScrollY = window.pageYOffset;
    const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY;

    window.scrollTo({ top: targetScorllY, behavior: 'smooth' });
};

const scollMoveEl = document.querySelectorAll("[data-animation-scroll='true']");

for (let i = 0; i < scollMoveEl.length; i++) {
    scollMoveEl[i].addEventListener('click', function(e) {
        const target = this.dataset.target;

        animationMove(target);
    });
}
