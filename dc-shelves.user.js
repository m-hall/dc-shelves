// ==UserScript==
// @name	Display case Manager
// @description	Adds various function for manipulating the Display Case
// @include	*kingdomofloathing.com/managecollection.php*
// @include	*kingdomofloathing.com/managecollectionshelves.php*
// @include	*kingdomofloathing.com/account.php*
// ==/UserScript==

var numShelves=0;
var maxShelf=37;
var fontsize=16;
var loadingImage="data:image/gif;base64,R0lGODlhEgASAJECAMDAwNvb2%2F%2F%2F%2FwAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFCgACACwAAAAAEgASAAACMpSPqQmw39o7IYjo6qpacpt8iKhoITiiG0qWnNGepjCv7u3WMfxqO0%2FrqVa1CdCIRBQAACH5BAUKAAIALAcAAQAIAAYAAAIOVCKZd2osAFhISmcnngUAIfkEBQoAAgAsCwADAAYACAAAAg5UInmnm4ZeAuBROq%2BtBQAh%2BQQFCgACACwLAAcABgAIAAACD5QTJojH2gQAak5jKdaiAAAh%2BQQFCgACACwHAAsACAAGAAACDpQdcZgKIFp4Lzq6RF0FACH5BAUKAAIALAMACwAIAAYAAAIOFCCZd2osQlhISmcnngUAIfkEBQoAAgAsAQAHAAYACAAAAg4UIHmnm4ZeCuFROq%2BtBQAh%2BQQFCgACACwBAAMABgAIAAACD5QBJojH2kQIak5jKdaiAAA7"

function shelvesGrouping () {
	var val = false;
	var i;
	var objShelves;
	var viewLink;
	var backLink;
	

	for (i=0;i<document.getElementsByTagName('b').length;i++) {
		if (document.getElementsByTagName('b')[i].innerHTML.indexOf("Shelves:") != -1) {
			val=true;
			break;
		}
	}
	if (val) {
		var safety = document.createElement("span");
		objShelves = document.getElementsByTagName('b')[i].parentNode;
		safety.appendChild(objShelves.childNodes[objShelves.childNodes.length-2]);
		safety.appendChild(objShelves.childNodes[objShelves.childNodes.length-1]);

	
		var tbl = document.createElement("table");
		tbl.setAttribute ("width", "95%");
		tbl.setAttribute ("cellpadding", "0");
		tbl.setAttribute ("cellspacing", "0");
		tbl.setAttribute ("style", "border: 1px solid #0000FF;");
	
		var tbo = document.createElement("tbody");
	
		var row = document.createElement("tr");
		var cell= document.createElement("td");
	
		cell.setAttribute ("style", "color: white;font-weight:bolder;");
		cell.setAttribute ("align", "center");
		cell.setAttribute ("bgcolor", "blue");
		var span = document.createElement("span");
		
		var cellText = document.createTextNode("Shelves");
		span.setAttribute ("onClick", "if (document.getElementById('shelfcase').style.display == 'none') {document.getElementById('shelfcase').style.display = 'block';}else{document.getElementById('shelfcase').style.display = 'none';};");
		span.setAttribute ("style", "cursor:pointer;");
		span.appendChild (cellText);
		cell.appendChild (span);
	
		row.appendChild (cell);
		tbo.appendChild (row);
		span= null
		cell= null;
		row=null;
		
		var row = document.createElement("tr");
		var cell= document.createElement("td");
		cell.setAttribute ("align", "center");
		cell.setAttribute ("style", "padding:3 3 3 3;");
		
		span = document.createElement("span");
		span.setAttribute ("align", "center");
		span.setAttribute ("style", "display:block;");
		span.setAttribute ("id", "shelfcase");
	
	
		cell.appendChild (span);
		row.appendChild (cell);
		tbo.appendChild (row);
		tbl.appendChild (tbo);
		objShelves.removeChild(objShelves.childNodes[0]);
		objShelves.parentNode.appendChild(tbl);
		objShelves.parentNode.appendChild(safety);
		document.getElementById("shelfcase").appendChild(objShelves);
		
	
	}
}



