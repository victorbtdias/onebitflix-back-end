require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const path = require("path");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({ region, accessKeyId, secretAccessKey });

function uploadFile(file: any, fileName: any) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
  };

  return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

function getFile(fileKey: any) {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  return s3.getObject(downloadParams).createReadStream();
}

exports.getFile = getFile;

function deleteFile(fileKey: any) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  return s3.deleteObject(deleteParams).promise();
}

exports.deleteFile = deleteFile;
