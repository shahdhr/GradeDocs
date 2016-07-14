var express = require('express');
var app = express();
var elasticsearch = require('elasticsearch');
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));



var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);

app.get("/api/search/:searchQuery",searchElastic);
app.post("/api/write",writeToFile);



function writeToFile (req, res){
    var hit = req.body;
    console.log(hit);

    fs.stat("relevance.txt",function (err, stats) {
        if(err) {
            console.log("writing");
            fs.writeFile("relevance.txt","1 Dhruv "+hit._source.docno+" "+hit.relevance+"\n",function (err, doc) {
                if(err) {
                    console.log(err)
                } else {
                    console.log("line written");
                }
            });
        } else {
            fs.appendFile("relevance.txt","1 Dhruv "+hit._source.docno+" "+hit.relevance+"\n",function (err, doc) {
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
    var search_query = req.params.searchQuery;
    console.log(search_query);
    var client = elasticsearch.Client({
        hosts: [
            '127.0.0.1:9200']});

    // client.cluster.health(function (err, resp) {
    //     if (err) {
    //         console.error(err.message);
    //     } else {
    //         console.dir(resp);
    //     }
    // });

    client.search({
        index: 'newyork',
        size: 100,
        body: {
            query: {
                match_phrase: {
                    text: search_query
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
