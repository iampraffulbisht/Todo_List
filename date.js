export function getDate() {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return today.toLocaleDateString("hi-IN", options);
}

export function getDay() {
  let today = new Date();
  var options = {
    weekday: "long",
  };
  return today.toLocaleDateString("hi-IN", options);
}