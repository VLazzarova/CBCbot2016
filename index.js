'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

var data = require('./info.json')
var info = data.info

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send('It\'s showtime!');
})

app.get('/webhook/', function(req, res) {
    if (req.query['hub.verify_token'] == 'cbcbot') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function(req, res) {
        req.body.entry.forEach(function(e) {
            let messaging_events = e.messaging
            for (let i = 0; i < messaging_events.length; i++) {
                let event = e.messaging[i]
                let sender = event.sender.id
                    //this is only for testing
                if (event.message && event.message.text) {
                    receivedTextMessage(event)
                } else if (event.postback) {
                    receivedPostback(event)
                }
            }
        })

        res.sendStatus(200)
    })

// token viky
 //let token = "EAABrVGDK4uUBAOMjR0tYzOaqfCKoe1XeaMh17JidmujQHycNPytCIcPlyImKdwuePKDqeSFjvm0HC95EczR2ZB9pgYsZAVAljofAZAgZANQeAq0L9jJOmPfpUym75cjKlMlYyZABiaGo4ZCJo27ayxNwKfskaZBooexv7TGoZBeSngZDZD"
// token david
let token = 'EAAZABLcfAUI8BACLoMvWGBp3BvsJoQAULjO71ygwSWkhlDRa2kjzCb5P3xPiCYW0h1tmFTOfWCDp3VFQqsZBYvZALivDmVPquzHk3rax7ayL40TPOTjFez6hZA7dl90jXS1P9X2iLO2V3Y0E0uno4sGat77njnvhAeJmMwYUugZDZD'
if (process.env.MODE == 'production') {
    console.log("choosing production token")
    token = "EAAYZBHe3H4XoBANExZB1u6iySBTZA7XvxaBMoGhFE5VkOj9TmZCA3hZAWaWNu0a3i6fTf4OJglr2oRfIpoyX4DmBf5QeochDtwoUoGaOZAMZCEVRLoEJpKMe1qDGPsuEVfHdw2ASjLTpxfpPImmnVxCF5cjEU2Uzhpt4FSJtY5ZALQZDZD"
}


function receivedTextMessage(event) {
    console.log("textmessage")
    let senderID = event.sender.id
    let message = event.message

    let messageText = message.text
    let mt = messageText.toLowerCase()
    console.log(mt)
    if (mt) {
        switch (mt) {
            case 'schedule':
                return sendSchedule(senderID)
            case 'speakers':
                return sendSpeakers(senderID)
            case 'sponsors':
                return sendTextMessage(senderID, "We are vary happy to work with the following partners :)")
                    .then(() => sendSponsors(senderID))
            case 'locations':
                return sendLocations(senderID)
            case 'faq':
                return sendFAQ(senderID,0)
            case 'oratio':
            case 'about oratio':
                return sendTextMessage(senderID, "Hmmm.. This is something really cool! 👌🏽 oratio is a platform that makes mobile messengers accessible for businesses to offer customer service and customer support via WhatsApp, Facebook Messenger and Telegram Messenger.")
            case 'menu':
                return sendMenu(senderID)
            case 'meekan':
            case 'matty':
            case 'matty mariansky':
                return sendImage(senderID, "Matty Mariansky")
                    .then(() => aboutSpeaker(senderID, "Matty Mariansky"))
                    .then(() => aboutTalk(senderID, "Matty Mariansky"))
            case 'messenger':
            case 'facebook':
            case 'facebook messenger':
            case 'mikhail':
            case 'mikhail larionov':
                return sendImage(senderID, "Mikhail Larionov")
                    .then(() => aboutSpeaker(senderID, "Mikhail Larionov"))
                    .then(() => aboutTalk(senderID, "Mikhail Larionov"))
            case 'microsoft':
            case 'toby':
            case 'toby bradshaw':
                return sendImage(senderID, "Toby Bradshaw")
                    .then(() => sendTextMessage(senderID, "Toby Bradshaw is a Senior Engineer at Microsoft"))
            case 'viber':
            case 'ido':
            case 'ido iungelson':
                return sendImage(senderID, "Ido Iungelson")
                    .then(() => aboutSpeaker(senderID, "Ido Iungelson"))
                    .then(() => aboutTalk(senderID, "Ido Iungelson"))
            case 'line':
            case 'joseluis':
            case 'joseluis takahashi':
                return sendImage(senderID, "JoseLuis Takahashi")
                    .then(() => aboutSpeaker(senderID, "JoseLuis Takahashi"))
                    .then(() => aboutTalk(senderID, "JoseLuis Takahashi"))
            case 'slack':
            case 'amir':
            case 'amir shevat':
                return sendImage(senderID, "Amir Shevat")
                    .then(() => aboutSpeaker(senderID, "Amir Shevat"))
                    .then(() => aboutTalk(senderID, "Amir Shevat"))
            case 'ibm watson':
            case 'watson':
            case 'ibm':
            case 'christoph':
            case 'christoph auer-welsbach':
                return sendImage(senderID, "Christoph Auer-Welsbach")
                    .then(() => aboutSpeaker(senderID, "Christoph Auer-Welsbach"))
                    .then(() => aboutTalk(senderID, "Christoph Auer-Welsbach"))
            case 'google':
            case 'behshad':
            case 'behshad behzadi':
                return sendImage(senderID, "Behshad Behzadi")
                    .then(() => aboutSpeaker(senderID, "Behshad Behzadi"))
                    .then(() => aboutTalk(senderID, "Behshad Behzadi"))
            case 'wit.ai':
            case 'wit':
            case 'martin':
            case 'martin raison':
                return sendImage(senderID, "Martin Raison")
                    .then(() => aboutSpeaker(senderID, "Martin Raison"))
                    .then(() => aboutTalk(senderID, "Martin Raison"))
            case 'alex':
                return sendTextMessage(senderID, "Which Alex do you mean? Alex Bunardzic or Alex Braumann?")
            case 'staples':
            case 'staples imc':
            case 'bunardzic':
            case 'alex bunardzic':
                return sendImage(senderID, "Alex Bunardzic")
                    .then(() => aboutSpeaker(senderID, "Alex Bunardzic"))
                    .then(() => aboutTalk(senderID, "Alex Bunardzic"))
            case 'cisco':
            case 'cisco spark':
            case 'spark':
            case 'braumann':
            case "alex braumann":
                return sendImage(senderID, "Alex Braumann")
                    .then(() => aboutSpeaker(senderID, "Alex Braumann"))
                    .then(() => aboutTalk(senderID, "Alex Braumann"))
            case 'sure':
            case 'besure.io':
            case 'alexandra':
            case 'Alexandra Neczliova':
                return sendImage(senderID, "Alexandra Neczliova")
                    .then(() => aboutSpeaker(senderID, "Alexandra Neczliova"))
                    .then(() => aboutTalk(senderID, "Alexandra Neczliova"))
            case 'golastmile':
            case 'go lastmile':
            case 'alexander':
            case 'alexander weidauer':
                return sendImage(senderID, "Alexander Weidauer")
                    .then(() => aboutSpeaker(senderID, "Alexander Weidauer"))
                    .then(() => aboutTalk(senderID, "Alexander Weidauer"))
            case 'gupshup':
            case 'sohan':
            case 'sohan maheshwar':
                return sendImage(senderID, "Sohan Maheshwar")
                    .then(() => sendTextMessage(senderID, "Sohan Maheshwar is Lead Developer Relations at Gupshup"))
            case 'eddi':
            case 'e.d.d.i':
            case 'e.d.d.i.':
            case 'gregor':
            case 'gregor jarisch':
                return sendImage(senderID, "Gregor Jarisch")
                    .then(() => aboutSpeaker(senderID, "Gregor Jarisch"))
                    .then(() => aboutTalk(senderID, "Gregor Jarisch"))
            case 'swell':
            case 'swelly':
            case 'barbara':
            case 'barbara macinkovic':
                return sendImage(senderID, "Barbara Macinkovic")
                    .then(() => aboutSpeaker(senderID, "Barbara Macinkovic"))
                    .then(() => aboutTalk(senderID, "Barbara Macinkovic"))
            case 'poncho':
            case 'greg':
            case 'greg leuch':
                return sendImage(senderID, "Greg Leuch")
                    .then(() => aboutSpeaker(senderID, "Greg Leuch"))
                    .then(() => aboutTalk(senderID, "Greg Leuch"))
                break;
            case 'theventury':
            case 'jakob':
            case 'jakob reiter':
                return sendImage(senderID, "Jakob Reiter")
                    .then(() => aboutSpeaker(senderID, "Jakob Reiter"))
                    .then(() => aboutTalk(senderID, "Jakob Reiter"))
            default:
                //sendTextMessage(senderID, "Sorry, I didn't get that? Here are all your options 🙂")
                return sendMenu(senderID)
        }
    } else {
        return sendTextMessage(senderID, "Hello there!")
    }
}

function receivedPostback(event) {
    console.log("Hello postback")
    let senderID = event.sender.id
    let payload = event.postback.payload

    console.log("payload", payload)

    switch (payload) {
        case 'start':
            console.log("send menu")
            return sendGreetingM(senderID)
        case 'schedule':
            return sendSchedule(senderID)
        case 'main':
            return sendMainStage(senderID)
        case 'master':
            return sendMasterClass(senderID)
        case 'rightnow':
            return sendTextMessage(senderID, "Sorry, this will be available during the conference. Stay tuned!✌🏾")
        case 'speakers':
            return sendSpeakers(senderID)
        case 'sponsors':
            return sendTextMessage(senderID, "We are vary happy to work with the following partners :)")
                .then(() => sendSponsors(senderID))
        case 'locations':
            return sendLocations(senderID)
        case 'oratio':
            return sendTextMessage(senderID, "Hmmm.. This is something really cool! 👌🏽 oratio is a platform that makes mobile messengers accessible for businesses to offer customer service and customer support via WhatsApp, Facebook Messenger and Telegram Messenger.")
        case 'menu':
            return sendMenu(senderID)
        case 'open doors':
            return sendTextMessage(senderID, "We are opening doors at 8:30. After that is the check in of all guests and then we are ready to start! 🚀")
        case 'welcome':
            return sendTextMessage(senderID, "Get ready for the ChatbotConf 2016, Wohooo!🎉")
        case 'break':
            return sendTextMessage(senderID, "During the breaks you can grab something to eat 🍔 or drink 🍶. Make sure to get your #CBC16 tagged photo printed for free at the photo booth!📸")
        case 'panel':
            return sendTextMessage(senderID, "This panel discussion joined by Mikhail Larionov (Messenger), Behshad Behzadi (Google), Ido Iungelson (Viber) and JoseLuis Takahashi (LINE) tries to answer the question, what it will take to create the smart chatbots we all are working on and how we can accomplish that.")
            break;
        case 'ending':
            return sendTextMessage(senderID, "Team oratio will come on stage and share the highlights of the day plus an additional highlight about oratio ")
        case 'networking':
            return sendTextMessage(senderID, "You can get a beer, or two 🍻 , or three 🍻 🍺 and get to know some awesome people")
        case 'lemmings':
            return sendTextMessage(senderID, "Lemmings is an incubator focused on artificial intelligence and chatbots. It was happening this summer for the first time in Vienna! 🌟 The programme is initiated by Thomas Schranz and Allan Berger from blossom.")
        case 'afterparty':
            return sendTextMessage(senderID, "You can get more Info about the Afterparty here 😊")
                        .then(() => sendLocations(senderID))
        case 'Matty Mariansky':
            return sendImage(senderID, "Matty Mariansky")
                .then(() => aboutSpeaker(senderID, "Matty Mariansky"))
                .then(() => aboutTalk(senderID, "Matty Mariansky"))
        case 'Alex Braumann':
            return sendImage(senderID, "Alex Braumann")
                .then(() => aboutSpeakeraboutSpeaker(senderID, "Alex Braumann"))
                .then(() => aboutSpeakeraboutTalk(senderID, "Alex Braumann"))
        case 'Mikhail Larionov':
            return sendImage(senderID, "Mikhail Larionov")
                .then(() => aboutSpeaker(senderID, "Mikhail Larionov"))
                .then(() => aboutTalk(senderID, "Mikhail Larionov"))
        case 'Toby Bradshaw':
            return sendImage(senderID, "Toby Bradshaw")
                .then(() => aboutSpeaker(senderID, "Toby Bradshaw"))
                .then(() => aboutTalk(senderID, "Toby Bradshaw"))
        case 'Ido Iungelson':
            return sendImage(senderID, "Ido Iungelson")
                .then(() => aboutSpeaker(senderID, "Ido Iungelson"))
                .then(() => aboutTalk(senderID, "Ido Iungelson"))
        case 'JoseLuis Takahashi':
            return sendImage(senderID, "JoseLuis Takahashi")
                .then(() => aboutSpeaker(senderID, "JoseLuis Takahashi"))
                .then(() => aboutTalk(senderID, "JoseLuis Takahashi"))
        case 'Amir Shevat':
            return sendImage(senderID, "Amir Shevat")
                .then(() => aboutSpeaker(senderID, "Amir Shevat"))
                .then(() => aboutTalk(senderID, "Amir Shevat"))
        case 'Christoph Auer-Welsbach':
            return sendImage(senderID, "Christoph Auer-Welsbach")
                .then(() => aboutSpeaker(senderID, "Christoph Auer-Welsbach"))
                .then(() => aboutTalk(senderID, "Christoph Auer-Welsbach"))
        case 'Behshad Behzadi':
            return sendImage(senderID, "Behshad Behzadi")
                .then(() => aboutSpeaker(senderID, "Behshad Behzadi"))
                .then(() => aboutTalk(senderID, "Behshad Behzadi"))
        case 'Martin Raison':
            return sendImage(senderID, "Martin Raison")
                .then(() => aboutSpeaker(senderID, "Martin Raison"))
                .then(() => aboutTalk(senderID, "Martin Raison"))
        case 'Alex Bunardzic':
            return sendImage(senderID, "Alex Bunardzic")
                .then(() => aboutSpeaker(senderID, "Alex Bunardzic"))
                .then(() => aboutTalk(senderID, "Alex Bunardzic"))
        case 'Alexandra Neczliova':
            return sendImage(senderID, "Alexandra Neczliova")
                .then(() => aboutSpeaker(senderID, "Alexandra Neczliova"))
                .then(() => aboutTalk(senderID, "Alexandra Neczliova"))
        case 'Alexander Weidauer':
            return sendImage(senderID, "Alexander Weidauer")
                .then(() => aboutSpeaker(senderID, "Alexander Weidauer"))
                .then(() => aboutTalk(senderID, "Alexander Weidauer"))
        case 'Sohan Maheshwar':
            return sendImage(senderID, "Sohan Maheshwar")
                .then(() => aboutSpeaker(senderID, "Sohan Maheshwar"))
                .then(() => aboutTalk(senderID, "Sohan Maheshwar"))
        case 'Gregor Jarisch':
            return sendImage(senderID, "Gregor Jarisch")
                .then(() => aboutSpeaker(senderID, "Gregor Jarisch"))
                .then(() => aboutTalk(senderID, "Gregor Jarisch"))
        case 'Barbara Macinkovic':
            return sendImage(senderID, "Barbara Macinkovic")
                .then(() => aboutSpeaker(senderID, "Barbara Macinkovic"))
                .then(() => aboutTalk(senderID, "Barbara Macinkovic"))
        case 'Greg Leuch':
            return sendImage(senderID, "Greg Leuch")
                .then(() => aboutSpeaker(senderID, "Greg Leuch"))
                .then(() => aboutTalk(senderID, "Greg Leuch"))
        case 'Jakob Reiter':
            return sendImage(senderID, "Jakob Reiter")
                .then(() => aboutSpeaker(senderID, "Jakob Reiter"))
                .then(() => aboutTalk(senderID, "Jakob Reiter"))
        default:
            console.log(payload)
            break;

    }
}

function sendImage(recipientID, name) {
    console.log("We are in Image")
    let speakers = []
    speakers = info.speakers
    let url = ""
    speakers.forEach(function(speaker) {
        if (speaker.name == name) {
            url = speaker.image_url
        }
    })
    var messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            attachment: {
                type: "image",
                payload: {
                    url: url
                }
            }
        }
    }

    return callSendAPI(messageData)
        //aboutSpeaker(recipientID, name)
}

