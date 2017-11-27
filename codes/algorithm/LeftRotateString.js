function LeftRotateString(str, n)
{
    if (!str || str.length === 0) return str;

    var len = str.length;
    if (n < 1) return str;

    n = n % len;

    var t = "";
    for (var i = n; i < len; i++) t += str[i];

    for (var i = 0; i < n; i++) t += str[i];

    return t;
}