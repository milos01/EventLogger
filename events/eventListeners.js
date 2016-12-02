var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var common = require('./eventsConf');
var commonEmitter = common.commonEmitter;

//Subscribe FirstEvent
commonEmitter.on('sendMail', function (data, appName) {
	console.log(data);
	var transporter = mailCreds();

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '"EventLogger" <downloading94@gmail.com>', // sender address
	    to: 'milosa942@gmail.com', // list of receivers
	    subject: 'EventLogger log', // Subject line
	    html: "<h3>Event logger log</h3><br/><p>New "+data.event_type+" on "+appName+" applitacion</p>" // html body
	};

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

});

function mailCreds(){
	return nodemailer.createTransport(smtpTransport({
	    host: 'smtp.gmail.com',
	    port: 25,
	    auth: {
	        user: 'downloading94@gmail.com',
	        pass: 'mladen2209'
	    }
	}));
}