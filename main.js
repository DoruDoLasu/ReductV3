/* MIT License

Copyright (c) 2022 DoruDoLasu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */




var theusers = {};
var friendidtoname = {};

var thetoken = undefined;
var thechannel = undefined;
var theserver = undefined;
var lastprocessedauthor = undefined;
/*uncomment and put your token if used locally, gonna spare you the effort*/
/*thetoken = "";*/

var timer = 0;

var socket = 0;
var thereplying = [];
var theattachments = [];
var istyping = true;
var isserver = false;

var theparsedthing;

if (localStorage.getItem("sets") === null) {
  var thesets = {autoscroll: true, doitime: false, lointernet: false};
  localStorage.setItem("sets", JSON.stringify(thesets))
} else {
  var thesets = JSON.parse(localStorage.getItem("sets"));
}


var theoldcustemotes = {
        "1984": "1984.gif",
        "KekW": "KekW.png",
        "amogus": "amogus.gif",
        "awaa": "awaa.png",
        "boohoo": "boohoo.png",
        "boohoo_goes_hard": "boohoo_goes_hard.png",
        "boohoo_shaken": "boohoo_shaken.png",
        "cat_arrival": "cat_arrival.gif",
        "cat_awson": "cat_awson.png",
        "cat_blob": "cat_blob.png",
        "cat_bonk": "cat_bonk.png",
        "cat_concern": "cat_concern.png",
        "cat_fast": "cat_fast.gif",
        "cat_kitty": "cat_kitty.png",
        "cat_lick": "cat_lick.gif",
        "cat_not_like": "cat_not_like.png",
        "cat_put": "cat_put.gif",
        "cat_pwease": "cat_pwease.png",
        "cat_rage": "cat_rage.png",
        "cat_sad": "cat_sad.png",
        "cat_snuff": "cat_snuff.gif",
        "cat_spin": "cat_spin.gif",
        "cat_squish": "cat_squish.gif",
        "cat_stare": "cat_stare.gif",
        "cat_steal": "cat_steal.gif",
        "cat_sussy": "cat_sussy.gif",
        "clueless": "clueless.png",
        "death": "death.gif",
        "developers": "developers.gif",
        "fastwawa": "fastwawa.gif",
        "ferris": "ferris.png",
        "ferris_bongo": "ferris_bongo.gif",
        "ferris_nom": "ferris_nom.png",
        "ferris_pensive": "ferris_pensive.png",
        "ferris_unsafe": "ferris_unsafe.png",
        "flesh": "flesh.png",
        "flooshed": "flooshed.png",
        "flosh": "flosh.png",
        "flushee": "flushee.png",
        "forgor": "forgor.png",
        "hollow": "hollow.png",
        "john": "john.png",
        "lightspeed": "lightspeed.png",
        "little_guy": "little_guy.png",
        "lmaoooo": "lmaoooo.gif",
        "lol": "lol.png",
        "looking": "looking.gif",
        "marie": "marie.png",
        "marie_furret": "marie_furret.gif",
        "marie_smug": "marie_smug.png",
        "megumin": "megumin.png",
        "michi_above": "michi_above.png",
        "michi_awww": "michi_awww.gif",
        "michi_drag": "michi_drag.gif",
        "michi_flustered": "michi_flustered.png",
        "michi_glare": "michi_glare.png",
        "michi_sus": "michi_sus.png",
        "monkaS": "monkaS.png",
        "monkaStare": "monkaStare.png",
        "monkey_grr": "monkey_grr.png",
        "monkey_pensive": "monkey_pensive.png",
        "monkey_zany": "monkey_zany.png",
        "nazu_sit": "nazu_sit.png",
        "nazu_sus": "nazu_sus.png",
        "ok_and": "ok_and.gif",
        "owo": "owo.png",
        "pat": "pat.png",
        "pointThink": "pointThink.png",
        "rainbowHype": "rainbowHype.gif",
        "rawr": "rawr.png",
        "rember": "rember.png",
        "revolt": "revolt.png",
        "sickly": "sickly.png",
        "stare": "stare.png",
        "tfyoulookingat": "tfyoulookingat.png",
        "thanks": "thanks.png",
        "thonk": "thonk.png",
        "trol": "trol.png",
        "troll_smile": "troll_smile.gif",
        "uber": "uber.png",
        "ubertroll": "ubertroll.png",
        "verycool": "verycool.png",
        "verygood": "verygood.png",
        "wawafast": "wawafast.gif",
        "wawastance": "wawastance.png",
        "yeahokayyy": "yeahokayyy.png",
        "yed": "yed.png",
        "yems": "yems.png",
        "michael": "michael.gif",
        "charle": "charle.gif",
        "sadge": "sadge.webp",
        "sus": "sus.webp",
        "chade": "chade.gif",
        "gigachad": "gigachad.webp",
        "sippy": "sippy.webp",
        "ayame_heart": "ayame_heart.png",
        "catgirl_peek": "catgirl_peek.png",
        "girl_happy": "girl_happy.png",
        "hug_plushie": "hug_plushie.png",
        "huggies": "huggies.png",
        "noted": "noted.gif",
        "waving": "waving.png",
        "mogusvented": "mogusvented.png",
};

var thebadges = {
    Developer: 1,
    Translator: 2,
    Supporter: 4,
    ResponsibleDisclosure: 8,
    Founder: 16,
    PlatformModeration: 32,
    ActiveSupporter: 64,
    Paw: 128,
    EarlyAdopter: 256,
    ReservedRelevantJokeBadge1: 512,
    ReservedRelevantJokeBadge2: 1024,
}

function timetobeats(a){
  if (a.getUTCHours == 23){
    thehours = 0;
  } else {
    thehours = a.getUTCHours()+1;
  }
  theminutes = a.getUTCMinutes();
  theseconds = a.getUTCSeconds();
  thebeats = ((((thehours*60)+theminutes)*60) + theseconds) / 86.4;
  return "@" + thebeats.toFixed(2);
}



