// changing number to base 26 in reverse order (i.e. not reversing to get exact base 26)
// let no. of sites in database be n then string length will be ceil(log26(n))

const generateShortUrl = (sitesCount) => {
    var count=sitesCount;
    var string='';
    while(count>0){
        // console.log(count, count%26,String.fromCharCode(97 + count%26));
        string= string.concat(String.fromCharCode(97 + count%26));           // ascii value of a is 97
        count=Math.floor(count/26);
    }

    return string;
};

exports.generateShortUrl = generateShortUrl;

