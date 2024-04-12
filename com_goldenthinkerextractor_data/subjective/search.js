const sec = require('search-engine-client');
 
sec.yahoo("Golden Thinker").then(function(result){
    console.log(result);
});