function dologin(){
theemail = document.getElementById("emu").value;
thepassword = document.getElementById("pass").value;
thenamee = document.getElementById("nam").value;

thecreditials = JSON.stringify({
                          email: theemail,
                          password: thepassword,
                          friendly_name: thenamee})
console.log(thecreditials)
dorequeststuff("POST", "/auth/session/login", thecreditials, function a(status, response){
	thetoken = JSON.parse(response)["token"];
    login();
});
}

function loginpass(){
document.getElementById("messages").innerHTML = '<h3 id="tokeno"></h3><span><span>email: </span><input id="emu"><br><span>password: </span><input id="pass" type="password"><br><span>session name: </span><input id="nam" value="ReductV3"><br><button onclick="dologin()">Login</button><input type="checkbox" onclick="wipelocal()" id="keeptoken" name="keep"><label for="keep" style="color:#000000">Keep entered token saved in localStorage of your browser</label></span><input type="checkbox" id="scrolloff" name="scrolloff"><label for="scrolloff" style="color:#000000">Always autoscroll</label>';

document.getElementById("messages").style.backgroundColor = "#b9b9b9";
}




thestage = "login";

if (localStorage.tokeno !== undefined) {
  document.getElementById("token").value = localStorage.tokeno;
  document.getElementById("keeptoken").checked = true;
}
if (thetoken !== undefined) {
  document.getElementById("messages").innerHTML = '';
  document.getElementById("precontrols").hidden = false;
  document.getElementById("controls").hidden = false;
}
if (thechannel === undefined) {
  document.getElementById("precontrols").hidden = true;
  document.getElementById("controls").hidden = true;
}

function dorequeststuff(lareq, laurl, lathing, after){
  laurl = "https://api.revolt.chat"+laurl
  var themsgsa = new XMLHttpRequest();
  themsgsa.open(lareq, laurl, true);
  if (thetoken !== undefined){
  themsgsa.setRequestHeader("x-session-token", thetoken);
  }
  themsgsa.setRequestHeader("Accept", "*/*");
  themsgsa.setRequestHeader("Content-Type", "application/json");

  themsgsa.onreadystatechange = function(){
    if (themsgsa.readyState === 4){
      status = themsgsa.status;
      resp = themsgsa.responseText;
      console.log(lareq + ": " + laurl +", got " + themsgsa.status);
      if (typeof after == "function"){
        after(status, resp);
      }
    }
  };
  if (lathing == null){
    themsgsa.send();
  }
  else {
    themsgsa.send(lathing);
  }
}

function dowebsocketstuff() {
 socket = new WebSocket('wss://ws.revolt.chat');

 socket.addEventListener('open', function (event) {
   socket.send('{"type":"Authenticate","token":"'+thetoken+'"}');
   document.getElementById("wsconnection").innerText = "WS connected";
   document.getElementById("wsconnection").style.color = "#67CC89";
   keepAlive();
 });
 socket.addEventListener('close', function (event) {
   document.getElementById("wsconnection").innerText = "WS closed, press Fresh to reconnect";
   document.getElementById("wsconnection").style.color = "#E11423";
 });
 socket.addEventListener('message', function (event) {
   datta = event.data;
   if (JSON.parse(datta)["type"] == "Ready") {
            thestage = "loggedin";
			thefirstthing = JSON.parse(datta);
            serverlist = thefirstthing.servers;
            channellist = thefirstthing.channels;

            thefirstthing.users.forEach(function (item){
              friendidtoname[item._id] = item.username;
            });

            changeservchannel();
                }
   if (JSON.parse(datta)["type"] == "Message" && JSON.parse(datta)["channel"] == thechannel) {
            thenewstuff = JSON.parse(datta);
            themessages = [];
            themessages[0] = thenewstuff;
            rendermessages();
            if (thesets.autoscroll == true) {
                if (document.getElementById("messages").scrollTop >= document.getElementById("messages").scrollHeight*0.75){
                document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
                document.getElementById("messages").style.borderBottomColor = "";
                document.getElementById("messages").style.borderBottomWidth = "";
                } else {
                  document.getElementById("messages").style.borderBottomColor = "#8a3333";
                  setTimeout(function(){document.getElementById("messages").style.borderBottomColor = "";}, 500)
                }
              }
  }
  if ((JSON.parse(datta)["type"] == "MessageDelete") && (JSON.parse(datta)["channel"] == thechannel)){
    document.getElementById(JSON.parse(datta)["id"]).remove();
  }

  if (JSON.parse(datta)["type"] == "ChannelStartTyping" && JSON.parse(datta)["id"] == thechannel) {
    if (istyping == true){
      typtyp = JSON.parse(datta);
      if (theusers[typtyp.user] === undefined) {
        document.getElementById('typing').innerText = typtyp.user + "is typing";
      } else {
          document.getElementById('typing').innerText = theusers[typtyp.user][0] + " is typing";
      }
    }
  }
  if (JSON.parse(datta)["type"] == "ChannelStopTyping" && JSON.parse(datta)["id"] == thechannel) {
      if (istyping == true){
        document.getElementById('typing').innerText = '';
      }
  }
});
}

function wipelocal(){
  if (document.getElementById("keeptoken").checked == false ) {
    localStorage.clear();
  }
}

function login() {
  if (thetoken === undefined){
    thetoken = document.getElementById("token").value;
  }
  if (document.getElementById("keeptoken").checked == true ) {
    localStorage.tokeno = thetoken;
  }
   document.getElementById("logo2").innerHTML = '';
    document.getElementById("messages").innerHTML = '';
    document.getElementById("messages").style.backgroundColor = '';
    document.getElementById("precontrols").innerHTML = '<select id="selecftt" onchange="chchannelyes()"></select><button onclick="changeservchannel()">Home</button>';
    document.getElementById("controls").innerHTML = '<button onclick="attachprepare()" style="width: 4%">+</button><input id="a" style="width: 64%"/><button id="send" onclick="sendmessage()" style="width: 20%">==></button><button id="gett" onclick="getmessages()" style="width: 10%">Fresh</button>';



    dowebsocketstuff();
}

