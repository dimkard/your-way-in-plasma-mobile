/* displayRender.js
 *
 * Copyright (C) 2018 Dimitris Kardarakos <dimkard@gmail.com>, KDE.
 *
 * Authors:
 *   Dimitris Kardarakos <dimkard@gmail.com>
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program; if not, see <http://www.gnu.org/licenses/>.
 */

var DisplayRender = {
    language: 'en',

    addHelpers: function () {
        Handlebars.registerHelper('choice_info', function() {

            var choiceType= Handlebars.escapeExpression(this.type);
            if(choiceType === "node") {
                var nextGroup= Handlebars.escapeExpression(this.nextGroup);
                var choiceText = Handlebars.escapeExpression(this.choiceText);
                return new Handlebars.SafeString("next-group='"+nextGroup+ "'>"+ choiceText);
            }
            else if(choiceType === "leaf") { 
                var target= Handlebars.escapeExpression(this.target);
                var choiceId= Handlebars.escapeExpression(this.choiceId);
                var description= Handlebars.escapeExpression(this.description);
                var extraInfo= Handlebars.escapeExpression(this.extraInfo);
                var choiceHeader = "target='"+target+"' data-choice-id='"+ choiceId + "'>"+description;
                var choiceExtraInfo = "";
                if (extraInfo) {
                    choiceExtraInfo = "<div class='extra'>" + extraInfo + "</div>";
                }
                
                return new Handlebars.SafeString(choiceHeader+choiceExtraInfo);
            }
            });
        
        Handlebars.registerHelper('group_info', function() {
            var groupid= Handlebars.escapeExpression(this.groupid);
            var groupquestion = Handlebars.escapeExpression(this.groupquestion);
            return new Handlebars.SafeString("id='"+groupid+ "'><span class='question'>"+groupquestion+"</span>");
            });
    }
    ,
    renderTemplate: function() {
        var source   = document.getElementById("group-template").innerHTML;
        var template = Handlebars.compile(source);
        var targetLang = DisplayRender.language;
        var context = DisplayRender.questionFlow[targetLang];
        var html = template(context);
        //DEBUG console.log(html);
        $('#wrapper').prepend(html);
    }
    ,
    questionFlow: {
        en: {
                        groups: [
                            {
                                groupid: "rootgroup",
                                groupquestion: "What are the contribution areas you are the most interested in?",
                                choices: [  
                                    {   
                                        type: "node",
                                        nextGroup: "system-dev" , 
                                        choiceText: "System Development"
                                    },
                                    {
                                        type: "node",
                                        nextGroup: "design" , 
                                        choiceText: "Design"                                    
                                    },
                                    {
                                        type: "node",
                                        nextGroup: "outreach" , 
                                        choiceText: "Outreach"                                    
                                    },
                                    {
                                        type: "node",
                                        nextGroup: "app-dev" , 
                                        choiceText: "Application development"                                    
                                    },                                    
                                ]
                            },
                            {
                                groupid: "design",
                                groupquestion: "I am mostly interested in ",
                                choices: [  
                                    {
                                        type: "leaf",
                                        target: "https://community.kde.org/KDE_Visual_Design_Group/KirigamiHIG",
                                        choiceId: "target-kirigami-design",
                                        description: "Kirigami application design",
                                        extraInfo: "designing applications following the Kirigami Human Interface Guidelines"
                                    },
                                     {
                                        type: "leaf",
                                        target: "https://community.kde.org/Plasma/Mobile/Design",
                                        choiceId: "target-shell-design",
                                        description: "Shell and user interface design",
                                        extraInfo: "designing core Plasma Mobile user interface"
                                    },
                                ]
                            },
                            {
                                groupid: "app-dev",
                                groupquestion: "So, let's pick a task to get started. What about",
                                choices: [  
                                    {
                                        type: "leaf",
                                        target: "https://phabricator.kde.org/T6945",
                                        choiceId: "target-camera",
                                        description: "Camera application",
                                        extraInfo: "working on the camera application with support for taking picture and recording videos?"
                                    },
                                    {
                                        type: "leaf",
                                        target: "https://phabricator.kde.org/T6942",
                                        choiceId: "target-calendar",
                                        description: "Calendar application",
                                        extraInfo: "working on a calendar application, offering reminders and agenda functionalities?"
                                    },
                                    {
                                        type: "leaf",
                                        target: "https://phabricator.kde.org/T6935",
                                        choiceId: "target-dialer",
                                        description: "Dialer application",
                                        extraInfo: "working on the dialer application, providing an interface for managing phone calls?"
                                    },
                                    {
                                        type: "leaf",
                                        target: "https://phabricator.kde.org/T6936",
                                        choiceId: "target-sms",
                                        description: "SMS application",
                                        extraInfo: "working on the SMS application, offering functionalities like reading, sending and receiving of SMS?"
                                    },
                                    {
                                        type: "leaf",
                                        target: "https://phabricator.kde.org/T6937",
                                        choiceId: "target-contact-book",
                                        description: "Contact book application",
                                        extraInfo: "working on the contact book application, integrating Plasma Mobile with contacts of the KPeople backends?"
                                    }                                
                                    
                                ]
                            },
                            
                            {
                                groupid: "system-dev",
                                groupquestion: "So, let's pick a task to get started. What about",
                                choices: [  
                                      {
                                        type: "leaf",
                                        target: "https://phabricator.kde.org/T6940",
                                        choiceId: "target-ringtone",
                                        description: "Ringtone and Notifications",
                                        extraInfo: "working on controls and options for ringtones and call and message notifications?"
                                    },
                                    {
                                        type: "leaf",
                                        target: "https://phabricator.kde.org/T6946",
                                        choiceId: "target-usb-mtp",
                                        description: "USB-MTP storage support",
                                        extraInfo: "providing USB/MTP storage support to Plasma Mobile devices?"
                                    },
                                ]
                            },
                           {
                                groupid: "outreach",
                                groupquestion: "What is your specific area of interest?",
                                choices: [  
                                    {
                                        type: "leaf",
                                        choiceId: "target-doc",
                                        target: "https://community.kde.org/Plasma/Mobile",
                                        description: "Writting documentation",
                                        extraInfo: ""
                                    },
                                    {
                                        type: "leaf",
                                        choiceId: "target-promo",
                                        target: "https://community.kde.org/Promo",
                                        description: "Promoting Plasma Mobile",
                                        extraInfo: ""
                                    }                                
                                ]
                           }                            
                        ]
            }
    }
}
