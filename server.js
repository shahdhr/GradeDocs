var express = require('express');
var app = express();
var elasticsearch = require('elasticsearch');
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));



var ipaddress  = process.env.OPENSHIFT_NODEJS_IP;
var port       = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var assessorID = "user";
var queryID = "1";
app.listen(port, ipaddress);

app.post("/api/search",searchElastic);
app.post("/api/write",writeToFile);



function writeToFile (req, res){
    var hit = req.body;
    console.log(hit);

    fs.stat("relevance.txt",function (err, stats) {
        if(err) {
            console.log("writing");
            fs.writeFileSync("relevance.txt",queryID+" "+assessorID+" "+hit._source.docno+" "+hit.relevance+"\n",function (err, doc) {
                if(err) {
                    console.log(err)
                } else {
                    console.log("line written");
                }
            });
        } else {
            fs.appendFile("relevance.txt",queryID+" "+assessorID+" "+hit._source.docno+" "+hit.relevance+"\n",function (err, doc) {
                if(err) {
                    console.log(err)
                } else {
                    console.log("line appended");
                }
            });
        }
    })
}




function searchElastic (req, res){
    var search = req.body;
    var search_query = search.query;
    assessorID = search.assessorID;
    queryID = search.queryID
    console.log(search_query);
    var client = elasticsearch.Client({
        hosts: [
            '127.0.0.1:9200']});

    client.search({
        index: 'chicago',
        size: 250,
        body: {
            query: {
                query_string: {
                    query: search_query
                }
            }
        }
    },function (err,response) {
        if(err) {
            res.status(400).send(err);
        } else {
            res.json(response.hits);

        }

    })

}