function changeservchannel(){
    thestage = "scgchange";
  thechannel = undefined;
  document.getElementById("controls").hidden = true;
  document.getElementById("replyingto").innerHTML = '';
  document.getElementById("typing").innerHTML = '';
  document.getElementById("messages").innerHTML = '<button onclick="grouplist()">Groups</button><button onclick="dmlist()">DM list</button><button onclick="savednotesgo()">Saved Notes</button><br><button onclick="gosettings()">Client settings</button><h1>Select server: </h1><select name="seletcc" id="selectt" onchange="chserver()"></select>';
  serverlist.forEach(function(item, index) {
    var server = document.createElement("option");
    server.textContent = item.name;
    server.value = item._id;
    if (theserver == item._id) {
      server.selected = "selected";
    }
    var channeldiv = document.createElement("div");
    channeldiv.id = "channelpick";
    document.getElementById("selectt").appendChild(server);
    document.getElementById("messages").appendChild(channeldiv);

    chserver();


});
}

function toggleset(set){
  switch (thesets[set]) {
	  case true:
		thesets[set] = false;
		console.log(set + " set to false");
		break;
      case undefined:
	  case false:
		thesets[set] = true;
		console.log(set + " set to true");
		break;
	}
  localStorage.setItem("sets", JSON.stringify(thesets));
  console.log("Settings saved to localStorage");
}

function gosettings(){
  document.getElementById("messages").innerHTML = '<button onclick="changeservchannel()">Home</button><br><input type="checkbox" id="scrolloff" name="scrolloff" onchange="toggleset(\'autoscroll\')"><label for="autoscroll">Toggle autoscroll</label><br><input type="checkbox" id="itime" name="itime" onchange="toggleset(\'doitime\')"><label for="itime">Use Internet Time</label><br><input type="checkbox" id="lointernet" name="lointernet" onchange="toggleset(\'lointernet\')"><label for="lointernet">Low data mode (doesn\'t display avatars, attachments, embeds or emojis)</label>';
  if (thesets.autoscroll == true) {
    document.getElementById("scrolloff").checked = true;
  }
  if (thesets.doitime == true) {
    document.getElementById("itime").checked = true;
  }
  if (thesets.lointernet == true) {
    document.getElementById("lointernet").checked = true;
  }
}

function chserver(){
    thestage = "schange";
  theserver = document.getElementById('selectt').value;
  serverlist.forEach(function(item, index) {
    if (item._id == theserver) {
      theparsedserver = serverlist[index];
    }
  });
  if (theparsedserver.banner === undefined) {
  document.getElementById("channelpick").innerHTML = '<h2>Select channel: </h2><select name="seletcc" id="selecttt"></select>';
  }
  else {
   document.getElementById("channelpick").innerHTML = '<h2>Select channel: </h2><select name="seletcc" id="selecttt"></select>';
   document.getElementById("messages").style.backgroundImage = 'url("https://autumn.revolt.chat/banners/'+ theparsedserver.banner._id + '")';
   document.getElementById("messages").style.backgroundRepeat = "no-repeat";
   document.getElementById("messages").style.backgroundSize = "contain";
   document.getElementById("messages").style.backgroundPositionX = "100%"
  }

thenamedchannels = [];
lefttogo = theparsedserver["channels"];
  thefirstthing.channels.forEach(function (item, index){
  if (item.server == theserver){
        thenamedchannels[item._id] = item.name

}
});

 if (theparsedserver.categories.length != 0){
   theparsedserver["categories"].forEach(function(item, index){
     document.getElementById("selecttt").innerHTML += '<optgroup label="' + item.title + '">';
     item.channels.forEach(function(itemx,indexx){
      if (thenamedchannels[itemx] !== undefined){
      document.getElementById("selecttt").innerHTML += '<option value="' + itemx + '">' + thenamedchannels[itemx] + '</option>';
      }
       lefttogo.pop(itemx);
     });
     document.getElementById("selecttt").innerHTML += '</optgroup>'
   });
}
  if (lefttogo.length != 0){
    document.getElementById("selecttt").innerHTML += '<optgroup label="uncategorised" disabled>';
    lefttogo.forEach(function(item, index){
        document.getElementById("selecttt").innerHTML += '<option value="' + item + '">' + thenamedchannels[item] + '</option>';
    });
    document.getElementById("selecttt").innerHTML += '</optgroup>'
  }
  document.getElementById("channelpick").innerHTML += '<button onclick="chchannelnext()">ok</button>';
  document.getElementById("channelpick").innerHTML += '<h2>Manual channel id: </h2><input id="customchannel"></input><button onclick="customidpick()">ok</button><h2>Join server: </h2><input id="joinserv"></input><button onclick="joinserver(document.getElementById(\'joinserv\').value)">ok</button>';

}

function dmlist(){
   thechannel = undefined;
   document.getElementById("replyingto").innerHTML = '';
   document.getElementById("messages").innerHTML = '<button onclick="grouplist()">Groups</button><button onclick="changeservchannel()">Servers</button><button onclick="savednotesgo()">Saved Notes</button><h1>DM list: </h1><select name="seletcc" id="selecttt"></select><button onclick="chchannelnext()">ok</button>';



    channellist.forEach(function(item, index) {
      if (item.channel_type == "DirectMessage") {
      var dm = document.createElement("option");
      if ((friendidtoname[item.recipients[0]] !== undefined) && (friendidtoname[item.recipients[1]] !== undefined)){
        dm.textContent = friendidtoname[item.recipients[0]] + " - " + friendidtoname[item.recipients[1]];
      }
      else {
        dm.textContent = item._id;
      }
      dm.value = item._id;
      
    var channeldiv = document.createElement("div");
    channeldiv.id = "channelpick";
    document.getElementById("selecttt").appendChild(dm);
    document.getElementById("messages").appendChild(channeldiv);
      }

});
}