function sendFAQ(recipientID, index) {
  if(index == info.questions.length) return
  let questions = []
  questions = info.questions
    let messageText = questions[index].title + '\n' + '\n' + questions[index].answer
      return sendTextMessage(recipientID, messageText)
          .then(() => sendFAQ(recipientID, ++index))
}

function aboutSpeaker(recipientID, spName) {
    let speakers = []
    speakers = info.speakers
    let information = ""
    let talk = ""
    speakers.forEach(function(speaker) {
        if (speaker.name == spName) {
            information = speaker.info
            talk = speaker.talk
            console.log(information)
            console.log(talk);
        }
    })
    var messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            text: information
        }
    }

    var messageData2 = {
        recipient: {
            id: recipientID
        },
        message: {
            text: talk
        }
    }
    return callSendAPI(messageData)
        //callSendAPI(messageData2)
}

function aboutTalk(recipientID, spName) {
    let speakers = []
    speakers = info.speakers
    let information = ""
    let talk = ""
    speakers.forEach(function(speaker) {
        if (speaker.name == spName) {
            //information = speaker.info
            talk = speaker.talk
                //console.log(information)
            console.log(talk);
        }
    })
    var messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            text: talk
        }
    }
    return callSendAPI(messageData, true)
        //callSendAPI(messageData2)
}

