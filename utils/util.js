const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatRichText(html) {
  let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
    return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
    match = match.replace(/width:[^;]+;/gi, 'max-width:335px;').replace(/width:[^;]+;/gi, 'max-width:335px;');
    return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:335px;height:auto;display:block;margin-top:0;margin-bottom:0;"');
  return newContent;
}
module.exports = {
  formatTime: formatTime,
  formatRichText
}
