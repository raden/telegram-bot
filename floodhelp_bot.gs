var token="<Insert telegram API here>";
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = "<Insert web app link here>";

function setWebhook() {
var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
var response = UrlFetchApp.fetch(url);
Logger.log(response.getContentText());
}

function sendMessage(id, text) {

  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(id),
      text: text,
      parse_mode: "HTML",

    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function doPost(e) {
var contents = JSON.parse(e.postData.contents);
var ssId = "<insert spreadsheet ID here>"; 
var sheet = SpreadsheetApp.openById(ssId).getSheetByName("<insert intended sheet's name here>");
   
    if (contents.message){
      var id = contents.message.from.id;
      var text = contents.message.text;
      
        if (text.indexOf("#") !== -1){
      
         var dateNow = new Date;
         var formattedDate = dateNow.getDate()+"/"+(dateNow.getMonth()+1);
         var item = text.split("#");
         //var floodhelp_out;
        
         //sheet.appendRow([formattedDate,item[0],item[1],item[2],floodhelp_out]);
         sheet.appendRow([formattedDate,item[0],item[1],item[2]]);

         //return sendMessage(id, "Added " + floodhelp_out + "to the request list")
         return sendMessage(id, "Added " + item[2] +", requested by " + item [0] + " for flood centre " + item[1] + " to the request list")
      }
    
    else {

      return sendMessage(id, "The items that you key in will be kept for our record purpose\nPlease use this format, the # sign is the text delimiter:\nname#flood center ID#list(you can use comma over here for many items)\ne.g mat#teluk intan#medicine,boy clothes,power bank")
   
    }

    }
   
 }

