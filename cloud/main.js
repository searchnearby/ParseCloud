/* Service Keys and Initializations */
var fs = require('fs');
var layer = require('cloud/layer-parse-module/layer-module.js');
 
var layerProviderID = "083888b6-bd69-11e4-ad95-3c9b00000bd8";
var layerKeyID = "f63fb1c4-e744-11e4-88df-d7e500000bc4";
var privateKey = fs.readFileSync('cloud/layer-parse-module/keys/layer-key.js');
layer.initialize(layerProviderID, layerKeyID, privateKey);

var algoliasearch = require('cloud/algoliasearch.parse.js');
var client = algoliasearch('3J94RUQ4HX', '657a04bfdc9d50aae9394c9714a1cfc2');
var qLimit = 300;
var mandrill_key = '9F87dVP1ZEAJOS5gvyYq9A';
var Mandrill = require('mandrill');
Mandrill.initialize(mandrill_key);

var categoryIndex = client.initIndex('categories');
var colorIndex = client.initIndex('colors');
var tagIndex = client.initIndex('tags');
var inventoryIndex = client.initIndex('inventories');
var conversationIndex = client.initIndex('conversations');
var messageIndex = client.initIndex('messages');
var userIndex = client.initIndex('users');
var favouriteIndex = client.initIndex('favourites');
var followerIndex = client.initIndex('followers');
var productViewIndex = client.initIndex('product_views');
var profileRoleIndex = client.initIndex('profile_roles');
var smartResponseIndex = client.initIndex('smart_responses');
var merchantRegistrationDetailIndex = client.initIndex('merchant_registration_details');
var subCategoryIndex = client.initIndex('sub_categories');
var profileIndex = client.initIndex('profiles');
var merchantStaffIndex = client.initIndex('merchant_staff');
var userProfileIndex = client.initIndex('user_profiles');
 

Parse.Cloud.define("generateToken", function(request, response) {
    var userID = request.params.userID;
    var nonce = request.params.nonce;
    if (!userID) throw new Error("Missing userID parameter");
    if (!nonce) throw new Error("Missing nonce parameter");
        response.success(layer.layerIdentityToken(userID, nonce));
});

Parse.Cloud.define("getUser", function(request, response) {
     var userID = request.params.userID;
     if (!userID) throw new Error("Missing userID parameter");
     Parse.Cloud.useMasterKey();
     var query = new Parse.Query(Parse.User);
     query.get(userID, {
     	success: function(user) {
     		response.success({'session': user.getSessionToken()});
     	},
     	error: function(user, error) {
     		response.error({'error': "Fetching User Details Failed"});
     	}
     });
});

/* Parse.Cloud.define('updateMsgStatus', function(request, response) {
     var Msg = Parse.Object.extend('Message');
     var qry = new Parse.Query(Msg);
     qry.limit(1000);
     qry.find({
     	success: function(msgs) {
     		var msg;
     		var recipient_status;
     		var status_keys;
     		var ps_status;
     		for (var i=0; i < msgs.length; i++) {
     			msg = msgs[i];
     			recipient_status = msg.get("recipient_status");
     			status_keys = Object.keys(recipient_status);
     			ps_status = '';
     			for (var j = 0; j < status_keys.length; j++) {
     				ps_status += status_keys[j]+ ':' + recipient_status[status_keys[j]];
     				if (j < (status_keys.length - 1))
     					ps_status += ',';
     			}
     			msg.set("status", ps_status);
     			msg.save();
     			if (i === (msgs.length - 1)) {
     				response.success('Successfully updated the Message status string field');
     			}
     		}
     	},
     	error: function(error) {
     		response.success('Could not update the Message status string field');
     	}
     });
}); */



	// data imports from parse to algolia
