export function getAbbr(title) {
    var text = String(title);
    var abbr = "";
    for (var i = 0; i < text.length; i ++) {
        if (i === 0 || text.charAt(i - 1) === ' ')
            abbr += String(text.charAt(i)).toUpperCase();
    }
    return abbr;
}
