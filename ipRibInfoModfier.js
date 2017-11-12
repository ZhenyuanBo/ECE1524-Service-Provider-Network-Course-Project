/*
@Author: Zhenyuan Bo
@Date: Dec 12, 2016
@File Description: modify the ipRibInfo.xml
*/

load('customLibrary.js');

var file1 = "ipRibInfo.xml"
var xml_string1 = FileUtils.readFile(file1);
var xml_1 =XML(xml_string1.replaceFirst("<\\?xml[^>]*\\?>[\n\r\t ]*", "")); 

var paraList = xml_1..p;
var newIpRibInfo = <IpList></IpList>;

for (var i=0; i<paraList.length(); i++){
	var ipVal = paraList[i].toString();
	var ipRegion = new XML('<IpRegion></IpRegion>');
	
	if(ipVal.indexOf('via')==-1){
		ipRegion.@id=ipVal;
		newIpRibInfo.appendChild(ipRegion);
	}
}

var start=0;
var longIPlst = ["10.10.10.10", "12.12.12.12", "15.15.15.15"];


for (var i=0; i<newIpRibInfo..IpRegion.length();i++){
	for (var j=start; j<paraList.length();j++){
		var fromVal = paraList[j].toString();
		
		if(fromVal.indexOf('via')!=-1){
			var fromId = new XML('<fromId></fromId>');
			var flag = false;
			for (var k=0; k<longIPlst.length; k++){
				if(fromVal.indexOf(longIPlst[k])!=-1){
					fromId.appendChild((fromVal.substring(46,fromVal.length)).substring(5,16));
					flag=true;
					newIpRibInfo..IpRegion[i].appendChild(fromId);
				}
			}
			if(!flag){
				fromId.appendChild(fromVal.substring(46,fromVal.length).substring(5,12));
				newIpRibInfo..IpRegion[i].appendChild(fromId);
			}
		}
		
		if((j!=paraList.length()-1) && (paraList[j+1].toString().indexOf('via')==-1||(j-start)==2)){
			start = j+1;
			break;
		}
		
	}
}
		

overwrite(newIpRibInfo, "newIpRibInfo.xml");