Parse.Cloud.define("indexData", function(request, response) {
  indexTable(categoryIndex, 'Category') ;
  indexTable(colorIndex, 'Color') ;
  indexTable(tagIndex, 'Tag') ;
  indexTable(inventoryIndex, 'Inventory') ;
  indexTable(conversationIndex, 'Conversation') ;
  indexTable(messageIndex, 'Message') ;
  indexTable(userIndex, '_User') ;
  indexTable(favouriteIndex, 'Favourites') ;
  indexTable(followerIndex, 'Followers') ;
  indexTable(productViewIndex, 'ProductViews') ;
  indexTable(profileRoleIndex, 'ProfileRoles') ;
  indexTable(smartResponseIndex, 'SmartResponses');
  indexTable(merchantRegistrationDetailIndex, 'MerchantRegistrationDetails');
  indexTable(subCategoryIndex, 'SubCategory');
  indexTable(profileIndex, 'Profiles');
  indexTable(merchantStaffIndex, 'MerchantStaff');
  indexTable(userProfileIndex, 'UserProfile');
});

	// data reimports from parse to algolia
Parse.Cloud.define("reindexData", function(request, response) {
  reindexTable('categories', 'Category') ;
  reindexTable('colors', 'Color') ;
  reindexTable('tags', 'Tag') ;
  reindexTable('inventories', 'Inventory') ;
  reindexTable('conversations', 'Conversation') ;
  reindexTable('messages', 'Message') ;
  reindexTable('users', '_User') ;
  reindexTable('favourites', 'Favourites') ;
  reindexTable('followers', 'Followers') ;
  reindexTable('product_views', 'ProductViews') ;
  reindexTable('profile_roles', 'ProfileRoles') ;
  reindexTable('smart_responses', 'SmartResponses');
  reindexTable('merchant_registration_details', 'MerchantRegistrationDetails');
  reindexTable('sub_categories', 'SubCategory');
  reindexTable('profiles', 'Profiles');
  reindexTable('merchant_staff', 'MerchantStaff');
  reindexTable('user_profiles', UserProfile);
});

	// individual data imports

Parse.Cloud.define("indexCategory", function(request, response) {
  indexTable(categoryIndex, 'Category') ;
});

Parse.Cloud.define("indexColor", function(request, response) {
  indexTable(colorIndex, 'Color') ;
});

Parse.Cloud.define("indexTag", function(request, response) {
  indexTable(tagIndex, 'Tag') ;
});

Parse.Cloud.define("indexInventory", function(request, response) {
  indexTable(inventoryIndex, 'Inventory') ;
});

Parse.Cloud.define("indexConversation", function(request, response) {
  indexTable(conversationIndex, 'Conversation') ;
});

Parse.Cloud.define("indexMessage", function(request, response) {
  indexTable(messageIndex, 'Message') ;
});

Parse.Cloud.define("indexUser", function(request, response) {
  indexTable(userIndex, '_User') ;
});

Parse.Cloud.define("indexFavourites", function(request, response) {
  indexTable(favouriteIndex, 'Favourites') ;
});

Parse.Cloud.define("indexFollowers", function(request, response) {
  indexTable(followerIndex, 'Followers') ;
});

Parse.Cloud.define("indexProductViews", function(request, response) {
  indexTable(productViewIndex, 'ProductViews') ;
});

Parse.Cloud.define("indexProfileRoles", function(request, response) {
  indexTable(profileRoleIndex, 'ProfileRoles') ;
});

Parse.Cloud.define("indexSmartResponses", function(request, response) {
  indexTable(smartResponseIndex, 'SmartResponses') ;
});

Parse.Cloud.define("indexMerchantRegistrationDetails", function(request, response) {
  indexTable(merchantRegistrationDetailIndex, 'MerchantRegistrationDetails') ;
});

Parse.Cloud.define("indexSubCategory", function(request, response) {
  indexTable(subCategoryIndex, 'SubCategory') ;
});

Parse.Cloud.define("indexProfiles", function(request, response) {
  indexTable(profileIndex, 'Profiles') ;
});

Parse.Cloud.define("indexMerchantStaff", function(request, response) {
  indexTable(merchantStaffIndex, 'MerchantStaff') ;
});

