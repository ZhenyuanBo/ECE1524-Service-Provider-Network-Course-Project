This repo contains all the files I have written for this course project. 

The following is the description of each file in this repo: 

1. ece1524_isisTopoData.txt: data from cmnd "Show isis level-2 topology"
2. ipRibInfo.xml: xml format of ece1524_isisTopoData.txt
3. ipRibInfoModifier.js: modify the ipRibInfo.xml to display only the loopback0 ip addr. 
4. connectionRef.xml: translated version of ipRibInfo.xml in terms of its hostname
5. connectionRefModifier.js: modify the connectionRef.xml to generate newConnectionRef.xml
6. analysis.js: conduct analysis of result.xml and newConnectionRef.xml to generate "finalResult.xml"
7. finalResultGraph.xsl: transform finalResult.xml to abileneTopoGraph.xml
8. abileneTopoGraph.xml: graphml file to be used for graph display on an open-source platform
9. resultXMLGenerator.java: generate result.xml
10. connectionRefGenerator.java: generator connectionRef.xml
11. ISIS_TOPO_BUILD.py: build the xml file from the command output generate nodeList.xml