function grouplist(){
   thechannel = undefined;
   document.getElementById("replyingto").innerHTML = '';
   document.getElementById("messages").innerHTML = '<button onclick="changeservchannel()">Servers</button><button onclick="dmlist()">DM list</button><button onclick="savednotesgo()">Saved Notes</button><h1>Group list: </h1><select name="seletcc" id="selecttt"></select><button onclick="chchannelnext()">ok</button>';
    channellist.forEach(function(item, index) {
      if (item.channel_type == "Group") {
      var dm = document.createElement("option");
      dm.textContent = item.name;
      dm.value = item._id;

    var channeldiv = document.createElement("div");
    channeldiv.id = "channelpick";
    document.getElementById("selecttt").appendChild(dm);
    document.getElementById("messages").appendChild(channeldiv);
      }

});
}

function savednotesgo(){
  thechannel = channellist[0]._id;
  lastmessage = undefined;
  firstmessage = undefined;
  document.getElementById("messages").innerHTML = "";
  document.getElementById("precontrols").hidden = false;
  document.getElementById("controls").hidden = false;
  getmessages();
}

function chchannelnext(){
  thechannel = document.getElementById('selecttt').value ;
  lastmessage = undefined;
  firstmessage = undefined;
  document.getElementById('selecftt').innerHTML = document.getElementById('selecttt').innerHTML
  document.getElementById("messages").innerHTML = "";
  document.getElementById("precontrols").hidden = false;
  document.getElementById("controls").hidden = false;
  getmessages();
}

function chchannelyes(){
  thechannel = document.getElementById('selecftt').value ;
  lastmessage = undefined;
  firstmessage = undefined;
  document.getElementById("messages").innerHTML = "";
  getmessages();
}

function customidpick(){
  thechannel = document.getElementById('customchannel').value ;
  lastmessage = undefined;
  firstmessage = undefined;
  document.getElementById("messages").innerHTML = "";
  document.getElementById("precontrols").hidden = false;
  document.getElementById("controls").hidden = false;
  getmessages();
}

function highlight(id){
  if (document.getElementById(id) !== null){
  colour = document.getElementById(id).style.color;
  document.getElementById(id).style.backgroundColor = "#000000";
  setTimeout(function() {document.getElementById(id).style.backgroundColor = null;}, 2000);
  } else {
    console.log("failed to highlight, not on here");
    getmessages(1,id);
    setTimeout(function() {highlight(id);}, 1000);
  }
}

function getuser(id){
  dorequeststuff("GET", "/users/"+id, null, function(status, response){
    if(status == 200){
    console.log(response);
  }

  });
}

function ulidtodate(ulid){
    digits = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
    finaldate = 0;
    date = ulid.slice(0,10);
    date.split('').reverse().forEach(function(item, index) {
    finaldate += digits.indexOf(item)*(Math.pow(32, index));
    });
    return finaldate;
}

function sendmessage(){
  // Checking for attachments
  if (theattachments.length > 0){
    wiadomosc = JSON.stringify({
                          content: document.getElementById("a").value,
                          replies: thereplying,
                          attachments: theattachments});
  }
  else {
    wiadomosc = JSON.stringify({
                          content: document.getElementById("a").value,
                          replies: thereplying});
  }

  dorequeststuff("POST", "/channels/"+thechannel+"/messages", wiadomosc, function(result){
  if(result == 200){
    console.log("Message sent");
    document.getElementById("a").value = "";
  }
  if(result == 403){
    console.log("Message not sent");
    document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">You cannot send this message (no permissons?) -> ('+ messid +')</span>';
    setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
  }
    istyping = true;
    document.getElementById("typing").innerHTML = '';
    resetreplytachment();
  });
}

function joinserver(servid){
	if (servid.indexOf("/") != -1){
		servid = servid.split("/")[3];
  }
  dorequeststuff("POST", "/invites/"+servid, null, function(status){
  if(status === 204){
    console.log("Server joined");
    dowebsocketstuff();
  }
  if(status === 403){
    console.log("Server not joined (invalid invite?)");
  }});
}

function deletemessage(messid){
  dorequeststuff("DELETE", "/channels/"+thechannel+"/messages/"+messid, null, function(status, result){
    if(status == 204){
      console.log("Message deleted");
      document.getElementById(messid).remove();
      //setTimeout(function () { getmessages();  }, 1000);
    }
    if(status == 403){
      console.log("Message not deleted");
      document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">You cannot delete this message ('+ messid +')</span>';
      setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
    }});
}

function leaveleteserver(serverus){
  dorequeststuff("DELETE", "/servers/"+serverus,null,function(){
  if(sendmsgsa.status === 204){
    console.log("Server left/deleted");
  }
  if(sendmsgsa.status === 403){
    console.log("Server not left/deleted");
    document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">You cannot delete this message ('+ messid +')</span>';
    setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
  }});
}

function reacttopre(messid){
  reactid = prompt("What emoji id?");
  if (reactid !== null){
  if ((reactid[0] == ":") && (reactid[reactid.length-1] == ":")) {
    reactid = reactid.slice(1,-1);
  }
  reactto(messid, reactid);
}
}

function reactto(messid, emoteid){
  dorequeststuff("PUT", "/channels/"+thechannel+"/messages/"+messid+"/reactions/"+emoteid,null,function(status){
        if(status === 204){
            console.log("Reacted");
            setTimeout(function () { document.getElementById(messid).remove(); getmessages();  }, 1000);
            }
        if(status === 403){
            console.log("Not reacted");
            document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">You cannot react to this message ('+ messid +') [maybe no react permission?]</span>';
            setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
            }
    });
}

