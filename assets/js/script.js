var currentDay = $('#currentDay');
var timeInterval;
var allPlans = [];

console.log(currentDay);

function setTime () {
    currentDay.text(moment().format('MMMM Do YYYY, h:mm:ss a'));
}

timeInterval = setInterval(setTime, 1000);

var timeblocks = $('.time-block');
timeblocks.each(function() {
    var specificTimeBlock = $(this);
    var specificTimeBlockId = $(this).attr('id');
    specificTimeBlockId = parseInt(specificTimeBlockId);
    var currentHour = moment().hour();

    if (currentHour > specificTimeBlockId) {
        specificTimeBlock.addClass('past');
    }   else if (currentHour === specificTimeBlockId) {
        specificTimeBlock.addClass('present');
    }   else {
        specificTimeBlock.addClass('future');
    }
});

var saveBtn = $('.saveBtn');

saveBtn.click(function(event) {
    event.preventDefault();
    var button = $(this);
    var buttonParent = button.parent();
    var textareaSibling = button.siblings('textarea');
    var newPlan = {
        time: buttonParent.attr('id'),
        text: textareaSibling.val()
    }
    allPlans.push(newPlan);
    console.log(allPlans);
    localStorage.setItem('plans', JSON.stringify(allPlans));
});

function getAllSavedPlans() {
    if (localStorage.getItem('plans')) {
        allPlans = JSON.parse(localStorage.getItem('plans'));
    }
    if (allPlans.length > 0) {
        for (var i = 0; i < allPlans.length; i++) {
            var parent = $(`#${allPlans[i].time}`);
            var textareaChild = parent.children('textarea');
            textareaChild.val(allPlans[i].text);
            
        }
    }
}

getAllSavedPlans();
