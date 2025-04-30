function remaindTime() {
  var now = new Date();

  // 오늘의 운영 시간 설정 (12:00 ~ 14:00)
  var openTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    12, // 오후 12시
    0,
    0
  );
  var closeTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    14, // 오후 2시
    0,
    0
  );

  var currentTime = now.getTime();
  var openTimeMs = openTime.getTime();
  var closeTimeMs = closeTime.getTime();

  var timeElement = document.querySelector(".time");
  var titleElement = document.querySelector("p.time-title");
  var hoursElement = document.querySelector(".hours");
  var minutesElement = document.querySelector(".minutes");
  var secondsElement = document.querySelector(".seconds");
  var statusElement = document.getElementById("statusDisplay");

  if (currentTime < openTimeMs) {
    // 운영 전 상태
    statusElement.textContent = "운영 전";
    timeElement.style.display = "block";
    titleElement.textContent = "금일 오픈까지 남은 시간";
    updateTimeDisplay(
      openTimeMs - currentTime,
      hoursElement,
      minutesElement,
      secondsElement
    );
  } else if (currentTime > closeTimeMs) {
    // 운영 종료 상태
    statusElement.textContent = "마감 후";
    timeElement.style.display = "none";
    titleElement.textContent = "금일 마감";
  } else {
    // 운영 중 상태
    statusElement.textContent = "운영 중";
    timeElement.style.display = "block";
    titleElement.textContent = "금일 마감까지 남은 시간";
    updateTimeDisplay(
      closeTimeMs - currentTime,
      hoursElement,
      minutesElement,
      secondsElement
    );
  }
}

function updateTimeDisplay(timeDiffMs, hoursEl, minutesEl, secondsEl) {
  var totalSeconds = Math.floor(timeDiffMs / 1000);
  var hours = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = totalSeconds % 60;

  hoursEl.textContent = formatTime(hours);
  minutesEl.textContent = formatTime(minutes);
  secondsEl.textContent = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

// 초기 실행 및 1초 간격으로 업데이트
remaindTime();
setInterval(remaindTime, 1000);