function editprepare(messageid){
  istyping = false;
  document.getElementById("typing").innerHTML = '<input id="edithere" label="edited"/><button id="doedit" onclick="editmessage(\''+messageid+'\')">Edit</button><button onclick="closeattach()">X</button><br>';
  document.getElementById("edithere").value = document.getElementById(messageid).querySelector("#content").innerText;
}

function editmessage(messid){
  message = JSON.stringify({
                          content: document.getElementById("edithere").value,
                          replies: thereplying});

  dorequeststuff("PATCH", "/channels/"+thechannel+"/messages/"+messid, message, function(status){
        if(status === 200){
            console.log("Edited");
            document.getElementById("typing").innerHTML = '';
            setTimeout(function () {document.getElementById("typing").innerHTML = '';istyping = true;getmessages();  }, 1000);
            }
        else if(status === 403){
            console.log("Not edited");
            document.getElementById("typing").innerHTML = '<span style="color: #E64040">You cannot edit this message ('+ messid +')</span>';
            setTimeout(function () { document.getElementById("typing").innerHTML = '';istyping = true;  }, 3000);
            }
        else {
            document.getElementById("typing").innerHTML = '';
            istyping = true;
        }
    });
  resetreplytachment();

}

function attachprepare(){
  istyping = false;
  document.getElementById("typing").innerHTML = '<input type="file" id="attachhere" label="edited"/><button onclick="uploadautumn()">Upload to Autumn</button><button onclick="closeattach()">X</button>';
}

function closeattach(){
    document.getElementById("typing").innerHTML = '';
    istyping = true;
}

function uploadautumn(){
  if (theattachments.length < 5){
    if (document.getElementById("attachhere").files[0] !== undefined){
    theattachment = new FormData();
    theattachment.append('file', document.getElementById("attachhere").files[0]);

    var sendmsgsa = new XMLHttpRequest();
      sendmsgsa.open("POST", "https://autumn.revolt.chat/attachments", true);
      sendmsgsa.setRequestHeader("Accept", "*/*");
      sendmsgsa.onreadystatechange = function(){
        if(sendmsgsa.readyState === 4){
          if(sendmsgsa.status === 200){
              console.log("Uploaded");
              theuploaded = sendmsgsa.responseText;
              theparseduploaded = JSON.parse(theuploaded);
              theattachments.push(theparseduploaded.id);
              replytachment();
            }
          else {
              console.log("Not uploaded");
              document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">Uploading failed</span>';
              setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
              }
        }
      };
      sendmsgsa.send(theattachment);
    }
  }
}

function repply(replyid){
  if (thereplying.length < 5){
 thereplying.push({id: replyid, mention:false});
  }
  else {
    thereplying.shift();
    thereplying.push({id: replyid, mention:false});
  }
 replytachment();
}

function resetreplytachment(){
  thereplying = [];
  theattachments = [];
  replytachment();
}

function replytachment(){


  document.getElementById("replyingto").innerHTML = '<span>Replies to: ' + thereplying.length + '</span><span>, attachments: ' + theattachments.length + '    </span><span onclick="resetreplytachment()">[reset]</span>';

}

