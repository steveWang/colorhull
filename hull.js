let preamble = document.getElementById("preamble"),
    match = document.getElementById("match"),
    postamble = document.getElementById("postamble"),
    test = document.getElementById("test"),
    yes = document.getElementById("yes"),
    no = document.getElementById("no"),
    indicator = document.getElementById("indicator");

let start = parseInt(/\bhue=(\d+)\b/.exec(location.search)?.[1] || 270),
    width = parseInt(/\width=(\d+)\b/.exec(location.search)?.[1] || 60),
    trueLower = start,
    trueUpper = start;

let lowerBound = start - width,
    upperBound = start + width;

const scale = 2;

function updateKey() {
  let totalLength = 360;
  if (lowerBound <= 0) {
    preamble.style.width = "0px";
  } else {
    preamble.style.width = (lowerBound * scale) + "px";
    totalLength -= lowerBound;
  }
  if (upperBound >= 360) {
    postamble.style.width = "0px";
  } else {
    let length = 360 - upperBound;
    postamble.style.width = (length * scale) + "px";
    totalLength -= length;
  }
  match.style.width = (totalLength * scale) + "px";
}

function finish() {
  let result = document.getElementById("result");
  result.innerHTML = `Your color range is ${Math.round(trueLower)} to ${Math.round(trueUpper)}.`
}

function pickColor() {
  let candidate = Math.round((upperBound + trueUpper) * 50) / 100;
  if (trueLower - lowerBound > upperBound - trueUpper) {
    candidate = Math.round((trueLower + lowerBound) * 50) / 100;
  }
  
  test.style.background = `hsl(${candidate}, 100%, 50%)`
  indicator.style.left = candidate * scale + "px";
  console.log(`hsl(${candidate}, 100%, 50%)`);
}

yes.addEventListener('click', function () {
  if (Math.abs(trueUpper - upperBound) < 0.5) {
    finish();
    return;
  }
  if (trueLower - lowerBound > upperBound - trueUpper) {
    trueLower = Math.round((trueLower + lowerBound) * 50) / 100;
  } else {
    trueUpper = Math.round((upperBound + trueUpper) * 50) / 100;
  }
  updateKey();
  pickColor();
});

no.addEventListener('click', function () {
  if (Math.abs(trueUpper - upperBound) < 0.5) {
    finish();
    return;
  }
  if (trueLower - lowerBound > upperBound - trueUpper) {
    lowerBound = Math.round((trueLower + lowerBound) * 50) / 100;
  } else {
    upperBound = Math.round((upperBound + trueUpper) * 50) / 100;
  }
  updateKey();
  pickColor();
});

updateKey();
pickColor();