function sendGreetingM(recipientID) {
    console.log("In sendMenu now")
    let messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            text: "Hi there! Welcome to ChatbotConf 2016! Here you can find some Info about the conference :) Just tell me what do you want to know. I am still not an AI, so be forgiving ;)  Here are your options ✌🏾"
        }
    }
    return callSendAPI(messageData, true)
}

function getQuickReplies() {
    return [{
        content_type: "text",
        title: "Schedule",
        payload: "schedule"
    }, {
        content_type: "text",
        title: "Speakers",
        payload: "speakers"
    }, {
        content_type: "text",
        title: "Sponsors",
        payload: "sponsors"
    }, {
        content_type: "text",
        title: "Locations",
        payload: "locations"
    }, {
        content_type: "text",
        title: "FAQ",
        payload: "faq"
    }, {
        content_type: "text",
        title: "About oratio",
        payload: "about oratio"
    }]
}

function sendMenu(recipientID) {
    console.log("In sendMenu now")
    let messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            text: "What would you like to know?"
        }
    }
    return callSendAPI(messageData, true)
}

function sendSchedule(recipientID) {
    let messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "Right now",
                        image_url: "https://c1.staticflickr.com/9/8569/30243051306_0c5da62475_o.png",
                        subtitle: "Will be available during the conference",
                        buttons: [{
                            type: "postback",
                            title: "Show",
                            payload: "rightnow"
                        }]
                    }, {
                        title: "Main Stage",
                        image_url: "https://c2.staticflickr.com/6/5627/30191320761_15bb295830_o.png",
                        subtitle: "See who is talking on the Main Stage",
                        buttons: [{
                            type: "postback",
                            title: "Show",
                            payload: "main"
                        }]
                    }, {
                        title: "Master Class",
                        image_url: "https://c2.staticflickr.com/6/5667/29646150164_dff8c3e1bc_o.png",
                        subtitle: "See who is talking in Master Class",
                        buttons: [{
                            type: "postback",
                            title: "Show",
                            payload: "master"
                        }]
                    }]
                }
            }
        }
    }
    return callSendAPI(messageData, true)
}

