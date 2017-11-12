/*
@Author: Zhenyuan Bo
@Date: Dec 14, 2016
@File Description: 
*/

load('customLibrary.js');

var file1 = "newConnectionRef.xml"
var file2 = "result.xml";
var xml_string1 = FileUtils.readFile(file1);
var xml_string2 = FileUtils.readFile(file2);
var xml_1 =XML(xml_string1.replaceFirst("<\\?xml[^>]*\\?>[\n\r\t ]*", "")); 
var xml_2 =XML(xml_string2.replaceFirst("<\\?xml[^>]*\\?>[\n\r\t ]*", "")); 

var nodeList1 = xml_1..Node;
var nodeList2 = xml_2..Node;


for (var i=0; i<nodeList2.length();i++){

	var nodeIdValList2 = nodeList2[i].nodeId[0].toString();

	for (var j=0; j<nodeList1.length();j++){
		var nodeIdValList1 = nodeList1[j].nodeId[0].toString();
		var fromIdValList1 =  nodeList1[j].fromId[0].toString();
		if((nodeIdValList2 == nodeIdValList1)){
			var fromIdList = [];
			for (var k=0; k<nodeList2[i]..fromId.length(); k++){
				fromIdList.push(nodeList2[i]..fromId[k].toString());
			}
			if(fromIdList.indexOf(nodeList1[j].fromId[0].toString())==-1){
				nodeList1[j].fromId[0].@check='YES';
				nodeList2[i].appendChild(nodeList1[j].fromId[0]);
			}else{
				for (var L=0; L<nodeList2[i]..fromId.length(); L++){
					if(fromIdValList1 == nodeList2[i]..fromId[L].toString()){
						nodeList2[i]..fromId[L].@check='YES';
					}
				}
			}

		}else if(nodeIdValList2 == fromIdValList1){
			var fromIdList1 = [];
			for (var M=0; M<nodeList2[i]..fromId.length(); M++){
				fromIdList1.push(nodeList2[i]..fromId[M].toString());
			}
			
			if(fromIdList1.indexOf(nodeIdValList1)==-1){
				var fromId = new XML('<fromId>'+nodeIdValList1+'</fromId>');
				fromId.@check='YES';
				nodeList2[i].appendChild(fromId);
			}else{
				for (var N=0; N<nodeList2[i]..fromId.length(); N++){
					if(nodeIdValList1 == (nodeList2[i]..fromId[N].toString())){
						nodeList2[i]..fromId[N].@check='YES';
					}
				}
			}

		}
	}
}

var nodeListTag = <nodeList></nodeList>;
nodeListTag.appendChild(nodeList2);

var metric10 = 10;
var node1 = new XML('<Node></Node>');
var nodeId = new XML('<nodeId>'+'STTLng'+'</nodeId>');
node1.appendChild(nodeId);

for each (node in nodeList2){
	if(node.Metric[0].toString()== metric10.toString()){
		var fromId = new XML('<fromId>'+node.nodeId[0].toString()+'</fromId>');
		node1.appendChild(fromId);
	}
}
nodeListTag.appendChild(node1);
overwrite(nodeListTag, "newResult.xml");

/*
CLEAN UP AND RELEASE THE FINAL RESULT
*/


var finalList = <NodeList></NodeList>;

for each (node in nodeListTag..Node){
	var node1 = new XML('<Node></Node>');
	var nodeIdstr = node.nodeId[0].toString();
	node1.@id = nodeIdstr;
	for each(fromId in node..fromId){
		if(fromId.toString()=='STTLng' || fromId.@check=='YES'){
			node1.appendChild(fromId);
		}else if(node.nodeId[0].toString() == 'STTLng'){
			node1.appendChild(node.fromId[0]);
		}
	}

	finalList.appendChild(node1);
}

overwrite(finalList, "finalResult.xml");


			
