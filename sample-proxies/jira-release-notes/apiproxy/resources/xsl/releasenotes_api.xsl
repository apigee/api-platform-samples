<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <html>
            <body>
                <p>[toc]</p>
                <p>On {DAY_OF_WEEK}, {MONTH} {DAY_NUMBER}, 2017, we began releasing a new version of Apigee Edge for Public Cloud.</p>
                <div class="note">
    <p><strong>Private Cloud customers</strong>: Is this cloud release included in your Private Cloud version? See your version's release notes to see which cloud releases it contains. Also, see <a href="/release-notes/content/apigee-edge-release-process">About release numbering</a> to understand how you can figure it out by comparing release numbers.</p>
    <p><strong>Questions or issues?</strong> <a href="https://community.apigee.com/page/apigee-customer-support">Get help here</a>.</p>
    <p><strong>Release notifications</strong>: Go to <a href="http://status.apigee.com">http://status.apigee.com</a> and click <strong>Subscribe to Updates</strong>.</p>
    <p><a href="/release-notes/content/apigee-release-notes">Release notes home page</a></p>
</div>
                <h2>Deprecations and retirements</h2>
                <p>The following features are being deprecated or retired. See the <a href="/deprecation">Edge deprecation policy</a> for more information. See [node:23796] for the dates around which features will be retired (removed from the product).</p>
                <xsl:for-each select="Root/issues">
                    <xsl:if test="fields/labels='deprecation_notice'">
                        <h3>
                            <xsl:value-of select="fields/summary"/>
                        </h3>
                        <p>
                            <xsl:value-of select="fields/customfield_13000"/> (<xsl:value-of select="key"/>)
                        </p>
                    </xsl:if>
                </xsl:for-each>
                <h2>New features and updates</h2>
                <p>Following are the new features and updates in this release.</p>
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
                <p>The following bugs are fixed in this release. This list is primarily for users checking to see if their support tickets have been fixed. It's not designed to provide detailed information for all users.</p>
                <table class="table" summary="Bugs fixed in this release">
                    <thead>
                        <tr>
                            <th width="120" style="text-align: center">Issue ID</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="Root/issues">
                            <xsl:if test="not(fields/labels='deprecation_notice' or fields/labels='new_feature' or fields/labels='known_issue')">
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
