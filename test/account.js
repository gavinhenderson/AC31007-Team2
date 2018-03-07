var assert = require("assert");
var account = require("../app/account.js");
var mongoose = require("mongoose");
var db = require("../app/database.js")(mongoose);

var mockUser = {
	name: "Bobby",
	type: "RIS",
	id: Math.floor((Math.random() * 999999)),
	password: "pass",
	school: "the world",
	email: "bobby@dundee.ac.uk"
};

var failUser = {
	name: "Fail"
};

describe("Accounts",function(){
	it("Valid account creates without error",function(done){
		account.createUser(db, mockUser, err => {
			assert.ok(!err, "a valid user is created");
			done(err);
		});
	});
	it("Invalid account creates with error",function(done){
		//Doesnt give all required fields
		account.createUser(db, failUser, err => {
			assert.ok(err, "an invalid user is not created");
			done();
		});
	});
});