function sendSpeakers(recipientID) {
    var elements = []
    elements = getSpeakers(0, 7)
    let messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: elements
                }
            }
        }
    }


    var elements2 = []
    elements2 = getSpeakers(8, 17)
    let messageData2 = {
        recipient: {
            id: recipientID
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: elements2
                }
            }
        }
    }
    return callSendAPI(messageData)
                .then(() => callSendAPI(messageData2, true))
}

function getSpeakers(index, counter) {
    var speakers = info.speakers
    var max = counter >= speakers.length ? (speakers.length - 1) : counter
    var elements = []
    for (let i = index; i <= max; i++) {
        var name = speakers[i].name
        name.toString()
            //console.log(name + " " + i)
        elements.push({
            title: name,
            image_url: speakers[i].image_url,
            subtitle: speakers[i].stage,
            buttons: [{
                type: "postback",
                title: "About",
                payload: name
            }]
        })
    }
    //console.log(elements)
    return elements
}

function sendSponsors(recipientID) {
    var elements = []
    elements = getSponsors()
    let messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: elements
                }
            }
        }
    }
    return callSendAPI(messageData, true)
}

function getSponsors() {
    var sponsors = info.sponsors
    var elements = []
    for (let i = 0; i < sponsors.length; i++) {
        elements.push({
            title: sponsors[i].name,
            image_url: sponsors[i].image_url,
            buttons: [{
                type: "web_url",
                url: sponsors[i].web_page,
                title: "Visit the website"
            }]
        })
    }
    //console.log(elements)
    return elements
}