function shelvesMover () {
	var val = false;
	var i;

	var objShelves;
	var tbl;
	var tbo;
	var row;
	var cell;
	var tbl2;
	var tbo2;
	
	var row1;
	var cell1;

	var span;
	var span;


	for (i=0;i<document.getElementsByTagName('td').length;i++) {
		if (document.getElementsByTagName('td')[i].innerHTML.indexOf("Shelf #1") == 0) {
			val=true;
			break;
		}
	}
	if (val) {
		objShelves = document.getElementsByTagName('td')[i].parentNode.parentNode;
		if (objShelves.childNodes.length > 1) {
			
			//objShelf=objShelves.childNodes[0];
			tbl=document.createElement("table");
			tbo=document.createElement("tbody");
			var ids = 0;
			for (i=0; i<objShelves.childNodes.length; i=i) {
				ids += 1;
				row=document.createElement("tr");
				cell=document.createElement("td");
				cell.setAttribute("id","shlfNum"+ids);
				n=parseInt(objShelves.childNodes[0].getElementsByTagName("td")[0].innerHTML.substr(7,objShelves.childNodes[0].getElementsByTagName("td")[0].innerHTML.length-1));
				cell.appendChild(document.createTextNode(n));
				maxShelf = n;
				row.appendChild(cell);
				cell=null;
				cell=document.createElement("td");
				span=document.createElement("span");
				span.setAttribute("id", "shlf"+(ids));
				tbl2=document.createElement("table");
				tbl2.setAttribute("style", "border: 1px solid #aaaacc;background:#ddddff;width:100%;position:relative;top:0px;left:0px;z-index:1;height:100%");
				tbo2=document.createElement("tbody");
				tbo2.appendChild(objShelves.childNodes[0]);
				tbo2.childNodes[0].childNodes[0].setAttribute ("style", "cursor:move;");
				new itemDrag(tbo2.childNodes[0].childNodes[0]);
				//tbo2.childNodes[0].childNodes[0].addEventListener("mousedown", startGrab, false);
				tbl2.appendChild(tbo2);
				span.appendChild(tbl2);
				cell.appendChild(span);
				row.appendChild(cell);
				tbo.appendChild(row)
				span=null;
				row=null;
				tbl2=null;
				tbo2=null;
				cell=null;
			}
			numShelves = ids;
			row=document.createElement("tr");
			cell=document.createElement("td");
			cell.setAttribute("id", "dc_status");
			cell.setAttribute("colspan", 2);
			row.appendChild(cell);
			tbo.appendChild(row);
			row=null;
			cell=null;
			tbl.appendChild(tbo);
			cell1 = document.createElement("td");
			row1 = document.createElement("tr");
			cell1.appendChild(tbl);
			row1.appendChild(cell1);
			objShelves.appendChild(row1);
			var iframe = document.createElement("iframe");
			iframe.setAttribute("id", "shelfframe");
			iframe.setAttribute("border", 0);
			iframe.setAttribute("style", "display:block;width:0px;height:0px;border:0px;");
			iframe.setAttribute("src", "managecollectionshelves.php?nojs=1");
			cell1 = document.createElement("td");
			row1 = document.createElement("tr");
			cell1.appendChild(iframe);
			row1.appendChild(cell1);
			objShelves.appendChild(row1);
			tbo = null;
			tbl = null;
			cell1=null;
			row1= null;
			
		}
		
		for (i=0;i<document.getElementsByTagName("input").length;i++) {
			document.getElementsByTagName("input")[i].setAttribute("id", document.getElementsByTagName("input")[i].getAttribute("name"))
			if (document.getElementsByTagName("input")[i].getAttribute("value") == "Modify Shelves") {
				document.getElementsByTagName("input")[i].setAttribute("type", "button");
				document.getElementsByTagName("input")[i].setAttribute("id", "modifyshelves");
				document.getElementsByTagName("input")[i].addEventListener("click", submitButton, false);
				var img = document.createElement("img");
				img.setAttribute("id", "loadingImage");
				img.setAttribute("src", loadingImage);
				img.setAttribute("width", "18px");
				img.setAttribute("height", "18px");
			//	img.setAttribute("align", "right");
				img.setAttribute("style", "display:none;");
				span=document.createElement("span");
				span.setAttribute("id", "loadtext");
				span.setAttribute("style", "font-size:10px;");
				script=document.createElement("script");
				script.setAttribute("language", "javascript");
				script.setAttribute("id", "bum51JS");
				document.getElementsByTagName("input")[i].parentNode.appendChild(img);
				document.getElementsByTagName("input")[i].parentNode.appendChild(span);
				document.getElementsByTagName("input")[i].parentNode.appendChild(script);
				span= null;
				img = null;
			}
		}
	}
}

