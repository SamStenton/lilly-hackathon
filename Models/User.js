	function User() {
		//Get from DB
		return {
			id: shortid.generate(),
			name: "Samuel Stenton"
		};
	}

	User.get = function(id) {
		//Get from Database
		return {
			id: id,
			name: "Samuel Stenton"
		}
	};

module.exports = User;