Parse.Cloud.define("indexUserProfile", function(request, response) {
  indexTable(userProfileIndex, 'UserProfile') ;
});

	// individual data reimports

Parse.Cloud.define("reindexCategory", function(request, response) {
  reindexTable('categories', 'Category') ;
});

Parse.Cloud.define("reindexColor", function(request, response) {
  reindexTable('colors', 'Color') ;
});

Parse.Cloud.define("reindexTag", function(request, response) {
  reindexTable('tags', 'Tag') ;
});

Parse.Cloud.define("reindexInventory", function(request, response) {
  reindexTable('inventories', 'Inventory') ;
});

Parse.Cloud.define("reindexConversation", function(request, response) {
  reindexTable('conversations', 'Conversation') ;
});

Parse.Cloud.define("reindexMessage", function(request, response) {
  reindexTable('messages', 'Message') ;
});

Parse.Cloud.define("reindexUser", function(request, response) {
  reindexTable('users', '_User') ;
});

Parse.Cloud.define("reindexFavourites", function(request, response) {
  reindexTable('favourites', 'Favourites') ;
});

Parse.Cloud.define("reindexFollowers", function(request, response) {
  reindexTable('followers', 'Followers') ;
});

Parse.Cloud.define("reindexProductViews", function(request, response) {
  reindexTable('product_views', 'ProductViews') ;
});

Parse.Cloud.define("reindexProfileRoles", function(request, response) {
  reindexTable('profile_roles', 'ProfileRoles') ;
});

Parse.Cloud.define("reindexSmartResponses", function(request, response) {
  reindexTable('smart_responses', 'SmartResponses') ;
});

Parse.Cloud.define("reindexMerchantRegistrationDetails", function(request, response) {
  reindexTable('merchant_registration_details', 'MerchantRegistrationDetails') ;
});

Parse.Cloud.define("reindexSubCategory", function(request, response) {
  reindexTable('sub_categories', 'SubCategory') ;
});

Parse.Cloud.define("reindexProfiles", function(request, response) {
  reindexTable('profiles', 'Profiles') ;
});

Parse.Cloud.define("reindexMerchantStaff", function(request, response) {
  reindexTable('merchant_staff', 'MerchantStaff') ;
});

Parse.Cloud.define("reindexUserProfile", function(request, response) {
  reindexTable('user_profiles', 'UserProfile') ;
});

	// update index after create / update
Parse.Cloud.afterSave("Category", function(request) {
  afterSaveRecord(request.object, categoryIndex, 'Category');	
});

	// update index after delete
Parse.Cloud.afterDelete("Category", function(request) {
  afterDeleteRecord(request.object.id, categoryIndex);
});

Parse.Cloud.afterSave("Color", function(request) {
  afterSaveRecord(request.object, colorIndex, "Color");	
});

Parse.Cloud.afterDelete("Color", function(request) {
  afterDeleteRecord(request.object.id, colorIndex);
});

Parse.Cloud.afterSave("Tag", function(request) {
  afterSaveRecord(request.object, tagIndex, "Tag");	
});

Parse.Cloud.afterDelete("Tag", function(request) {
  afterDeleteRecord(request.object.id, tagIndex);
});

Parse.Cloud.afterSave("Inventory", function(request) {
  console.log("afterSave for Inventory called");
  afterSaveRecord(request.object, inventoryIndex, "Inventory");	
});

Parse.Cloud.afterDelete("Inventory", function(request) {
  afterDeleteRecord(request.object.id, inventoryIndex);
});

Parse.Cloud.afterSave("Conversation", function(request) {
	// updating an existing conversation
   if (request.object.existed()) {
   	afterSaveRecord(request.object, conversationIndex, "Conversation");
   }	// new conversation created
   else {
   	var convLayerId = request.object.get("layer_id");
	var query = new Parse.Query("Conversation");
	query.equalTo("layer_id", convLayerId);
	//query.ascending("createdAt");
	query.find({
	 success: function(conversations) {
	 	// duplications exist
	    if (conversations && conversations.length > 1) {
	        request.object.destroy();
	    } else {
	        afterSaveRecord(request.object, conversationIndex, "Conversation");
	    }
	},
	error: function(error) {
	 	// Not existing
	    afterSaveRecord(request.object, conversationIndex, "Conversation");
	}
	});
   }
  	
});