function sendMainStage(recipientID) {
    let schedule = info.events
    var events = []
    schedule.forEach(function(ev) {
        if (ev.stage == "Main Stage") {
            console.log("This is main stage session")
            events.push({
                title: ev.speaker,
                image_url: ev.image_url,
                subtitle: ev.time + ", " + ev.stage,
                buttons: [{
                    type: "postback",
                    title: "Details",
                    payload: ev.payload
                }]
            })
        }
    })

    let events2 = []
    let events3 = []

    for (let i = 0; i < 7; i++) {
        events3.push(events[i])
    }

    for (let i = 7; i < 17; i++) {
        events2.push(events[i])
    }
    let messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: events3
                }
            }
        }
    }

    let messageData2 = {
            recipient: {
                id: recipientID
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: events2
                    }
                }
            }
        }
        //console.log(events3)
        //console.log("second part :")
        //console.log(events2)
    return callSendAPI(messageData)
        .then(() => callSendAPI(messageData2, true))

}

function sendMasterClass(recipientID) {
    let schedule = info.events
    var events = []
    schedule.forEach(function(ev) {
        if (ev.stage == "Master Class") {
            console.log("This is master class session")
            events.push({
                title: ev.speaker,
                image_url: ev.image_url,
                subtitle: ev.time + ", " + ev.stage,
                buttons: [{
                    type: "postback",
                    title: "Details",
                    payload: ev.payload
                }]
            })
        }
    })

    let events2 = []
    let events3 = []

    for (let i = 0; i < 8; i++) {
        events2.push(events[i])
    }

    for (let i = 8; i < 18; i++) {
        events3.push(events[i])
    }
    let messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: events2
                }
            }
        }
    }

    let messageData2 = {
        recipient: {
            id: recipientID
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: events3
                }
            }
        }
    }
    return callSendAPI(messageData)
        .then(() => callSendAPI(messageData2, true))
}

