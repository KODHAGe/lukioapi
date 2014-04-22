// Yksinkertainen RESTify-rajapinta lukiodatalle
// v 0.0.1
// &copy; WRW

// Ladataan vaatimukset asennettaessa:
// restify & mongojs
var restify = require('restify');
var mongojs = require('mongojs');

// API:n julkinen osoite ja kuunteluportti
var ip_addr = '127.0.0.1';
var port = '6565';

// Luodaan restify-palvelin
var server = restify.createServer({
	name : "testapp"
});

// Käynnistetään restify-palvelin
server.listen(port, ip_addr, function() {
	console.log('%s listening at %s', server.name, server.url);
});

// Ladataan restify-lisäosia
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

// MongoDB:n asetukset
var connection_string = '127.0.0.1:27017/test';
var db = mongojs(connection_string, ['test']);
var schools = db.collection('example');

// Rajapinnan hakuarvot
var PATH = '/lukio'
server.get({path : PATH , version : '0.0.1'} , findAllSchools);
server.get({path : PATH +'/:schoolId' , version : '0.0.1'} , findSchool);
server.post({path : PATH , version: '0.0.1'} ,postNewSchool);

// Hakufunktiot

// Haetaan kaikki lukiot
function findAllSchools(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    schools.find().sort({rank: -1}, function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.charSet('utf-8');
            res.send(200 , success);
            return next();
        }else{
            return next(err);
        }
 
    });
 
}

// Koulu ID:n perusteella
function findSchool(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    schools.findOne({_id:mongojs.ObjectId(req.params.schoolId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.charSet('utf-8');
            res.send(200 , success);
            return next();
        }
        return next(err);
    })
}

// Uusi koulu (WIP)
function postNewSchool(req , res , next){
    var school = {};
    school.title = req.params.title;
    school.description = req.params.description;
    school.location = req.params.location;
    school.postedOn = new Date();
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    schools.save(school , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , school);
            return next();
        }else{
            return next(err);
        }
    });
}