function rendermessages(){
              for (var i=0; i < theparsedthing.users.length; i++) {
                  if (theusers[theparsedthing.users[i]._id] === undefined){
                    theusers[theparsedthing.users[i]._id] = [];
                    theusers[theparsedthing.users[i]._id][0] = theparsedthing.users[i].username;


                    if (theparsedthing.users[i].avatar !== undefined){
                      theusers[theparsedthing.users[i]._id][1] = theparsedthing.users[i].avatar._id;
                    }
                    else {
                      theusers[theparsedthing.users[i]._id][1] = "nope";
                    }

                    if (theparsedthing.members !== undefined){
                    theparsedthing.members.forEach(function(item,index){if(item._id.user == theparsedthing.users[i]._id){
                      theusers[theparsedthing.users[i]._id][2] = item.joined_at;

                      if (item.nickname !== undefined){
                      theusers[theparsedthing.users[i]._id][4] =  item.nickname;
                      }

                      if (item.avatar !== undefined){
                      theusers[theparsedthing.users[i]._id][5] =  item.avatar._id
                      }

                      if (item.roles !== undefined){
                      theusers[theparsedthing.users[i]._id][6] = item.roles

                      vipshowrole = '';
                      viprolerank = Infinity;
                      item.roles.forEach(function(item){
                        if (theparsedserver.roles[item].hoist == true){
                          if (theparsedserver.roles[item].rank < viprolerank){
                          vipshowrole = item;
                          viprolerank = theparsedserver.roles[item].rank;
                          }
                        }
                      });
                      theusers[theparsedthing.users[i]._id][9] = vipshowrole;


                      }


                      }});}

                      theparsedthing.users.forEach(function(item,index){if(item._id == theparsedthing.users[i]._id){
                      if (item.badges !== undefined){
                      theusers[theparsedthing.users[i]._id][7] = item.badges
                      }

                      if (item.status !== undefined){
                      theusers[theparsedthing.users[i]._id][8] = item.status
                      }

                      if (item.bot !== undefined){
                      theusers[theparsedthing.users[i]._id][10] =  item.bot
                      }
                      }});

                  }
              }

              if (themessages[0] !== undefined){

                for(var i=themessages.length-1;i>=0;i--){
                  // if (themessages[i].content !== undefined) {

                  var message = document.createElement("div");
                  message.id = themessages[i]._id;
		  message.className = "message";

                  // THE MESSAGE AUTHOR


                  // show author if last message is not made by the same one
                  if (lastprocessedauthor !== themessages[i].author || themessages[i].masquerade !== undefined) {

                  if (themessages[i].system !== undefined) {
                    message.className += " nmsgtop";
                    var msbegin = document.createElement("span");
                    msbegin.class = "system";
                    msbegin.innerHTML = "SYSTEM (!!!)";
                    message.appendChild(msbegin);
                  }

                  else if (theusers[themessages[i].author] === undefined){

                    message.className += " nmsgtop";
                    var msbegin = document.createElement("span");
                    msbegin.style = "color: #764347";
                    msbegin.innerText = themessages[i].author + " (press Fresh to get)";
                    message.appendChild(msbegin);

                  } else {
                  if (theusers[themessages[i].author][1] == "nope") {

                   message.className += " nmsgtop";
                   var msbegin = document.createElement("span");
                   msbegin.className = "author";
                   msbegin.innerText = theusers[themessages[i].author][0];
                   message.appendChild(msbegin);
                  }

                  else if (themessages[i].masquerade !== undefined) {

                  message.className += " nmsgtop";
                  var msbegin = document.createElement("span");
                  msbegin.className = "maskedauthor";
                  if (!thesets.lointernet){
                  pfp = document.createElement("img");
                  pfp.className = "pfp";
                  pfp.src = 'https://jan.revolt.chat/proxy?url=' + themessages[i].masquerade.avatar;
                  msbegin.appendChild(pfp);
                  }
                  namem = document.createElement("span");
                  namem.innerText = themessages[i].masquerade.name + " (masked "+theusers[themessages[i].author][0]+" )";
                  msbegin.appendChild(namem);
                  message.appendChild(msbegin);


                  }

                  else {

                  if (themessages[i].author == theparsedserver.owner){
                  var ownercrown = document.createElement("span");
                  ownercrown.innerText = "♕";
                  ownercrown.style.color = "#c1c14e";
                  ownercrown.style.border = "1px solid"
                  message.appendChild(ownercrown);
                  }

                  if (theusers[themessages[i].author][10] !== undefined){
                  var botcrown = document.createElement("span");
                  botcrown.innerText = "bot";
                  botcrown.style.color = "#c95b5a";
                  botcrown.style.border = "1px solid"
                  message.appendChild(botcrown);
                  }

                  message.className += " nmsgtop";
                  var msbegin = document.createElement("span");
                  msbegin.className = "author";
                  msbegin.id = themessages[i].author;
                  //msbegin.setAttribute("onClick",'document.getElementById("messages").innerHTML = "";');
                  if (!thesets.lointernet){
                  pfp = document.createElement("img");
                  pfp.className = "pfp";
                  if (theusers[themessages[i].author][5] !== undefined){
                  pfp.src = 'https://autumn.revolt.chat/avatars/'+ theusers[themessages[i].author][5] +'?max_side=32';
                  }
                  else {
                  pfp.src = 'https://autumn.revolt.chat/avatars/'+ theusers[themessages[i].author][1] +'?max_side=32';
                  }
                  msbegin.appendChild(pfp);
                  }
                  namem = document.createElement("span");
                  if (theusers[themessages[i].author][4] !== undefined){
                  namem.innerText = theusers[themessages[i].author][4];
                  }
                  else{
                  namem.innerText = theusers[themessages[i].author][0];
                  }
                  thetitle = 'username: "' + theusers[themessages[i].author][0] + '"';
                  if (theusers[themessages[i].author][9] !== undefined){

                  if (theparsedserver.roles[theusers[themessages[i].author][9]] !== undefined){
                  if (theparsedserver.roles[theusers[themessages[i].author][9]].colour !== undefined){
                  msbegin.style.background = theparsedserver.roles[theusers[themessages[i].author][9]].colour;
                  msbegin.style.backgroundClip = "text";
                  msbegin.style.color = "transparent";
                  msbegin.style.borderColor = "#777777";
                  }}

                  // I'll be honest, I have no idea why this one if undefined is needed, but ok
                  if (theusers[themessages[i].author][6] !== undefined){
                  thetitle += ', roles: ';
                  theusers[themessages[i].author][6].forEach(function(item,index){
                  if (theparsedserver.roles[item] != undefined){
                  thetitle += '"' + theparsedserver.roles[item].name + '"';
                  } else {
                  thetitle += '"' + item + '"';
                  }
                  if (index != (theusers[themessages[i].author][6].length - 1)){thetitle += ', '}
                  });
                  }

                  }

                  if (theusers[themessages[i].author][7] !== undefined){
                    usb = theusers[themessages[i].author][7];
                    thetitle += ", badges: "

                    Object.values(thebadges).forEach(function(item, index){
                      if(usb & item){
                        thetitle += ' "' + Object.keys(thebadges)[index] + '" ';
                      }
                    });

                  }
                  msbegin.title  = thetitle;
                  msbegin.appendChild(namem);
                  message.appendChild(msbegin);

                  if (theusers[themessages[i].author][8] !== undefined){
                  var status = document.createElement("span");
                  status.className = "statuss";
                  switch (theusers[themessages[i].author][8].presence) {
                    case "Online":
                      status.style.color ="#477735";
                      break;
                    case "Busy":
                      status.style.color = "rgb(179, 48, 58)";
                      break;
                    case "Focus":
                      status.style.color = "rgb(104, 71, 119)";
                      break;
                    case "Idle":
                      status.style.color = "#c3ac31";
                      break;
                    default:
                      status.style.color = "#665b5b"
                      break;
                  }
                  status.style.borderStyle = "solid";
	          status.style.width = "5px";
	          status.style.height = "5px";
		  status.style.display = "inline-block";
                  message.appendChild(status);
                  }
                  }

                  }
                  samea = false;
                  }
                  else {
                   samea = true;
                  }

                  if (themessages[i].replies !== undefined) {
                    replies = document.createElement("span");
                    replies.style = "color: #ffffff";
                    replies.innerHTML = "=>";
                    for (rep=0;rep<themessages[i].replies.length;rep++){
                    replies.innerHTML += '<a href="#' + themessages[i].replies[rep] + '" onclick="highlight(\''+themessages[i].replies[rep]+'\')">['+(rep+1)+']</a> ';
                    message.appendChild(replies);
                    }
                  }
		  var time = document.createElement("span");
                  time.className = "timeclas";
                  datae = new Date(ulidtodate(themessages[i]._id));
                  time.title = datae;
                  if (thesets.doitime === true){
                  time.innerText = timetobeats(datae);
                  } else {
                  time.innerText = " (" + datae.toLocaleTimeString() + ")"
                  }
                  message.appendChild(time);
                  if (samea == false){
                    message.appendChild(document.createElement('br'));
                  }
                  message.innerHTML += '<div class="messagontrols"><span class="deleto" onclick="deletemessage(\'' + themessages[i]._id + '\')">[delete]</span><span class="replyto" onclick="repply(\'' + themessages[i]._id + '\')">[reply]</span>' + '<span class="replyto" onclick="reacttopre(\'' + themessages[i]._id + '\')">[react]</span>' + '<span class="replyto" onclick="editprepare(\'' + themessages[i]._id + '\')">[edit] </span></div>';



                  if (themessages[i].content !== undefined) {


                  if ((themessages[i].content.split(":").length > 2) && !(thesets.lointernet)) {
                    var mscontent = document.createElement("h5");
                        mscontent.id = "content";
                        msgmote = themessages[i].content.split(":");
                        msgmote.forEach(function (item, index){
                        if ((index % 2 !=0) && (item.length == 26 && item.indexOf("<") == -1)){
                            var mscontent1 = document.createElement("span");
                            mscontent1.class = "emoji";
                            var emote = document.createElement("img");
                            emote.id = "emoji";
                       	    emote.src = "https://autumn.revolt.chat/emojis/" + item;
                            mscontent1.appendChild(emote);
                            mscontent.appendChild(mscontent1);
                      }
                      else if ((index % 2 !=0) && item == "cat_departure") {
                          var mscontent1 = document.createElement("span");
                          mscontent1.class = "emoji";
                          var emote = document.createElement("img");
                          emote.id = "emoji";
                          emote.src = "https://autumn.revolt.chat/emojis/01G7KXGW83G5EGFWX7ASMJ04Q7";
                          mscontent1.appendChild(emote);
                          mscontent.appendChild(mscontent1);
                      }
                      else if ((index % 2 !=0) && item == "wires") {
                          var mscontent1 = document.createElement("span");
                          mscontent1.class = "emoji";
                          var emote = document.createElement("img");
                          emote.id = "emoji";
                          emote.src = "https://autumn.revolt.chat/emojis/01GJTC4RD6XAJXRAAM30KW25VD";
                          mscontent1.appendChild(emote);
                          mscontent.appendChild(mscontent1);
                      }
                      else if (index % 2 !=0 && theoldcustemotes[item] !== undefined) {
                        var mscontent1 = document.createElement("span");
                            mscontent1.class = "emoji";
                        var emote = document.createElement("img");
                            emote.id = "emoji";
                            emote.src = "https://dl.insrt.uk/projects/revolt/emotes/" + theoldcustemotes[item];
                        mscontent1.appendChild(emote);
                        mscontent.appendChild(mscontent1);
                      }
                      else if (index % 2 !=0) {
                        var mscontent2 = document.createElement("span");
                        mscontent2.innerText = ":" + item + ":";
                        mscontent.appendChild(mscontent2);
                      }
                      else {
                        var mscontent2 = document.createElement("span");
                        mscontent2.innerText = item;
                        mscontent.appendChild(mscontent2);
                      }


                    });
                    message.appendChild(mscontent);
                  }
                   else {
                  var mscontent = document.createElement("h5");
                  mscontent.id = "content";
                  mscontent.innerText = themessages[i].content;
                  message.appendChild(mscontent);
                   }
                  }

                  else if (themessages[i].system !== undefined) {
                    var mscontent = document.createElement("h5");
                    mscontent.id = "content";
                    mscontent.innerText = themessages[i].system.type + "  " + themessages[i].system.id;
                    message.appendChild(mscontent);
                  }

                  if (themessages[i].embeds !== undefined) {
                    themessages[i].embeds.forEach(function(item, index) {
                      var embcontent = document.createElement("h5");
                      embcontent.id = "embedd";
                      embcontent.innerText = item.description;
                      if (item.colour !== undefined) {
                       embcontent.style.borderColor = item.colour;
                      }
                      message.appendChild(embcontent);
                      });
                    }

                  if (themessages[i].reactions !== undefined){
                        Object.keys(themessages[i].reactions).forEach(function(item, index) {
                        var reactcontent = document.createElement("span");
                        reactcontent.id = "reactcont"
                        reactcontent.title = "reacted: "
                        themessages[i].reactions[item].forEach(function(item2, index2) {
                          if (theusers[themessages[i].reactions[item][index2]] !== undefined){
                            reactcontent.title += theusers[themessages[i].reactions[item][index2]][0] + " ";
                          }
                          else {
                            reactcontent.title += themessages[i].reactions[item][index2] + " ";
                          }
                        });
                        reactcontent.setAttribute("onclick", "reactto('" + themessages[i]._id + "', '" + item + "')");
                        if ((!/^[\x00-\x7F]+$/g.test(item)) || (thesets.lointernet)){
                          unimoji = document.createElement("span");
                          unimoji.innerText = item;
                          reactcontent.appendChild(unimoji);
                         } else {
                        var emote = document.createElement("img");
                         emote.id = "react";
                         emote.src = "https://autumn.revolt.chat/emojis/" + item;
                         reactcontent.appendChild(emote);
                         }
                         var emotetimes = document.createElement("span");
                         emotetimes.id = "reactcount";
                         emotetimes.innerText = themessages[i].reactions[item].length
                         reactcontent.appendChild(emotetimes);
                         message.appendChild(reactcontent);
                    });

                  }

                  /* ATTACHMENT EMBEDS */

                  if (themessages[i].attachments !== undefined){
                    themessages[i].attachments.forEach(function(item, index) {
                        att = document.createElement("h5")
                        att.id = "filename";
                        atnam = document.createElement("span");
                        atnam.innerText = themessages[i]["attachments"][index]["filename"];
                        att.appendChild(atnam);
                        ahr = document.createElement("a");
                        ahr.href = 'https://autumn.revolt.chat/attachments/' + themessages[i]["attachments"][index]["_id"];
                        ahr.target = "_blank"
                        ahr.rel = "noopener noreferrer"
                        ahr.innerText = "⇓"
                        att.appendChild(ahr);
                        message.appendChild(att);

                    if (!thesets.lointernet){

                    switch (themessages[i]["attachments"][index]["metadata"]["type"]) {
                      case "Image":
                        emb = document.createElement("img");
                        emb.id = "emb" + index;
                        emb.className = "embed";
                        emb.src = "https://autumn.revolt.chat/attachments/" + themessages[i]["attachments"][index]["_id"];
                        message.appendChild(emb);
                      break;

                      case "Audio":
                        emb = document.createElement("audio");
                        emb.controls = true;
                        emb.preload = "none";
                        source = document.createElement("source");
                        source.src = "https://autumn.revolt.chat/attachments/" + themessages[i]["attachments"][index]["_id"];
                        source.type = themessages[i].attachments[index].content_type;
                        emb.appendChild(source);
                        message.appendChild(emb);
                        break;

                      case "Video":
                        emb = document.createElement("video");
                        emb.controls = true;
                        emb.preload = "none";
                        source = document.createElement("source");
                        source.src = "https://autumn.revolt.chat/attachments/" + themessages[i]["attachments"][index]["_id"];
                        source.type = themessages[i].attachments[index].content_type;
                        emb.appendChild(source);
                        message.appendChild(emb);
                        break;
                      default:
                        if (theparsedthing.messages[i]["attachments"][index].filename.split(".")[theparsedthing.messages[i]["attachments"][index].filename.split(".").length-1] == "webp") {
                          emb = document.createElement("img");
                          emb.id = "emb" + index;
                          emb.className = "embed";
                          emb.src = "https://autumn.revolt.chat/attachments/" + themessages[i]["attachments"][index]["_id"];
                          message.appendChild(emb)
                        }
                        else if (themessages[i]["attachments"][index].content_type == "video/ogg") {
                          emb = document.createElement("video");
                          emb.controls = true;
                          emb.preload = "none";
                          source = document.createElement("source");
                          source.src = "https://autumn.revolt.chat/attachments/" + themessages[i]["attachments"][index]["_id"];
                          source.type = themessages[i].attachments[index].content_type;
                          emb.appendChild(source);
                          message.appendChild(emb);
                        }
                        else if (themessages[i]["attachments"][index].content_type == "application/x-riff") {
                          emb = document.createElement("audio");
                          emb.controls = true;
                          emb.preload = "none";
                          source = document.createElement("source");
                          source.src = "https://autumn.revolt.chat/attachments/" + themessages[i]["attachments"][index]["_id"];
                          source.type = "audio/wav";
                          emb.appendChild(source);
                          message.appendChild(emb);
                        }}
                    }

                    });

                  }

                  document.getElementById("messages").appendChild(message);
                  lastprocessedauthor = themessages[i].author;
                }

                lastmessage = themessages[0]._id;
                replytachment();

              }
}

