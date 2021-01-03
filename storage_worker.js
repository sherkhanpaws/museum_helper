function storageActionPerformed (e_data) {
	console.log("Message received from Storage worker : "+e_data[0]);
	if (e_data[0]=="update") {
		console.log("Data Updated in storage, Updating "+e_data[1]+" UI");
 		window["update_"+e_data[1]+"_ui"](JSON.parse(e_data[2]));
	} else {
		console.log("Data Fetched from Storage for "+e_data[1]+" , Updating UI");
		window["update_"+e_data[1]+"_ui"](JSON.parse(e_data[2]));
	}
}


function storage_action (action,item_type,item_data) {

	let localStorage = window.localStorage
	if (action == "set") {
   		localStorage.setItem(item_type,item_data);
   		storageActionPerformed(["update",item_type,item_data]);
	} else {
    		if(localStorage.getItem(item_type)) {
    			storageActionPerformed(["data",item_type,localStorage.getItem(item_type)]);
		} else {
		storageActionPerformed(["data",item_type,"[]"]);
		}
	}
}
