var assert = require("assert");
var account = require("../app/account.js");
var mongoose = require('mongoose');
var db = require('../app/database.js')(mongoose);

var mockUser = {
	name: "Bobby",
	type: "RIS",
	id: Math.floor((Math.random() * 999999)),
	password: "pass",
	school: "the world",
	email: "bobby@dundee.ac.uk"
};

describe("Accounts",function(){
	it("Valid account creates without error",function(done){
		account.createUser(db, mockUser, function(err){
			assert.ok(!err);
			done(err);
		});
	});
});
