app

.factory('storage', function() {
    return {
    	init: function(type, url){
    		var request = new XMLHttpRequest();
			request.open('GET', url, false);  // `false` makes the request synchronous
			request.send(null);
			
			if (request.status === 200) {
				localStorage[type] = JSON.stringify(JSON.parse(request.responseText));
			}
			
			// TODO: return false response if status != 200
			localStorage[type] = JSON.stringify(JSON.parse(request.responseText));
    	},
    	getList: function(type) {
            return localStorage[type] !== undefined ? JSON.parse(localStorage[type]) : false;
    	},
    	addNew: function(type, model) {
      		collection = this.getList(type);
            collection.push(model);
            localStorage[type] = JSON.stringify(collection);
       	},
        save: function(type, ary){
            localStorage[type] = JSON.stringify(ary);
        }
    };
})

.factory('session', function(){
	return {
		init: function(user){
			sessionStorage["user"] = JSON.stringify(user);
		},
        destroy: function(){
            sessionStorage.clear();
        },
        getParam: function(param){
            return this.isLoggedIn()[param] || false;
        },
		isLoggedIn: function(){
			return sessionStorage["user"] !== undefined ? JSON.parse(sessionStorage["user"]) : false;
		},
        isAdmin: function() {
            user = this.isLoggedIn();
            return user["role"] == "admin";
        },
        isUser: function() {
            user = this.isLoggedIn();
            return user["role"] == "user";
        }
	};
})

.factory('resource', function(){
    return {
        cleanUrl: function(string){
            /* Remove unwanted characters, only accept alphanumeric and space */
            var cleaner = string.replace(/[^A-Za-z0-9 ]/g,'');

            /* Replace multi spaces with a single space */
            cleaner = cleaner.replace(/\s{2,}/g,' ');
         
            /* Replace space with a '-' symbol */
            cleaner = cleaner.replace(/\s/g, "-");

            /* Return cleaner in lowercase*/
            return cleaner.toLowerCase();
        },
        range: function(num){
            if(num <= 0) num = 0;
            return new Array(num);
        }
    };
})

;