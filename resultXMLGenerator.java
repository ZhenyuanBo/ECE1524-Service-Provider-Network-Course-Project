/*
 * @author: Zhenyuan Bo, Xiao Wang
 * @Date: Dec 11, 2016
 * @File Description: discover the topology of Abilene Network
 */

package analysisPart1;

import java.util.*;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.OutputKeys;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;
import org.w3c.dom.Element;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import java.io.File;

public class part1 {
	
	public static void main(String[] args){
		try{
			File fXmlFile = new File("nodeList.xml");
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(fXmlFile);
			doc.getDocumentElement().normalize();
			System.out.println("Root element :" + doc.getDocumentElement().getNodeName());
			NodeList nList = doc.getElementsByTagName("Node");
			
			List<String> metric20NodeList = new ArrayList<String>(); 
			List<String> metric30NodeList = new ArrayList<String>();
			List<String> metric40NodeList = new ArrayList<String>();
			List<String> metric50NodeList = new ArrayList<String>();
			List<String> metric60NodeList = new ArrayList<String>();
			
			System.out.println("----------------------------");
			
			/*
			 * 1. set the source node for destination node with Metric 10 to be STTLng
			 * 2. create lists for nodes with Metric 20, 30, 40, 50 and 60
			 */
			
			for (int i=0; i<nList.getLength(); i++){
				Node nNode = nList.item(i);
				if(nNode.getNodeType() == Node.ELEMENT_NODE){
					Element eElement = (Element) nNode;
					
					if(eElement.getElementsByTagName("Metric").item(0).getTextContent().equals(Integer.toString(10))){
						Element fromNode = doc.createElement("fromId");
						fromNode.appendChild(doc.createTextNode("STTLng"));
						nNode.appendChild(fromNode);
					}else if(eElement.getElementsByTagName("Metric").item(0).getTextContent().equals(Integer.toString(20))){
						metric20NodeList.add(eElement.getElementsByTagName("nodeId").item(0).getTextContent());		
					}else if(eElement.getElementsByTagName("Metric").item(0).getTextContent().equals(Integer.toString(30))){
						metric30NodeList.add(eElement.getElementsByTagName("nodeId").item(0).getTextContent());
					}else if(eElement.getElementsByTagName("Metric").item(0).getTextContent().equals(Integer.toString(40))){
						metric40NodeList.add(eElement.getElementsByTagName("nodeId").item(0).getTextContent());
					}else if(eElement.getElementsByTagName("Metric").item(0).getTextContent().equals(Integer.toString(50))){
						metric50NodeList.add(eElement.getElementsByTagName("nodeId").item(0).getTextContent());
					}else if(eElement.getElementsByTagName("Metric").item(0).getTextContent().equals(Integer.toString(60))){
						metric60NodeList.add(eElement.getElementsByTagName("nodeId").item(0).getTextContent());
					}
				}
			}
			
			/*
			 * find the source node for each destination node (except for Metric 10 and Metric 20)
			 */
			
			for (int i=0; i<nList.getLength(); i++){
				Node nNode = nList.item(i);
				if(nNode.getNodeType() == Node.ELEMENT_NODE){
					Element eElement = (Element) nNode;
					if(eElement.getElementsByTagName("Metric").item(0).getTextContent().equals(Integer.toString(30))){
						for (int j=0; j<metric20NodeList.size(); j++){
							Element fromNode = doc.createElement("fromId");
							fromNode.appendChild(doc.createTextNode(metric20NodeList.get(j)));
							nNode.appendChild(fromNode);
						}
					}else if(eElement.getElementsByTagName("Metric").item(0).getTextContent().equals(Integer.toString(40))){
						for (int j=0; j<metric30NodeList.size(); j++){
							Element fromNode = doc.createElement("fromId");
							fromNode.appendChild(doc.createTextNode(metric30NodeList.get(j)));
							nNode.appendChild(fromNode);
						}
					}else if(eElement.getElementsByTagName("Metric").item(0).getTextContent().equals(Integer.toString(50))){
						for (int j=0; j<metric40NodeList.size(); j++){
							Element fromNode = doc.createElement("fromId");
							fromNode.appendChild(doc.createTextNode(metric40NodeList.get(j)));
							nNode.appendChild(fromNode);
						}
					}else if(eElement.getElementsByTagName("Metric").item(0).getTextContent().equals(Integer.toString(60))){
						for (int j=0; j<metric50NodeList.size(); j++){
							Element fromNode = doc.createElement("fromId");
							fromNode.appendChild(doc.createTextNode(metric50NodeList.get(j)));
							nNode.appendChild(fromNode);
						}
					}
				}
			}
			
			/*
			 * For Checking purpose, print out the contents in each list
			 */
			System.out.println(metric20NodeList);
			System.out.println(metric30NodeList);
			System.out.println(metric40NodeList);
			System.out.println(metric50NodeList);
			System.out.println(metric60NodeList);
			
			
			// write the content into XML file
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");
			
			DOMSource source = new DOMSource(doc);
			StreamResult result = new StreamResult(new File("result.xml"));
			transformer.transform(source, result);
			
			

		} catch (Exception e){
			e.printStackTrace();
		}
	}
}
