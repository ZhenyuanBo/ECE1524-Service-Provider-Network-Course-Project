<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>

	<xsl:template match="NodeList">
		<!--<graphml xmlns="http://graphml.graphdrawing.org/xmlns" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">-->
			<key id="d0" for="edge" attr.name="weight" attr.type="double"/>
			<graph id="nodeConnection" edgedefault="undirected">
				<xsl:for-each select="Node">
					<xsl:variable name="node" select="." />
					<node id="{$node/@id}"/>
				</xsl:for-each>
				<xsl:for-each select="Node">
					<xsl:variable name="dest" select="." />
					<xsl:for-each select="fromId">
						<xsl:variable name="src" select="."/>
						<edge source="{$dest/@id}" target = "{$src}">
							<data key="d0">
								<xsl:value-of select="10.0"/>
							</data>
						</edge>
					</xsl:for-each>
				</xsl:for-each>
			</graph>
		<!--</graphml>-->
	</xsl:template>
</xsl:stylesheet>