Parse.Cloud.afterDelete("Conversation", function(request) {
  afterDeleteRecord(request.object.id, conversationIndex);
});

Parse.Cloud.afterSave("Message", function(request) {
   if (request.object.existed()) {
    afterSaveRecord(request.object, messageIndex, "Message");
   }	// new message created
   else {
   	var msgLayerId = request.object.get("layer_id");
	var query = new Parse.Query("Message");
	query.equalTo("layer_id", msgLayerId);
	//query.ascending("createdAt");
	query.find({
	 success: function(msgs) {
	 	// duplications exist
	    if (msgs && msgs.length > 1) {
	        request.object.destroy();
	    } else {
	        afterSaveRecord(request.object, messageIndex, "Message");
	    }
	},
	error: function(error) {
	 	// Not existing
	    afterSaveRecord(request.object, messageIndex, "Message");
	}
	});
  }

});

Parse.Cloud.afterDelete("Message", function(request) {
  afterDeleteRecord(request.object.id, messageIndex);
});

Parse.Cloud.afterSave("_User", function(request) {
  afterSaveRecord(request.object, userIndex, "_User");	
});

Parse.Cloud.afterDelete("_User", function(request) {
  afterDeleteRecord(request.object.id, userIndex);
});

Parse.Cloud.afterSave("Favourites", function(request) {
  afterSaveRecord(request.object, favouriteIndex, "Favourites");	
});

Parse.Cloud.afterDelete("Favourites", function(request) {
  afterDeleteRecord(request.object.id, favouriteIndex);
});

Parse.Cloud.afterSave("Followers", function(request) {
  afterSaveRecord(request.object, followerIndex, "Followers");	
});

Parse.Cloud.afterDelete("Followers", function(request) {
  afterDeleteRecord(request.object.id, followerIndex);
});

Parse.Cloud.afterSave("ProductViews", function(request) {
  afterSaveRecord(request.object, productViewIndex, "ProductViews");	
});

Parse.Cloud.afterDelete("ProductViews", function(request) {
  afterDeleteRecord(request.object.id, productViewIndex);
});

Parse.Cloud.afterSave("ProfileRoles", function(request) {
  afterSaveRecord(request.object, profileRoleIndex, "ProfileRoles");	
});

Parse.Cloud.afterDelete("ProfileRoles", function(request) {
  afterDeleteRecord(request.object.id, profileRoleIndex);
});

Parse.Cloud.afterSave("SmartResponses", function(request) {
  afterSaveRecord(request.object, smartResponseIndex, "SmartResponses");	
});

Parse.Cloud.afterDelete("SmartResponses", function(request) {
  afterDeleteRecord(request.object.id, smartResponseIndex);
});

Parse.Cloud.afterSave("MerchantRegistrationDetails", function(request) {
  afterSaveRecord(request.object, merchantRegistrationDetailIndex, "MerchantRegistrationDetails");	
});

Parse.Cloud.afterDelete("MerchantRegistrationDetails", function(request) {
  afterDeleteRecord(request.object.id, merchantRegistrationDetailIndex);
});

Parse.Cloud.afterSave("SubCategory", function(request) {
  afterSaveRecord(request.object, subCategoryIndex, "SubCategory");	
});

Parse.Cloud.afterDelete("SubCategory", function(request) {
  afterDeleteRecord(request.object.id, subCategoryIndex);
});

Parse.Cloud.afterSave("Profiles", function(request) {
  afterSaveRecord(request.object, profileIndex, "Profiles");	
});

Parse.Cloud.afterDelete("Profiles", function(request) {
  afterDeleteRecord(request.object.id, profileIndex);
});

