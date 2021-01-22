const process = require('process');
const promptly = require('promptly');
const axios = require('axios');

boot();

async function boot() {
	console.log("please enter a service number ....\n");
	console.log("[1] Login to system");
	console.log("[2] Get Store list");
	console.log("[3] Get a Store using ID");
	console.log("[4] Search Store");
	console.log("[5] Close Application\n");

    const sno = await promptly.prompt('Service Number: ');
    console.log(sno);
    if (sno == 1) {
    	makeLogin();
    }
    if(sno == 2) {
    	getStores();
    }
    if(sno == 3) {
    	getStore();
    }
    if(sno == 4) {
    	searchStore();
    }
    if(sno == 5) {
    	exitApp();
    }
};

async function makeLogin() {

 	console.log("Please enter your email");
 	const email = await promptly.prompt('Email: ');

 	console.log("\nPlease enter your password");
 	const password = await promptly.password('Password: ');

 	const params = new URLSearchParams()
	params.append('email', email)
	params.append('password', password)

	const url = 'http://127.0.0.1:5000/api/oauth';

	const config = {
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  }
	}

	axios.post(url, params, config)
	  .then((result) => {	    
	    if (result.data.status == 0) {
	    	console.log('\n Login details are incorrect. try again...');
	    	makeLogin();
	    }
	    else
	    {
	    	console.log('\n Login successfull...');
	    	console.log(result.data);
	    	boot();
	    }
	  })
	  .catch((err) => {
	    console.log(err);
	  })
}

async function getStores() {

 	console.log("Please enter your token..");
 	const token = await promptly.prompt('Token: ');

	const url = 'http://127.0.0.1:5000/api/stores';

	const config = {
	  headers: {
	    'authorization': token
	  }
	}

	axios.get(url, config)
	  	.then((result) => {	    
	    	console.log('\n');
	    	console.log(result.data);
	    	console.log('\n');
	    	boot();
	  	})
	  	.catch((err) => {
	    	console.log(err);
	  	})
}

async function searchStore() {

 	console.log("Please enter search Keyword");
 	const keyword = await promptly.prompt('Keyword: ');

 	console.log("Please enter your token");
 	const token = await promptly.prompt('Store ID: ');

	const url = 'http://127.0.0.1:5000/api/search/'+keyword;

	const config = {
	  headers: {
	    'authorization': token
	  }
	}

	axios.get(url, config)
	  	.then((result) => {	    
	    	console.log('\n');
	    	console.log(result.data);
	    	console.log('\n');
	    	boot();
	  	})
	  	.catch((err) => {
	    	console.log(err);
	  	})
}

async function getStore() {

 	console.log("Please enter Store ID");
 	const sid = await promptly.prompt('Store ID: ');

 	console.log("Please enter your token");
 	const token = await promptly.prompt('Store ID: ');

	const url = 'http://127.0.0.1:5000/api/store/'+sid;

	const config = {
	  headers: {
	    'authorization': token
	  }
	}

	axios.get(url, config)
	  	.then((result) => {	    
	    	console.log('\n');
	    	console.log(result.data);
	    	console.log('\n');
	    	boot();
	  	})
	  	.catch((err) => {
	    	console.log(err);
	  	})
}

function exitApp() {
	process.exit(0);
}