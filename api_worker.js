var plushie_value=0;
var api_key = "StfK2QkPRLrc017M";
function get_bcost(data) {
let raw = JSON.parse(data);
return raw.bazaar[0].cost;
}
function get_icost(data) {
let raw = JSON.parse(data);
return raw.itemmarket[0].cost;
}
onmessage = function(e) {
plushie_value = 0;
console.log("Message from main received");
console.log("Checking Plushie Prices");
//postMessage("Message from main received");
let items = JSON.parse(e.data[1]);
/*
    var bxhr = new XMLHttpRequest();
    bxhr.open("GET", "https://api.torn.com/market/258?selections=bazaar&key="+api_key, false);  // synchronous request
    bxhr.send(null);
    let bazaar_cost = get_bcost(bxhr.responseText);
    postMessage(bazaar_cost);
*/
for (i in items) {
//plushies.forEach(function(item) {
    let item_id  = items[i].id
    var bxhr = new XMLHttpRequest();
    bxhr.open("GET", "https://api.torn.com/market/"+item_id+"?selections=bazaar&key="+api_key, false);  // synchronous request
    bxhr.send(null);
    let bazaar_cost = get_bcost(bxhr.responseText);
    
    var ixhr = new XMLHttpRequest();
    ixhr.open("GET", "https://api.torn.com/market/"+item_id+"?selections=itemmarket&key="+api_key, false);  // synchronous request
    ixhr.send(null);
    let imarket_cost = get_icost(ixhr.responseText);
    let buy_cost = imarket_cost>bazaar_cost ? bazaar_cost : imarket_cost;
    // item_value+=buy_cost;
    // postMessage(items[i].name+buy_cost);
    items[i].buy_cost = buy_cost;
} 
postMessage([e.data[0],JSON.stringify(items)]);
}