Parse.Cloud.afterSave("MerchantStaff", function(request) {
  afterSaveRecord(request.object, merchantStaffIndex, "MerchantStaff");	
});

Parse.Cloud.afterDelete("MerchantStaff", function(request) {
  afterDeleteRecord(request.object.id, merchantStaffIndex);
});

Parse.Cloud.afterSave("UserProfile", function(request) {
  afterSaveRecord(request.object, userProfileIndex, "UserProfile");	
});

Parse.Cloud.afterDelete("UserProfile", function(request) {
  afterDeleteRecord(request.object.id, userProfileIndex);
});

function indexTable(index, parseClassName) {

  var objectsToIndex = [];
  var pObj = Parse.Object.extend(parseClassName);
  var query = new Parse.Query(pObj);
  query.limit(qLimit);

  	// Find all items
  query.find({
    success: function(data) {
      objectsToIndex = data.map(function(record) {
        try {
        	record = record.toJSON();
        	if(parseClassName == '_User') {
	   delete record.password;
	   delete record.authData;
	}
        	record.objectID = record.objectId;   // Specify Algolia"s objectID with the Parse.Object unique ID
        	return record;
        }
        catch(err) {
        	console.log('invalid inv obj : ' + record.id);
        	return null;
        }
      });

      objectsToIndex = objectsToIndex.filter(function(n){ return n != undefined });	// remove all the null values inserted for the invalid records

      	// Add or update new objects
      index.saveObjects(objectsToIndex, function(err, content) {
        if (err) {
          console.log("indexing error 1 : " + err.message);
          throw err;
        }
        console.log("Parse<>Algolia " + parseClassName + " import done");
      });
    },
    error: function(err) {
      console.log("indexing error 2 : " + err.message);
      throw err;
    }
  });
}

function reindexTable(algoliaIndexName, parseClassName) {
  var objectsToIndex = [];

  var tempIndexName = algoliaIndexName + "_temp";

  	// Create a temp index
  var tempIndex = client.initIndex(tempIndexName);

  var pObj = Parse.Object.extend(parseClassName);
  var query = new Parse.Query(pObj);
  query.limit(qLimit);

  query.find({
    success: function(data) {
      objectsToIndex = data.map(function(record) {
         try {
	record = record.toJSON();
	if(parseClassName == '_User') {
	    delete record.password;
	    delete record.authData;
	}
	record.objectID = record.objectId;
	return record;
        }
        catch(err) {
        	console.log('invalid inv obj : ' + record.id);
        	return null;
        }
      });

      objectsToIndex = objectsToIndex.filter(function(n){ return n != undefined });

      	// Add new objects to temp index
      tempIndex.saveObjects(objectsToIndex, function(err, content) {
        if (err) {
          throw err;
        }

        	// Overwrite main index with temp index
        client.moveIndex(tempIndexName, algoliaIndexName, function(err, content) {
          if (err) {
            throw err;
          }

          console.log("Parse<>Algolia" + parseClassName + " reimport done");
        });
      });
    },
    error: function(err) {
      throw err;
    }
  });
}

