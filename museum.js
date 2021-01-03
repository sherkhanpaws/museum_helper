var plushie_value = document.getElementById("plushie_value");
var flower_value = document.getElementById("flower_value");
var update_flowers = document.getElementById("update_flowers");
var update_plushies = document.getElementById("update_plushies");
var open_plushies = document.getElementById("open_plushies");
var flower_list  = document.getElementById("flower_list");
var plushie_list  = document.getElementById("plushie_list");
const api_worker = new Worker("api_worker.js");

function createItem(text) {
    let p = document.createElement('p');
    p.textContent = text;
    return p;
}

function update_flowers_ui(flowers){
	let flower_tot = 0;
	flower_list.innerHTML = ''
	for (i in flowers) {
  	  	let flower = flowers[i];
   	  	flower_list.appendChild(createItem(flower.name+":"+flower.buy_cost.toString()));
   	  	flower_tot += flower.buy_cost;
         }
	flower_value.innerHTML = flower_tot;
}

function update_plushies_ui(plushies){
	let plushie_tot = 0;
	plushie_list.innerHTML = ''
	for (i in plushies) {
   		let plushie = plushies[i];
 		plushie_list.appendChild(createItem(plushie.name+":"+plushie.buy_cost.toString()));
   		plushie_tot += plushie.buy_cost;
	}
	plushie_value.innerHTML = plushie_tot;
}


open_plushies.addEventListener("click",function(e){
	for (i in item_db.plushies) {
		let item_id = item_db.plushies[i].id;
		console.log("opening "+item_db.plushies[i].name);
  		var creating = browser.tabs.create({
    			url:"https://www.torn.com/imarket.php#/p=shop&type="+item_id
  		});
	}
});



open_flowers.addEventListener("click",function(e){
	for (i in item_db.flowers) {
		let item_id = item_db.flowers[i].id;
		console.log("opening "+item_db.flowers[i].name);
  		var creating = browser.tabs.create({
    			url:"https://www.torn.com/imarket.php#/p=shop&type="+item_id
  		});
	}
});



update_flowers.addEventListener("click",function(e){
	api_worker.postMessage(["flowers",JSON.stringify(item_db.flowers)]);
});


update_plushies.addEventListener("click",function(e){
	api_worker.postMessage(["plushies",JSON.stringify(item_db.plushies)]);
});



api_worker.onerror = function(e) {
	console.log(e.message);
}

api_worker.onmessage = function(e) {
	console.log("Message received from API worker :"+e.data[0]);
        console.log("Updating Local Storage");
        storage_action("set",e.data[0],e.data[1]);
 	//plushie_value.innerHTML = e.data;
}


storage_action("get","plushies","");	
storage_action("get","flowers","");			



