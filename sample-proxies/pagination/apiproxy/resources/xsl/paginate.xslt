<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
        <xsl:output method="xml" version="1.0" encoding="UTF-8" />
        <xsl:param name="offset" select="offset"/>
        <xsl:param name="limit" select="limit"/>
        <xsl:template match="/">
            <Restaurants>
                <xsl:for-each select="/RestaurantLocator/Restaurant">
                 <xsl:if test="position() &lt; number($limit+$offset) and position() &gt; number($offset)-1">
                     <xsl:copy-of select="."/>
                 </xsl:if>
                   </xsl:for-each>
           </Restaurants>
        </xsl:template>
</xsl:stylesheet>
