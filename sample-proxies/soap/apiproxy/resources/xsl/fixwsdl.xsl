<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"
  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/">
  <xsl:output method="xml"/>
  
  <xsl:param name="SOAPAddress"/>

  
  <xsl:template match="@* | node()">
    <xsl:copy>
       <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>
    
  <xsl:template match="/wsdl:definitions/wsdl:service/wsdl:port/soap:address">
    <xsl:element name="address" namespace="http://schemas.xmlsoap.org/wsdl/soap/">
      <xsl:attribute name="location">
        <xsl:value-of select="$SOAPAddress"/>
      </xsl:attribute>
    </xsl:element>
  </xsl:template>
</xsl:stylesheet>

