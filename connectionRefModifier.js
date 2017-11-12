/*
@Author: Zhenyuan Bo
@Date: Dec 14, 2016
@File Description: modify the connectionRef.xml
*/

load('customLibrary.js');

var file1 = "connectionRef.xml"
var xml_string1 = FileUtils.readFile(file1);
var xml_1 =XML(xml_string1.replaceFirst("<\\?xml[^>]*\\?>[\n\r\t ]*", "")); 

var nodeList = xml_1..IpRegion;
var newNodeList = <NodeList></NodeList>;

for each (node in nodeList){
	if(node..fromId.length() == 2){
		var newNode = new XML('<Node></Node>');
		var val  = node..fromId[0].valueOf().toString();
		var str = '<nodeId>'+val+'</nodeId>';
		var newNodeId = new XML(str);
		newNode.appendChild(newNodeId);
		newNode.appendChild(node..fromId[1]);
		newNodeList.appendChild(newNode);
	}
}

overwrite(newNodeList,"newConnectionRef.xml");


