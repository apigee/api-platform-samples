<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <html>
            <body>
                <p>[toc]</p>
                <p>On {DAY_OF_WEEK}, {MONTH} {DAY_NUMBER}, 2015, we released a new cloud version of Apigee Edge.</p>
                <div class="note">
                <p><strong>Questions or issues?</strong> <a href="https://community.apigee.com/page/apigee-customer-support">Get help here</a>.</p>
                <p><strong>Release notifications</strong>: Go to <a href="http://status.apigee.com">http://status.apigee.com</a> and click <strong>Subscribe to Updates</strong>.</p>
                <p>See a list of all [node:8408].</p>
                </div>
                <h2>New features and enhancements</h2>
                <p>Following are the new features and enhancements in this release.</p>
                <xsl:for-each select="Root/issues">
                    <xsl:if test="fields/labels='new_feature'">
                        <h3>
                            <xsl:value-of select="fields/summary"/>
                        </h3>
                        <p>
                <xsl:value-of select="fields/customfield_13000"/> (<xsl:value-of select="key"/>)
                        
                        
                        </p>
                    </xsl:if>
                </xsl:for-each>
                <h2>Bugs fixed</h2>
                <p>The following bugs are fixed in this release.</p>
                <table class="table" summary="Bugs fixed in this release">
                    <thead>
                        <tr>
                            <th width="120" style="text-align: center">Issue ID</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="Root/issues">
                            <xsl:if test="not(fields/labels='new_feature' or fields/labels='known_issue')">
                                <tr>
                                    <td style="text-align: center">
                                        <xsl:value-of select="key"/>
                                    </td>
                                    <td>
                                        <strong>
                                            <xsl:value-of select="fields/summary"/>
                                        </strong>
                                        <br/>
                                        <xsl:value-of select="fields/customfield_13000"/>
                                    </td>
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
                            <th width="120" style="text-align: center">Issue ID</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="Root/issues">
                            <xsl:if test="fields/labels='known_issue'">
                                <tr>
                                    <td style="text-align: center">
                                        <xsl:value-of select="key"/>
                                    </td>
                                    <td>
                                        <strong>
                                            <xsl:value-of select="fields/summary"/>
                                        </strong>
                                        <br/>
                                        <xsl:value-of select="fields/customfield_13000"/>
                                    </td>
                                </tr>
                            </xsl:if>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>