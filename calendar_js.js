//Переменные, определяющие даты у календаре
var date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year= date.getFullYear();
var full_date = `${day}_${month}_${year}`;

//Словарь, в котором хранятся все введенные данные
var total_data = new Map();

//Название месяцев и дней недели
var names_of_months = ['&ensp;&nbsp;ЯНВАРЬ', '&ensp;&nbsp;ФЕВРАЛЬ', '&ensp;&nbsp;МАРТ', '&ensp;&nbsp;АПРЕЛЬ', '&ensp;&nbsp;МАЙ', '&ensp;&nbsp;ИЮНЬ', '&ensp;&nbsp;ИЮЛЬ', '&ensp;&nbsp;АВГУСТ', '&ensp;&nbsp;СЕНТЯБРЬ', '&ensp;&nbsp;ОКТЯБРЬ', '&ensp;&nbsp;НОЯБРЬ', '&ensp;&nbsp;ДЕКАБРЬ'];
var names_of_months1 = ['&nbsp;ЯНВАРЯ', '&nbsp;ФЕВРАЛЯ', '&nbsp;МАРТА', '&nbsp;АПРЕЛЯ', '&nbsp;МАЯ', '&nbsp;ИЮНЯ', '&nbsp;ИЮЛЯ', '&nbsp;АВГУСТА', '&nbsp;СЕНТЯБРЯ', '&nbsp;ОКТЯБРЯ', '&nbsp;НОЯБРЯ', '&nbsp;ДЕКАБРЯ'];
var names_of_days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

//Первый вызов функции показа календаря
Calendar();

//Функция, показывающая календарь
function Calendar () {
    var html = `<div class="main_month">${names_of_months[month]} ${year}</div><table>`;

    html += '<tr>';
    for(var i=0; i < names_of_days.length; i++) {
        html += '<td class="cal_boxes_style">' + names_of_days[i] + '</td>';
    }
    html += '</tr>';

    var first_day= first_day_of_month(month+1, year);
    var amount_days = days_of_month(month+1, year);
    var weeks = amount_of_weeks(first_day, amount_days);
    var day_num = 1;
    //"id${full_date}_${key}" 
    for (let i=0; i < weeks; i++) {
        html += '<tr>';
        for (let j=0; j<7; j++) {
            if (i==0 && j>=first_day-1 || i>0 && i<weeks-1 || i==weeks-1 && day_num<=amount_days) {
                if (day_num==day) {
                    html += `<td class="calendar_box today_box" id="id${day_num}" onclick="open_card(this.id)" onmouseenter="add_heads(this.id)" onmouseleave="Calendar()">${day_num}</td>`;  
                    }
                else {
                    html += `<td class="calendar_box ordinary_box" id="id${day_num}" onclick="open_card(this.id)" onmouseenter="add_heads(this.id)"  onmouseleave="Calendar()">${day_num}</td>`;
                }
                day_num++;
            }
            else {
                html += '<td class="empty"></td>'
            }
        }
        html += '</tr>';
    }

    html += '</table>'


    document.getElementById('divCal').innerHTML = html;

}

//функция для вывода заголовков в ячейки 
function add_heads(box_id) {
    document.getElementById(box_id).style.transformOrigin="left top";
    document.getElementById(box_id).style.marginTop="-5px";
    document.getElementById(box_id).style.marginLeft="5px";
    document.getElementById(box_id).style.transition="margin-left 300ms";
    document.getElementById(box_id).style.transition="margin-top 300ms";
    document.getElementById(box_id).style.boxShadow="0 10px 90px rgba(0, 0, 0, 0.4)";
    document.getElementById(box_id).style.position="absolute";
    document.getElementById(box_id).style.minWidth="12%";
    document.getElementById(box_id).style.maxWidth="15%";
    document.getElementById(box_id).style.width="auto";
    document.getElementById(box_id).style.height="auto";
    document.getElementById(box_id).style.minHeight = "10%";
    document.getElementById(box_id).style.maxHeight="30%";
    document.getElementById(box_id).style.zIndex="1";
    document.getElementById(box_id).style.overflow = 'auto';
    var day = parseInt(box_id.substring(2, 4));
    var html=`<div class="spec month_odd" onclick="open_card('id${day}')">${day} ${names_of_months1[month]}</div><ul class="spec">`;
    var full_date = `${day}_${month}_${year}`;
    if (full_date in total_data) {
        for(key in total_data[full_date]) {
            html += `<li class="spec"><div class="spec date_odd">${key}</div></li>`;
        }
    } html+="</ul>"

    document.getElementById(box_id).innerHTML = html;
    document.getElementById(box_id).style.visibility = "visible";
}

