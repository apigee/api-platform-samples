<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
<html>
	<body>
<p>[toc]</p>
<p>On {DAY_OF_WEEK}, {MONTH} {DAY_NUMBER}, 2015, we released a new cloud version of Apigee Edge.</p>
<div class="note">
	<p><a href="http://community.apigee.com/content/apigee-customer-support">Get help here</a> if you have questions, .</p>
	<p><a href="https://pages.apigee.com/release-notifications-submit.html">Sign up here</a> if you'd like to be notified about Apigee releases.</p>
	<p>For a list of all Apigee Edge release notes, see [node:8408].</p>
</div>


<h2>New features and enhancements</h2>
<p>Following are the new features and enhancements in this release.</p>

<xsl:for-each select="Root/issues">
<xsl:if test="fields/labels='new_feature'">
    <h3><xsl:value-of select="fields/summary"/></h3>
	<p><xsl:value-of select="fields/customfield_13000"/></p>
</xsl:if>
</xsl:for-each>


<h2>Bugs fixed</h2>
<p>The following bugs are fixed in this release.</p>
<table class="table" summary="Bugs fixed in this release">
  <thead>
		<tr>
			<th width="150">Topic</th>
			<th width="100" style="text-align: center">Issue ID</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
<xsl:for-each select="Root/issues">
  <xsl:if test="not(fields/labels='new_feature' or fields/labels='known_issue')">
<tr>
    <td><xsl:value-of select="fields/summary"/></td>
    <td style="text-align: center"><xsl:value-of select="key"/></td>
    <td><xsl:value-of select="fields/customfield_13000"/></td>
</tr>
</xsl:if>
</xsl:for-each>
	</tbody>
</table>


<h2>Known issues</h2>
<p>This release has the following known issues.</p>
<table class="table" summary="Known issues in this release">
  <thead>
		<tr>
			<th width="150">Topic</th>
			<th width="100" style="text-align: center">Issue ID</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
<xsl:for-each select="Root/issues">
<xsl:if test="fields/labels='known_issue'">
<tr>
    <td><xsl:value-of select="fields/summary"/></td>
    <td style="text-align: center"><xsl:value-of select="key"/></td>
    <td><xsl:value-of select="fields/customfield_13000"/></td>
</tr>
</xsl:if>
</xsl:for-each>
	</tbody>
</table>


</body>
</html>

</xsl:template>
</xsl:stylesheet>