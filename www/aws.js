"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPutSignedUrl = exports.getGetSignedUrl = exports.s3 = void 0;
const AWS = require("aws-sdk");
const config_1 = require("./config/config");
const c = config_1.config.aws;
//Configure AWS
if (c.aws_profile !== "DEPLOYED") {
    var credentials = new AWS.SharedIniFileCredentials({
        profile: c.aws_profile,
    });
    AWS.config.credentials = credentials;
}
console.log("credentials:", AWS.config.credentials);
exports.s3 = new AWS.S3({
    signatureVersion: "v4",
    region: c.aws_region,
    params: { Bucket: c.aws_media_bucket },
});
/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
function getGetSignedUrl(key) {
    console.log("credentials, from getGetSignedUrl:", AWS.config.credentials);
    const signedUrlExpireSeconds = 60 * 5;
    const param = {
        Bucket: c.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds,
    };
    const url = exports.s3.getSignedUrl("getObject", param);
    return url;
}
exports.getGetSignedUrl = getGetSignedUrl;
/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
function getPutSignedUrl(key) {
    console.log("credentials, from getPutSignedUrl:", AWS.config.credentials);
    const signedUrlExpireSeconds = 60 * 5;
    const param = {
        Bucket: c.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds,
    };
    const url = exports.s3.getSignedUrl("putObject", param);
    return url;
}
exports.getPutSignedUrl = getPutSignedUrl;
//# sourceMappingURL=aws.js.map