function getmessages(nearb, messid){
  istyping = true;
  if (nearb !== undefined){
    if (nearb == 0){
      restofthat = "&before="+messid;
    } else if (nearb == 1){
      restofthat = "&nearby="+messid;
    } else if (nearb == 2) {
      restofthat = "&after="+messid;
      }
  } else {
    restofthat = "";
  }
  dorequeststuff("GET", "/channels/"+thechannel+"/messages?include_users=true" + restofthat,null,function a(status, response){
    // console.log(response);
    if(status == 200){
      thething = response;
      theparsedthing = JSON.parse(thething);
      themessages = theparsedthing.messages;
      if (themessages[themessages.length-1] !== undefined){
        firstmessage = themessages[themessages.length-1]._id;
      }
      else {
        firstmessage = "";
      }
      document.getElementById("messages").style.backgroundImage = '';
      document.getElementById("messages").style.backgroundRepeat = "";
      document.getElementById("messages").style.backgroundSize = "";
      document.getElementById("messages").style.backgroundPositionX = "";
      document.getElementById("messages").innerHTML = '<h2 id="newm">===</h2><button onclick="getmessagelegacyolder()">Get older messages</a>';
      if (socket.readyState == 3) {
        dowebsocketstuff();
      }
      rendermessages();
      document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
    }
    if(status == 403){
      console.log("Getting the channel messages failed");
      document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">You cannot access this channel (lack of permissions?) -> ('+ thechannel +')</span>';
      setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
    }});
}