function submitButton () {
	//This is where the scripts to organize the shelves will go.
	//Basically, all of the background work goes here, but the user has to know that something is happening
	//so a loading image will show
	document.getElementById("bum51JS").innerHTML="function addPoints(id) {\n\tdocument.getElementById(id).innerHTML += \".\";\n\tsetTimeout (\"addPoints('\"+id+\"')\", 1000);\n}";

	document.getElementById("loadingImage").style.display = "block";
	document.getElementById("modifyshelves").style.display = "none";
	document.getElementsByTagName("body")[0].style.cursor = "wait";
	document.getElementById("loadtext").innerHTML = "<b>Preparing Changes</b>";
	setTimeout ("addPoints('loadtext')", 500);
	
	document.getElementById("loadtext").innerHTML += "<br>Getting Shelf Changes";
	var arrChanger = new Array(maxShelf+1);
	var shlfNum = null;
	var stitle = new Array(maxShelf+1);
	var sdelete = new Array(maxShelf+1);
	for (i=1; i<=maxShelf;i++) {
		shlfNum = document.getElementById("shlfNum"+i) ? document.getElementById("shlfNum"+i).innerHTML : null; // this one will detect which shelf it ACTUALLY is so that it won't screw up if there are shelves missing in the middle of the set
		if (shlfNum != null){arrChanger[document.getElementById("shlf"+i).childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML.substr(7,document.getElementById("shlf"+i).childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML.length-1)] = shlfNum;}
		if (document.getElementById("newname"+i)) {
			if (document.getElementById("newname"+i).value.length < 1) {
				document.getElementById("newname"+i).value="";
			}
			stitle[i] = document.getElementById("newname"+i).value;
			sdelete[i] = document.getElementById("delete"+i).checked;
		}
	}
	document.getElementById("loadtext").innerHTML += ". Completed<br>Changing item associations";

	
	var shlfFrame = self.frames[0].document;
	for (i=0;i<shlfFrame.getElementsByTagName("select").length;i++) {
		if (arrChanger[shlfFrame.getElementsByTagName("select")[i].value] != shlfFrame.getElementsByTagName("select")[i].value) {
			shlfFrame.getElementsByTagName("select")[i].value = arrChanger[shlfFrame.getElementsByTagName("select")[i].value];
		}
	}

	document.getElementById("loadtext").innerHTML += ". Completed<br>Submitting Changes";
	shlfFrame.forms[0].submit();
	for (i=1;i<=maxShelf;i++){
		if (document.getElementById("newname"+arrChanger[i])) {
			document.getElementById("newname"+arrChanger[i]).value=stitle[i];
			document.getElementById("delete"+arrChanger[i]).checked=sdelete[i];
		}
	}
}

