var fs = require('fs');

const BUILD_CONFIG_FILENAME = 'src/buildmetadata.json';
//Setup for generating build IDs
fs.readFile(BUILD_CONFIG_FILENAME, function (err, content) {
  if (err) throw err;
  var metadata = JSON.parse(content);
  metadata.buildRevision = metadata.buildRevision + 1;
  fs.writeFile(BUILD_CONFIG_FILENAME, JSON.stringify(metadata), function (err) {
    if (err) throw err;
    console.log(`Current build number: ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`);
  })
});