//Функция для определения високосного года
function leap_year(year) {
    return ((year%100 != 0 && year%4 == 0) || year%400 == 0);
}

//Функция, возвращающая количество дней в месяце
function days_of_month(month, year) {
    var days=[31, 28 + leap_year(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month - 1];
}

//Функция, возвращающая номер первого месяца
    function first_day_of_month(month, year) {
    var k_vis_year = 0;
    var n = 0;
    for (let i = 1; i < year; i++) { 
        k_vis_year += leap_year(i);
    }
    for (let i = 1; i < month; i++) { 
        n += days_of_month(i, year);
    }
    var days = year * 365 + k_vis_year + (month == 1 ? 0 : n);
    var week_day = days % 7; 
    return (week_day == 0 ? 7 : week_day);
}

//Функция, возвращающая количество недель в месяце
function amount_of_weeks(first_day, days) {
    return 1 + Math.ceil((days-(8-first_day))/7);
}

//Функция, меняющая календарь при вводе полной даты в поиске
function EnterDate(elem){
    if(event.key === 'Enter') {
        var set_date = elem.value;
        if (check_date(set_date)) {
            day = parseInt(set_date.substring(0, 2));
            month = parseInt(set_date.substring(3, 5)) - 1;
            year = parseInt(set_date.substring(6, 10));
            document.getElementById('divCal').innerHTML = '';
            Calendar();
            }
        else {
            alert('Дата введена некорректно. Требуемый формат: дд*мм*гггг , где дд – день, мм – номер месяца, гггг – год, * - один любой разделительный знак. Если день или номер месяца – однозначное число, то спереди пнужно добавить ведущий ноль');
        }
        document.getElementById('SetDate').value = '';
        document.getElementById('SetDate').style.placeholder = "Поиск";
    }
}

//Функция, проверяющая дату
function check_date(set_date) {
    if (set_date.length != 10) {
        return false;
    }
    var d = set_date.substring(0, 2);
    var m = set_date.substring(3, 5);
    var y = set_date.substring(6, 10);
    let dmy = [d, m, y];
    for (i in dmy) {
        for (j in i) {
            if (!('0123456789'.includes(j))) {
                return false;
            }
        }
    }
    d = parseInt(d);
    m = parseInt(m);
    y = parseInt(y);
    if (d > 31 || m > 12 || d == 0 || m == 0 || y==0) {
        return false;
    }
    if (d > days_of_month(m, y)) {
        return false;
    }
    return true;
}

//Функция для перелистывания календаря на месяц назад
function previous_month() {
    day = 0;
    if (month == 0) {
        month = 11;
        year--;
        }
    else {
        month--;
        }
    document.getElementById('divCal').innerHTML = '';
    Calendar();
}

//Функция для перелистывания календаря на месяц вперед
function next_month() {
    day = 0;
    if(month==11) {
        month = 0;
        year++;
       }
    else {
       month++;
       }
    document.getElementById('divCal').innerHTML = '';
    Calendar();
}

//Функция открытия окошка для добавления заметок
function open_card(id){
    day = parseInt(id.substring(2, 4));
    Calendar();
    full_date = `${day}_${month}_${year}`;
    html = `<button class="close" onclick="close_card()">&times;</button><div> &nbsp; ${day}${names_of_months1[month]} ${year}</div><hr>`;
    if (full_date in total_data) {
        for(key in total_data[full_date]) {
            html += `<div id="id${full_date}_${key}" class="spec head_note" onclick="change_text(this.id)">${key}</div><div class="spec text_note" id="i${full_date}_${key}" onclick="change_text(this.id)">${total_data[full_date][key]}</div></div><br>`;
        }
    }
    html += '<div class="colFlex spec"><input id="head_text" class="theme spec" placeholder="*Название"><textarea placeholder="Подробнее" contenteditable="true" class="text spec odd_text_note" id="body_text"></textarea><button class="save_delete_but spec" onclick="add_data()">Сохранить</button></div>';
    document.getElementById('card_id').innerHTML = html;
    document.getElementById('card_id').style.visibility = "visible";
}

//Функция закрытия окошка для добавления заметок
function close_card(){
    document.getElementById('card_id').innerHTML ='';
    document.getElementById('card_id').style.visibility = 'hidden';
}
document.onclick = function (e) {
    if (e.target.id != "card_id" && e.target.id != `id${day}` && e.target.classList.contains('spec') == false) {
        close_card();
    };
};

//Функция сохранения введенных заметок
function add_data() {
    var key = document.getElementById('head_text').value;
    var value = document.getElementById('body_text').value;
    if(key.length>0){
        if (full_date in total_data) {
            if (key in total_data[full_date]) {
                alert('В один день не могут быть сохранены две заметки с одинаковым названием. Измените название');
                return 1;
            }
            else {
                total_data[full_date][key] = value;
            }
        }
        else {
            var ma = new Map;
            ma[key] = value;
            total_data[full_date] = ma;
        }
    } else {
        alert('Добавьте заголовок');
        return 1;
    }
    document.getElementById('card_id').innerHTML = '';
    open_card(`id${day}`);
}

//Функция редактирования текста
function change_text(id) {
    var check = id.substring(0, 2);
    if (check=='id') {
         var k = `id${day}_${month}_${year}_`.length;
         var key = id.substring(k,);
        }
    else {
        var k = `i${day}_${month}_${year}_`.length;
        var key = id.substring(k,);
    } 
    document.getElementById('card_id').innerHTML = `<button class="close" onclick="close_card()">&times;</button><div class="colFlex spec"><input id="head_text" class="theme spec" value="${key}"><textarea class="text spec body_text" id="body_text">${total_data[`${day}_${month}_${year}`][key]}</textarea><div class="rowFlex spec"><button class="save_delete_but spec" onclick="add_changed_text();">Сохранить запись</button><button id="id${key}" class="save_delete_but spec" onclick="delete_text(this.id)">Удалить запись</button></div></div>`;
    delete total_data[full_date][key];
};

//Функция добавления отредактированного текста
function add_changed_text() {
    var new_key = document.getElementById('head_text').value;
    var new_value = document.getElementById('body_text').value;
    if (new_key.length>0) {
        if (new_key in total_data[full_date]) {
            alert('В один день не могут быть сохранены две заметки с одинаковым названием. Измените название');
            return 1;
        } else {
            total_data[full_date][new_key] = new_value;
        }
    } 
    else {
        alert('Добавьте заголовок');
        return 1;
    }
    open_card(`id${day}`);
};

//Функция удаления текста
function delete_text(id){
    id = id.substring(2,);
    delete total_data[full_date][id];
    open_card(`id${day}`);
};

//Функции смены цвета
function pink_style(){
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = '';
    document.body.style.background = 'pink';
    document.getElementById('card_id').style.backgroundColor = 'RGB(242, 211, 216)';
    document.getElementById('image_window').style.background = 'RGB(242, 211, 216)';
}function blue_style(){
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = '';
    document.body.style.background = 'lightblue';
    document.getElementById('card_id').style.backgroundColor = 'RGB(202, 223, 230)';
    document.getElementById('image_window').style.backgroundColor = 'RGB(202, 223, 230)';
}function base_style(){
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = '';
    document.body.style.background = 'white';
    document.getElementById('card_id').style.backgroundColor = 'white';
    document.getElementById('image_window').style.backgroundColor = 'white';
} function close_im_win(){
    document.getElementById('image_window').innerHTML ='';
}

function castom(){
    document.body.style.background = 'white';
    var im_url=document.getElementById("im_url").value;
    var body = document.getElementsByTagName('body');
    document.body.style.backgroundImage  = `url(${im_url})`;
    document.body.style.backgroundSize='100% 100%';
    document.getElementById('card_id').style.backgroundColor = 'white';
    document.getElementById('image_window').style.backgroundColor = 'white';
    close_im_win();
} function getting_url(){
    html = `<div class="pic_win">
        <button onclick="close_im_win()" class="close closee">&times;</button>
        <div class="label" for="url_im"><p>Загружайте картинки, не сливающиеся с сайтом</p><p>Допустимые разрешения - png, jpeg</p></div>
        <input class="block url_pole" name="url_im" id="im_url" placeholder="Ссылка на изображение">
        <button onclick="castom()" class="dl">Загрузить</button>
    </div>`;
    document.getElementById('image_window').innerHTML = html;
}