function getmessagelegacyolder(){
  getmessages(0, firstmessage);
}

// WS related
function keepAlive() {
  if (socket.readyState == socket.OPEN) {
    socket.send('{"type": "Ping","data": ' + Date.now() + '}');
  }
  timerId = setTimeout(keepAlive, 30000);
}

function cancelKeepAlive() {
  if (timerId) {
    clearTimeout(timerId);
  }
}
// Keyboard controls

/* document.addEventListener('keydown', function(event){
   if ((document.activeElement != document.getElementById("a")) || (document.activeElement != document.getElementById("edithere"))){
    if(event.key === "q"){
		document.getElementById("selecftt").focus();
	}
    if(event.key === "w"){
		document.getElementById("messages").scrollTop -= 110;
	}
	if(event.key === "s"){
		document.getElementById("messages").scrollTop += 110;
	}
    }
});*/

document.addEventListener('keyup', function(event){
	if(event.key === "Escape"){
		document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
        document.getElementById("messages").focus();
	}
	if(thestage != "login"){
    if(event.key === "Enter"){
      if (document.activeElement == document.getElementById("edithere")){
        document.getElementById("doedit").click();
      }
      else {
      document.getElementById("send").click();
      }
	}
	if(event.key === "i"){
      document.getElementById("a").focus()
	}
    }
});

