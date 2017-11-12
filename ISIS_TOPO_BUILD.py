"""
Author: Zhenyuan Bo, Xiao Wang
Date: Dec 11, 2016
Description: 
"""

from xml.etree.ElementTree import Element, SubElement, tostring
from xml.dom import minidom

def prettify(elem):
    """Return a pretty-printed XML string for the Element.
    """
    rough_string = tostring(elem, 'utf-8')
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent="  ")


routerProperties = ["Metric","NextHop"]
prevNodeID = ""
prevMetric = ""
prevNextHop = ""

with open('isisTopoInfo.txt','r') as file:
	data = file.readlines()
	nodeList = Element('NodeList')
	for Line in data:
		info = Line.split()
		listLength = len(info)

		if(listLength==5):
			if(info[0]!="IS-IS"):
				nodeRoot = SubElement(nodeList,'Node')
				nodeId = SubElement(nodeRoot,'nodeId')
				nodeId.text = info[0]
				child1 = SubElement(nodeRoot,routerProperties[0])
				child1.text = info[1]
				child2 = SubElement(nodeRoot,routerProperties[1])
				child2.text = info[2]
				"""
				store previous data of previous node:
				"""
				prevNodeID = info[0]
				prevMetric = info[1]
				prevNextHop = info[2]

		elif(listLength == 3):
			nodeRoot = SubElement(nodeList,'Node')
			nodeId = SubElement(nodeRoot,'nodeId')
			nodeId.text = prevNodeID
			child3 = SubElement(nodeRoot,routerProperties[0])
			child3.text = prevMetric
			child4 = SubElement(nodeRoot,routerProperties[1])
			child4.text = info[0]


	f = open('nodeList.xml','r+')
	f.write(prettify(nodeList))

	






				








