'use strict';
/**
 * controller for Messages
 */
app.controller('InboxCtrl', ["$scope", "$state", "$interval",
function ($scope, $state, $interval) {
    $scope.noAvatarImg = "assets/images/default-user.png";
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.messages = [{
        "from": "John Stark",
        "date": new Date(y, m, d - 1, 19, 0),
        "subject": "Reference Request - Nicole Bell",
        "email": "stark@example.com",
        "avatar": "assets/images/avatar-6.jpg",
        "starred": false,
        "sent": false,
        "spam": false,
        "read": false,
        "content": "<p>Hi Peter, <br>Thanks for the e-mail. It is always nice to hear from people, especially from you, Scott.</p> <p>I have not got any reply, a positive or negative one, from Seibido yet.<br>Let's wait and hope that it will make a BOOK.</p> <p>Have you finished your paperwork for Kaken and writing academic articles?<br>If you have some free time in the near future, I want to meet you and explain to you our next project.</p> <p>Why not drink out in Hiroshima if we are accepted?<br>We need to celebrate ourselves, don't we?<br>Let's have a small end-of-the-year party!</p> <p>Sincerely, K. Nakagawa</p>",
        "id": 50223456
    }, {
        "from": "James Patterson",
        "date": new Date(y, m, d - 1, 18, 43),
        "subject": "Position requirements",
        "email": "patterson@example.com",
        "avatar": "assets/images/avatar-9.jpg",
        "starred": true,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>Dear Mr. Clarks</p> <p>I am interested in the Coordinator position advertised on XYZ. My resume is enclosed for your review. Given my related experience and excellent capabilities I would appreciate your consideration for this job opening. My skills are an ideal match for this position.</p> <p> <strong>Your Requirements:</strong> </p> <ul> <li>Responsible for evening operations in Student Center and other facilities, including managing registration, solving customer problems, dealing with risk management and emergencies, enforcement of department policies.</li> <li>Assists with hiring, training, and management of staff. Coordinate statistics and inventory.</li> <li>Experience in the supervision of student staff and strong interpersonal skills are also preferred.</li> <li>Valid Minnesota driver's license with good driving record. Ability to travel to different sites required.</li> <li>Experience in collegiate programming and management.</li> </ul> <p> <strong>My Qualifications:</strong> </p> <ul> <li>Register students for courses, design and manage program software, solve customer problems, enforce department policies, and serve as a contact for students, faculty, and staff.</li> <li>Hiring, training, scheduling and management of staff, managing supply inventory, and ordering.</li> <li>Minnesota driver's license with NTSA defensive driving certification.</li> <li>Extensive experience in collegiate programming and management.</li> <li>Excellent interpersonal and communication skills.</li> </ul> <p>I appreciate your taking the time to review my credentials and experience. Again, thank you for your consideration.</p> <p>Sincerely,<br> <br> James</p>",
        "id": 50223457
    }, {
        "from": "Mary Ferguson",
        "date": new Date(y, m, d - 1, 17, 51),
        "subject": "Employer's job requirements",
        "email": "mary@example.com",
        "avatar": "assets/images/avatar-8.jpg",
        "starred": false,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>Dear Mr. Clarks</p> <p>In response to your advertisement in the<em> Milliken Valley Sentinel </em> for Vice President, Operations, please consider the following:</p> <p> <strong>Develop and implement strategic operational plans.</strong> <br> 15+ years aggressive food company production management experience. Planned, implemented, coordinated, and revised all production operations in plant of 250+ employees.</p> <p> <strong>Manage people, resources and processes.</strong> <br> Developed and published weekly processing and packaging schedules to meet annual corporate sales demands of up to $50 million. Met all production requirements and minimized inventory costs.</p> <p> <strong>Coach and develop direct reports.</strong> <br> Designed and presented training programs for corporate, divisional and plant management personnel. Created employee involvement program resulting in $100,000+ savings annually.</p> <p> <strong>Ensure operational service groups meet needs of external and internal customers.</strong> <br> Chaired cross-functional committee of 16 associates that developed and implemented processes, systems and procedures plant-wide. Achieved year end results of 12% increase in production, 6% reduction in direct operational costs and increased customer satisfaction rating from 85% to 93.5%.</p> <p>I welcome the opportunity to visit with you about this position. My resume has been uploaded, per your instructions. I may be reached at the number above. Thanks again for your consideration.</p> <p>Sincerely,<br> <br> Mary Ferguson</p>",
        "id": 50223458
    }, {
        "from": "Jane Fieldstone",
        "date": new Date(y, m, d - 1, 17, 38),
        "subject": "Job Offer",
        "email": "fieldstone@example.com",
        "starred": false,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>Dear Mr. Clarks,</p> <p>As we discussed on the phone, I am very pleased to accept the position of Marketing Manager with Smithfield Pottery. Thank you for the opportunity. I am eager to make a positive contribution to the company and to work with everyone on the Smithfield team.</p> <p>As we discussed, my starting salary will be $38,000 and health and life insurance benefits will be provided after 90 days of employment.</p> <p>I look forward to starting employment on July 1, 20XX. If there is any additional information or paperwork you need prior to then, please let me know.</p> <p>Again, thank you.</p> <p> <br> Jane Fieldstone</p>",
        "id": 50223459
    }, {
        "from": "Steven Thompson",
        "date": new Date(y, m, d - 1, 12, 2),
        "subject": "Personal invitation",
        "email": "thompson@example.com",
        "avatar": "assets/images/avatar-3.jpg",
        "starred": false,
        "sent": false,
        "spam": false,
        "content": "<p>Dear Peter,</p> <p>Good Day!</p> <p>We would like to invite you to the coming birthday party of our son Francis John Waltz Jr. as he is celebrating his first birthday. The said party will be on November 27, 2010 at Toy Kingdom just along Almond road. All kids are expected to wear their beautiful fancy dress.</p> <p>We will be delighted with your presence in this party together with your family. We will be arranging transportation for all the guests for your convenience in going to the venue of the said party promptly.</p> <p>It is a great honor for us to see you at the party and please do confirm your attendance before the party in the given number so that we will arrange the service accordingly.</p> <p>Best regards,</p> <p>Mr. and Mrs. Thompson</p>",
        "id": 50223460
    }, {
        "from": "Michael A. Faust",
        "date": new Date(y, m, d - 1, 11, 22),
        "subject": "Re: Group Meeting",
        "email": "faust@example.com",
        "starred": true,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>Dear Sir</p><p>It was my pleasure to be introduced to you by Mr. Elliot Carson last Tuesday. I am delighted to make your acquaintance. Mr. Carson has highly recommended you as an esteemed businessman with integrity and good reputation.</p><p>Hence, it would be my pleasure to extend an invitation to you to join our Texas Businessmen Fellowship every last Saturday of the month from 6pm to 9pm at Texas Holiday Inn. This fellowship was set up by Texan businessmen who are sincere in assisting one another in honest business dealings and to look out for one another as a brother for another.</p><p>Attendance and membership are by invitation only. We share about the business trends and strategies as well as pitfalls to avoid so that it would make our members sharper in our business acumen. Every member is free to share his business knowledge, skills and tips. We want all members to succeed as a businessman.</p><p>As you are highly recommended by Mr. Carson, one of our founders, we shall be pleased to have you join us this month. Dress code: Smart casual. There would be a dinner at the fellowship so that members can be in a relaxed environment to mingle with one another.</p><p>We look forward to your confirmation to this invitation so that the necessary preparations can be done.</p><p>Respectfully yours,</p><p>Michael A. Faust</p>",
        "id": 50223461
    }, {
        "from": "Nicole Bell",
        "date": new Date(y, m, d - 1, 10, 31),
        "subject": "Congratulations ",
        "email": "nicole@example.com",
        "avatar": "assets/images/avatar-2.jpg",
        "starred": false,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>Dear friend Peter,</p><p>I am feeling very happy today to congratulate you as you got promotion. I got the news two days before that you are promoted from the post of junior manager to the post of senior manager. You really deserved that promotion. You were a employee of that company since 10 years. In these 10 years you have served the company a lot. With your skills, hard work, intelligence you have contributed to the companies success. Due to all these reasons you had to get promotion.</p><p>Personally I am very happy to see you getting successful in your life. This time also it was very delightful to hear about your success. I hope god bless you and give you pink of health. I will always ask god to give you everything that you need in your life. He may bless you with lot of happiness in your future. </p><p>Give my love to your children and regards to your parents.</p><p>Your’s affectionately,</p><p>Nicole Bell.</p>",
        "id": 50223462
    }, {
        "from": "Google Geoff",
        "date": new Date(y, m, d - 1, 9, 38),
        "subject": "JobSearch information letter",
        "email": "mutating@example.com",
        "starred": false,
        "sent": false,
        "spam": true,
        "content": "<p>Dear recipient,</p><p>Avangar Technologies announces the beginning of a new unprecendented global employment campaign. reviser yeller winers butchery twenties Due to company's exploding growth Avangar is expanding business to the European region. During last employment campaign over 1500 people worldwide took part in Avangar's business and more than half of them are currently employed by the company. And now we are offering you one more opportunity to earn extra money working with Avangar Technologies. druggists blame classy gentry Aladdi</p><p>We are looking for honest, responsible, hard-working people that can dedicate 2-4 hours of their time per day and earn extra Â£300-500 weekly. All offered positions are currently part-time and give you a chance to work mainly from home.</p><p>lovelies hockey Malton meager reordered</p><p>Please visit Avangar's corporate web site (http://www.avangar.com/sta/home/0077.htm) for more details regarding these vacancies.</p>",
        "id": 50223463
    }, {
        "from": "Shane Michaels",
        "date": new Date(y, m, d - 2, 20, 32),
        "subject": "Marketing agreement between two companies",
        "email": "shane@example.com",
        "starred": false,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>This letter is with regards to the advertisement given in the yesterdays newspaper &amp; we feel proud to introduce ourselves as M/s ABC advertising agency. We are ready to take up your proposal of doing marketing work for your company. We will charge $10,000 for a week for this work of marketing. This price includes print material like posters, handbills, radio announcements, advertisements in local newspaper as well as on television channels &amp; also street-to-street mike announcements. Your company will give the wordings of the announcement &amp; the payment can be made after the work gets complete. Mode of payment will be through cheques &amp; payment should be made in three installments, first on agreement, second at the time when work commences &amp; lastly when the work is completed.</p><p>Yours sincerely,</p><p>Shane Michaels</p>",
        "id": 50223464
    }, {
        "from": "Kenneth Ross",
        "date": new Date(y, m, d - 2, 19, 59),
        "subject": "Sincere request to keep in touch.",
        "email": "kenneth@example.com",
        "avatar": "assets/images/avatar-5.jpg",
        "starred": false,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>Dear Mr. Clarks,</p><p>I was shocked to see my letter after having just left and  part away from college just a couple of weeks ago. Well it’s my style to bring back together and  hold on to our college group who seems to get separated and  simply go along their own ways. Just giving it a sincere try, who wish to live life just like those college days, to share and  support for every minute crust and  fragments happening in the life.</p><p>So without any compulsion and  without any special invitation this is a one time offer cum request cum order to keep in touch and  also to live forever as best buddies. Hoping to see you at Café da Villa on this Sunday evening to celebrate our new beginning in a grand way.</p><p>Thanking you,</p>",
        "id": 50223465
    }];


    var incomingMessages = [
		{
		    "from": "Nicole Bell",
		    "date": new Date(),
		    "subject": "New Project",
		    "email": "nicole@example.com",
		    "avatar": "assets/images/avatar-2.jpg",
		    "starred": false,
		    "sent": false,
		    "read": false,
		    "spam": false,
		    "content": "Hi there! Are you available around 2pm today? I’d like to talk to you about a new project",
		    "id": 50223466
		},
		{
		    "from": "Steven Thompson",
		    "date": new Date(),
		    "subject": "Apology",
		    "email": "thompson@example.com",
		    "avatar": "assets/images/avatar-3.jpg",
		    "starred": false,
		    "sent": false,
		    "read": false,
		    "spam": false,
		    "content": "<p>Hi Peter,</p> <p>I am very sorry for my behavior in the staff meeting this morning.</p> <p>I cut you off in the middle of your presentation, and criticized your performance in front of the staff. This was not only unprofessional, but also simply disrespectful. I let my stress about a personal matter impact my management of the office.</p>",
		    "id": 50223467
		},
		{
		    "from": "Mary Ferguson",
		    "date": new Date(),
		    "subject": "Congratulations ",
		    "email": "mary@example.com",
		    "avatar": "assets/images/avatar-8.jpg",
		    "starred": false,
		    "sent": false,
		    "read": false,
		    "spam": false,
		    "content": "<p>Dear Ms. Clarks,</p> I am a friend of Emily Little and she encouraged me to forward my resume to you. I know Emily through a local children's theater, for which I was a lighting assistant this semester. I also see her at college music performances, as I am in the orchestra.</p>",
		    "id": 50223468
		}
    ];


    $scope.scopeVariable = 1;
    var loadMessage = function () {
        $scope.messages.push(incomingMessages[$scope.scopeVariable - 1]);
        $scope.scopeVariable++;
    };

    //Put in interval, first trigger after 10 seconds
    var add = $interval(function () {
        if ($scope.scopeVariable < 4) {
            loadMessage();
        }
    }, 10000);

    $scope.stopAdd = function () {
        if (angular.isDefined(add)) {
            $interval.cancel(add);
            add = undefined;
        }
    };
}]);
app.controller('ViewMessageCrtl', ['$scope', '$stateParams',
function ($scope, $stateParams) {
    function getById(arr, id) {
        for (var d = 0, len = arr.length; d < len; d += 1) {
            if (arr[d].id == id) {

                return arr[d];
            }
        }
    }


    $scope.message = getById($scope.messages, $stateParams.inboxID);

}]);
