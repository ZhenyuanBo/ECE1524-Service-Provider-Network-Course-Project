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
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class part2 {
	public static void main(String[] args){
		try{
			File fXmlFile = new File("newIpRibInfo.xml");
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(fXmlFile);
			doc.getDocumentElement().normalize();
			System.out.println("Root element :" + doc.getDocumentElement().getNodeName());
			NodeList IpRegionList = doc.getElementsByTagName("IpRegion");
			
			Map<String,String> IPMap = new HashMap<String, String>();
			
			IPMap.put("3.3.3.3", "DNVRng");
			IPMap.put("1.1.1.1","STTLng");
			IPMap.put("2.2.2.2", "SNVAng");
			IPMap.put("4.4.4.4", "LOSAng");
			IPMap.put("5.5.5.5", "HSTNng");
			IPMap.put("6.6.6.6", "KSCYng");
			IPMap.put("7.7.7.7", "CHINng");
			IPMap.put("8.8.8.8", "IPLSng");
			IPMap.put("9.9.9.9", "ATLAng");
			IPMap.put("10.10.10.10", "NYCMng");
			IPMap.put("15.15.15.15", "WASHng");
			IPMap.put("12.12.12.12", "ATLA-M5");
			
			for (int i=0; i<IpRegionList.getLength(); i++){
				Node nNode = IpRegionList.item(i);
				if(nNode.getNodeType() == Node.ELEMENT_NODE){
					Element eElement = (Element) nNode;
					if(eElement.getElementsByTagName("fromId").getLength()==2){
						String fromIdVal = eElement.getElementsByTagName("fromId").item(0).getTextContent();
						String nodeId = IPMap.get(fromIdVal);
						eElement.getElementsByTagName("fromId").item(0).setTextContent(nodeId);

						String fromIdVal1 = eElement.getElementsByTagName("fromId").item(1).getTextContent();
						String nodeId1 = IPMap.get(fromIdVal1);
						eElement.getElementsByTagName("fromId").item(1).setTextContent(nodeId1);
					}
				}		
						
			}
			
			
			
			// write the content into XML file
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");
			
			DOMSource source = new DOMSource(doc);
			StreamResult result = new StreamResult(new File("connectionRef.xml"));
			transformer.transform(source, result);
			
		}catch (Exception e){
			e.printStackTrace();
		}
	}
}