function sendLocations(recipientID) {
    console.log("Locations here")
    let messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "ChatbotConf 2016 is taking place at Studio 44",
                        image_url: "https://c2.staticflickr.com/6/5687/29944389620_4d89005534_o.png",
                        subtitle: "Rennweg 44, 1130, Vienna",
                        buttons: [{
                            type: "web_url",
                            url: "https://www.google.at/maps/place/Studio+44+Eventlocation/@48.1932872,16.3881301,17z/data=!3m1!4b1!4m5!3m4!1s0x476d07641af4db67:0xdf3ee7db6a4c331f!8m2!3d48.1932836!4d16.3903188",
                            title: "Open in Google Maps"
                        }]
                    }, {
                        title: "Hotel Schani",
                        image_url: "https://c1.staticflickr.com/9/8755/30241247765_e882efee8a_o.png",
                        subtitle: "You can get a special hotel discount  starting at € 65 / night",
                        buttons: [{
                            type: "web_url",
                            url: " https://booking.hotelschani.com/rooms-rates?promo=bestofschani",
                            title: "Book a room"
                        }, {
                            type: "web_url",
                            url: "https://www.google.at/maps/place/Hotel+Schani+Wien/@48.182442,16.379054,17z/data=!3m1!4b1!4m5!3m4!1s0x476da9da33f21085:0x324445e2748718f!8m2!3d48.182442!4d16.381248",
                            title: "Open in Google Maps"
                        }]
                    }, {
                        title: "Afterparty at RED ROOM",
                        image_url: "https://c1.staticflickr.com/9/8554/30256458945_d94d30138e_o.png",
                        subtitle: "Starts 22:00 at Stubenring 20, 1010 Wien",
                        buttons: [{
                            type: "web_url",
                            url: "https://www.google.at/maps/place/Red+Room/@48.2081202,16.3787628,17z/data=!3m1!4b1!4m5!3m4!1s0x476d07753b0db89d:0x16de6d2524c6ed9!8m2!3d48.2081202!4d16.3809515",
                            title: "Open in Google Maps"
                        }]
                    }]
                }
            }
        }
    }
    return callSendAPI(messageData, true)
}

function sendTextMessage(recipientID, messageText) {
  console.log(messageText)
    let messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            text: messageText
        }
    }
    return callSendAPI(messageData)
}

function callSendAPI(messageToSend, replies) {
    replies = replies || false
    if(replies) messageToSend.message.quick_replies =  getQuickReplies()
    return new Promise((resolve, reject) => {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: token
            },
            method: 'POST',
            json: messageToSend
        }, (error, response, body) => {
            if (error) {
                console.log('Error sending messages: ', error)
                reject(error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error)
                reject(response.body.error)
            }
            resolve('');
        })
    })
}
