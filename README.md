# GradeDocs

GradeDocs in node.js and angualr.js project, created to hit locally running elasticsearch instance with queries and grade the retrieved docs as relevant or not.
Results are stored in a text file which can later be processed and send to qrel script to calculate Average Precision, F1-precision, nDCG etc.

# Steps to install



Setting Up Node.js Locally

Node.js will be used to run the applications on local machines.  Download and install (https://nodejs.org/en/) Node.js on the local development machine. Test that Node.js installed by typing the command node at the command line. A command prompt should appear waiting for additional commands. Type Ctrl+c twice to exit Node.js command line interpreter.

Once Node.js is installed follow the steps below:

1. git clone https://github.com/shahdhr/GradeDocs.git
2. cd GradeDocs
3. npm install
4. node server.js
5. browse to localhost:3000
6. Make sure you have a local instance of elastic search running on your PC!!


# Relevance File
A file called relevance.txt will be created in the project folder which will store your results.
* Format : 
 Each line in the file has four fields : QueryID AssessorID DocNo Relevance-Score


* Relevance-Scores : 
  Very Relevant : 2
  Relevant : 1
  Non relevant : 0