Parse.Cloud.job("checkUnreadMessages", function(request, status) {
  var currentTime = new Date();
  var period = new Date(currentTime.getTime() - 3*60000);
  console.log("checking unread messages from: " + period);
  var Messages = Parse.Object.extend("Message");
  var query = new Parse.Query(Messages);
  query.greaterThanOrEqualTo("createdAt", period);
  query.find({
    success: function(results) {
      for (var i = 0; i < results.length; i++) {
        var recipient_dict = results[i].get("recipient_status");
        for (var key in recipient_dict) {
          if (recipient_dict[key] !== "read")
            sendNotificationEmail(results[i]);
        }
      }
      
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });

});

function afterSaveRecord(reqObj, index, parseClassName) {

  var objectToSave = reqObj.toJSON();

  objectToSave.objectID = objectToSave.objectId;

  if(parseClassName == '_User') {
     delete objectToSave.password;
     delete objectToSave.authData;
  }

  index.saveObject(objectToSave, function(err, content) {
    if (err) {
      throw err;
    }
    console.log("Parse<>Algolia object saved");
  });	
}

function afterDeleteRecord(objectID, index) {
  index.deleteObject(objectID, function(err, content) {
    if (err) {
      throw err;
    }
    console.log("Parse<>Algolia object deleted");
  });
}

function sendNotificationEmail(request) {
  console.log("sending Notification Email");
  var message_content = request.get("message_parts")[0].body;
  var sender_id = request.get("sender_id");
  var sent_at = request.get("sent_at");
  var sender_name;
  var recipient_id = [];
  var recipient_email = [];
  var recipient_name = [];
  var recipient_dict = request.get("recipient_status");
  var template = "email-notifications-for-new-message";
  var product_pic, product_brand, product_item, product_price;

  if (request.get("message_parts")[3] !== undefined) {
    if ((JSON.stringify(request.get("message_parts")[3].body)).indexOf("product_share") >= 0) {
      var product_info = request.get("message_parts")[2].body.split("~");
      product_brand = product_info[0];
      product_item = product_info[1];
      product_price = product_info[2];
      template = "template_product_share";
      //product_pic = request.object.get("message_parts")[2].content.get("picture_url");
      console.log("product share: " + product_brand + " " + product_item + " " + product_price);
    }
    else {
      console.log("there was a problem");
    }
  }
    
  for (var key in recipient_dict) {
    if (key !== sender_id)
      recipient_id.push(key);
  }

  var query = new Parse.Query("User");
  query.equalTo("objectId", sender_id);
  query.find().then(function(user) {
    if (user[0].get("business_name") !== undefined) {
      sender_name = user[0].get("business_name");
    }
    else {
      sender_name = user[0].get("name");
    }
    var another_query = new Parse.Query("User");
    another_query.containedIn("objectId", recipient_id);
    another_query.find({
      success: function(users) {

        for (i = 0; i < users.length; i++) {
            recipient_name[i] = users[i].get("name");
            recipient_email[i] = users[i].get("email");
        }
        for (j = 0; j < recipient_email.length; j++) {
          console.log("sending mandrill email -> message: " + message_content + " recipient: " + JSON.stringify(recipient_email));
          Parse.Cloud.httpRequest({
            method: 'POST',
            headers: {
             'Content-Type': 'application/json',
            },
            url: 'https://mandrillapp.com/api/1.0/messages/send-template.json',
            body:{
                    "key": mandrill_key,
                  "template_name": template,
                  "template_content": [], 
                  "message": {
                    "subject": "Nearby Messaging: New Message from " + sender_name,
                    "from_email": "hello@nearbymessaging.com",
                    "from_name": "Nearby Messaging",
                    "to": [
                      {
                        "email": recipient_email[j],
                        "name": recipient_name[j]
                      }
                  ],
                  "global_merge_vars": [
                      {
                          "name": "sender_name",
                          "content": sender_name
                      },
                      {
                          "name": "sent_at",
                          "content": sent_at
                      },
                      {
                          "name": "message_content",
                          "content": message_content
                      },
                      // {
                      //     "name": "product_pic",
                      //     "content": product_pic
                      // },
                      {
                          "name": "product_brand",
                          "content": product_brand
                      },
                      {
                          "name": "product_item",
                          "content": product_item
                      },
                      {
                          "name": "product_price",
                          "content": product_price
                      }

                  ],
                  "auto_text": true,
                  "inline_css": true,
                  "merge": true,
                  "merge_language": "handlebars"
                                }},

            success: function(httpResponse) {
                    console.log(httpResponse);
                    },
                error: function(httpResponse) {
                    console.error(httpResponse);
                }

            });
          
        }
      },
      error: function(error) {
        console.log("error: " + error.code + " " + error.message);
      }
    });
      
    
  });
}



