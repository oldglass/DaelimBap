
var fn_comm_ajax = function(url, options) {
	if (typeof url === "object") {
		options = url;
		url = undefined;
	}
	
	if (!options) {
		$.ajax(url);
		return;
	}
	
	if (!options.dataType) {
		options.dataType = "json";
	}
	
	var pageId = options.pageId;
	
	if ((pageId != null && typeof (pageId) != 'undefined')
	&& options.data != null && typeof (options.data) != 'undefined') {

		if (pageId == 'auto') {
			if (svcName == null || typeof (svcName) == 'undefined') {
				throw "svcName 을 가져오지 못했습니다. pageId 를 수동으로 지정해야 합니다.";
			}
			pageId = svcName;
		}
		
		fn_util_setCookie('PAGE_' + pageId, JSON
		.stringify(fn_util_jsonFromGet(options.data)), null, '/');
	}
	
	if (options.success) {
		options._success = options.success;
	}
	options.success = this.fn_comm_ajaxSuccess;
	
	if (options.error) {
		options._error = options.error;
	}
	options.error = this.fn_comm_ajaxError;
	
	options.beforeSend = function(jqXHR, settings) {
		jqXHR._success = settings._success;
		jqXHR._error = settings._error;
		
		if (settings.parentIdForSetByName) {
			jqXHR.parentIdForSetByName = settings.parentIdForSetByName;
		}
	};
	
	options.type = "POST";
	
	if (options.ajaxFormName) {
		if ($.isPlainObject(options.data) || options.date == null) {
			options.type = "POST";
			$("#" + options.ajaxFormName)
			.attr("enctype", "multipart/form-data");
			$("#" + options.ajaxFormName).attr("action", url);
			$("#" + options.ajaxFormName).ajaxForm(options);
			$("#" + options.ajaxFormName).submit();
		} else {
			throw "options.data형식은 json형식이여야 합니다.";
		}
		
	} else {
		return $.ajax(url, options);
	}
	
};

var fn_comm_ajaxSuccess = function(data, textStatus, jqXHR) {
	if (jqXHR.parentIdForSetByName) {
		fn_comm_setValue(jqXHR.parentIdForSetByName, data.data);
	}
	
	if (jqXHR._success) {
		jqXHR._success.apply(this, [ data.data, textStatus, jqXHR ]);
	}
};

this.fn_comm_ajaxError = function(jqXHR, textStatus, errorThrown) {
	
	var errmsg = "시스템에 오류가 발생했습니다.\n[오류메세지]\n" + textStatus + "\n"
	+ errorThrown + "\n" + jqXHR.responseText;
	
	if (jqXHR._error) {
		jqXHR._error.apply(this, [ jqXHR, textStatus, errorThrown ]);
		return;
	}
	
	var jsonStr = jqXHR.responseText;
	var jsonObj = null;
	
	try {
		jsonObj = $.parseJSON(jsonStr);
	} catch (e) {
		alert(errmsg);
		return;
	}
	
	errmsg = jsonObj.alertmsg;
	
	if (errmsg != undefined) {
		alert(errmsg);
		return;
	}
	
	errmsg = jsonObj.errmsg;
	errmsg = errmsg.replace("java.lang.RuntimeException: ", "");
	
	if (svcMode == "LOCAL") {
		alert(errmsg);
	} else {
		location.href = contextPath + "/code500.jsp?comm_error_DOMAIN_CD="
		+ encodeURIComponent(domainCd) + "&errmsg="
		+ encodeURIComponent(errmsg);
	}
};

let today = new Date();
let num_list =[1, 3, 6, 7, 9];
let inputDate = today.getFullYear() + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + ('0' + (today.getDate())).slice(-2);

const url = 'https://www.daelim.ac.kr/ajaxf/FrBistroSvc/BistroCarteInfo.do'

/* fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
	method: 'POST',
	headers: {"Content-Type": "application/json"}, 
	body: JSON.stringify($("#sendForm").serialize()),
}).then(data => {
	if(data != null && data != "") {
		if (data.BISTRO_SEQ == 1) {
			for (let i = 0; i < num_list.length; i++) {
				setTableData(data, data.BISTRO_SEQ, num_list[i], i + 1, -1);
				setTableData(data, data.BISTRO_SEQ, num_list[i], i + 1, today.getDay());
			}
			
		} else if (data.BISTRO_SEQ == 2) {
			for (let i = 1; i <= 2; i++) {
				setTableData(data, data.BISTRO_SEQ, i, i, -1);
				setTableData(data, data.BISTRO_SEQ, i, i, today.getDay());
			}
		}
	}
}); */

function fn_list() {

	// fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
	// method: 'POST', 
	// headers: {"Content-Type": "application/json"}, 
	// body: JSON.stringify($("#sendForm").serialize()),
	// }).then(data => {
	// 	if(data != null && data != "") {
	// 		if (data.BISTRO_SEQ == 1) {
	// 			for (let i = 0; i < num_list.length; i++) {
	// 				setTableData(data, data.BISTRO_SEQ, num_list[i], i + 1, -1);
	// 				setTableData(data, data.BISTRO_SEQ, num_list[i], i + 1, today.getDay());
	// 			}
				
	// 		} else if (data.BISTRO_SEQ == 2) {
	// 			for (let i = 1; i <= 2; i++) {
	// 				setTableData(data, data.BISTRO_SEQ, i, i, -1);
	// 				setTableData(data, data.BISTRO_SEQ, i, i, today.getDay());
	// 			}
	// 		}
	// 	}
	// });
	fn_comm_ajax({
		url : "https://www.daelim.ac.kr/ajaxf/FrBistroSvc/BistroCarteInfo.do",
        data : $("#sendForm").serialize(),
        dataType : "json",
        success : function(data) {
			if(data != null && data != "") {
                if (data.BISTRO_SEQ == 1) {
					for (let i = 0; i < num_list.length; i++) {
						setTableData(data, data.BISTRO_SEQ, num_list[i], i + 1, -1);
                        setTableData(data, data.BISTRO_SEQ, num_list[i], i + 1, today.getDay());
                    }
					
                } else if (data.BISTRO_SEQ == 2) {
					for (let i = 1; i <= 2; i++) {
						setTableData(data, data.BISTRO_SEQ, i, i, -1);
                        setTableData(data, data.BISTRO_SEQ, i, i, today.getDay());
                    }
                }
            }
        }
    });
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