function itemDrag (elem) {
	var dropZoneChange=32;

	var mousex;
	var mousey;
	var startx;
	var starty;
	
	function snapToTable() {
		var nodeID = parseInt(elem.parentNode.parentNode.parentNode.parentNode.getAttribute("id").substr(4,elem.parentNode.parentNode.parentNode.parentNode.getAttribute("id").length-1));
		var span = document.createElement("span");
		if (parseInt(elem.parentNode.parentNode.parentNode.style.top) > dropZoneChange) {
			if (nodeID < numShelves) {
				var nodeTo = (nodeID+Math.floor(parseInt(elem.parentNode.parentNode.parentNode.style.top)/dropZoneChange));
				if (nodeTo > numShelves) {
					nodeTo=numShelves;
				}else if (nodeTo < 1) {
					nodeTo=1;
				}
				for (i=nodeID;i<nodeTo;i++) {
					span.appendChild(document.getElementById("shlf"+(i+1)).childNodes[0]);
					document.getElementById("shlf"+(i+1)).appendChild(document.getElementById("shlf"+i).childNodes[0]);
					document.getElementById("shlf"+i).appendChild(span.childNodes[0]);
				}
			}
		}else if (parseInt(elem.parentNode.parentNode.parentNode.style.top) < -dropZoneChange) {
			if (nodeID > 1) {
				var nodeTo = (nodeID+Math.floor(parseInt(elem.parentNode.parentNode.parentNode.style.top)/dropZoneChange+1));
				if (nodeTo > numShelves) {
					nodeTo=numShelves;
				}else if (nodeTo < 1) {
					nodeTo=1;
				}
				for (i=nodeID;i>nodeTo;i--) {
					span.appendChild(document.getElementById("shlf"+(i-1)).childNodes[0]);
					document.getElementById("shlf"+(i-1)).appendChild(document.getElementById("shlf"+i).childNodes[0]);
					document.getElementById("shlf"+i).appendChild(span.childNodes[0]);
				}
				
			}
		}
		span = null;
		elem.parentNode.parentNode.parentNode.style.top="0px";
		elem.parentNode.parentNode.parentNode.style.left="0px";
	}

	function startGrab (e) {
		var e = e || window.event;
		mousex=parseInt(e.clientX);
		mousey=parseInt(e.clientY);
		startx=parseInt(elem.parentNode.parentNode.parentNode.style.left);
		starty=parseInt(elem.parentNode.parentNode.parentNode.style.top);
		elem.parentNode.parentNode.parentNode.style.background = '#aaaaff';
		elem.parentNode.parentNode.parentNode.style.MozOpacity = 0.7;
		document.addEventListener ("mousemove", moveGrab, false);
		document.addEventListener ("mouseup", dropGrab, false);
		elem.removeEventListener ("mouseout", moveOut, false);
		elem.removeEventListener ("mouseover", moveOver, false);
		elem.parentNode.parentNode.parentNode.style.zIndex = 10;
	}
	
	function moveGrab (e) {
		var e = e || window.event;
		var mx=e.clientX;
		var my=e.clientY;
		elem.parentNode.parentNode.parentNode.style.left = startx-mousex+mx;
		elem.parentNode.parentNode.parentNode.style.top = starty-mousey+my;
	}

	function moveGrabOut (e) {
		moveGrab(e);
	}
	
	function dropGrab () {
		document.removeEventListener ("mousemove", moveGrab, false);
		document.removeEventListener ("mouseup", dropGrab, false);
		elem.parentNode.parentNode.parentNode.style.MozOpacity = 1.0;
		elem.parentNode.parentNode.parentNode.style.background = '#ccccff';
		elem.parentNode.parentNode.parentNode.style.zIndex = 1;
		elem.addEventListener ("mouseout", moveOut, false);
		elem.addEventListener ("mouseover", moveOver, false);
		snapToTable();
	}

	function moveOver () {
		elem.parentNode.parentNode.parentNode.style.background = '#ccccff';
	}
	
	function moveOut () {
		elem.parentNode.parentNode.parentNode.style.background = '#ddddff';
	}
	
	elem.addEventListener ("mousedown", startGrab, false);
	elem.addEventListener ("mouseout", moveOut, false);
	elem.addEventListener ("mouseover", moveOver, false);

}

function shelvesSubmitted () {
	if (self.parent.location.href.indexOf("managecollection.php") != -1) {
		if (document.getElementsByTagName("body")[0].innerHTML.indexOf("Items moved") != -1) {
			self.parent.document.forms[3].submit();
		}else {
			if (document.getElementById("loadingImage")) {
				if (document.getElementById("loadingImage").style.display != "none") {
					if (confirm("Error, shelf items not moved. Continue to change shelves?")) {
						self.parent.document.forms[3].submit();
					}
				}
			}
		}
	}
}


function getPage () {
	loc = self.location.href;
	if (loc.indexOf("managecollection.php") != -1){
		shelvesGrouping();
		shelvesMover();
	} else if (loc.indexOf("managecollectionshelves.php") != -1) {
		shelvesSubmitted();
	}
	
}


getPage();