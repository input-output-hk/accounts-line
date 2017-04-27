import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
});

Template.hello.helpers({
  lineUser() {
    const user = Meteor.users.findOne({ _id: Meteor.userId() });

    if (user) {
      return user.services.line.id;
    } else {
      return '';
    }
  },
  getLineUserIds() {
    return Meteor.users.find().fetch().map((user) => { return user.profile.id});
  }
});

Template.hello.events({
  'click .line-login'(event, instace) {
    Meteor.loginWithLine(function (err, res) {
      console.log('login callback', err, res);
      if (err !== 'undefined') {
        console.log('sucess ' + res, err);
      } else {
        console.log('login failed ' + err);
      }
    });
  },
  'click .message-button'(event, instance) {
    event.preventDefault();
    const lineId = $(".message-user").val();
    const message = $(".message-text").val();
    console.log('message', message, lineId);
    Meteor.call('sendLineMessage', message, lineId, (err, res) => {
      if (res) {
        alert('Message send!');
      }
    });
  },
  'click .logout'(event, instance) {
    Meteor.logout();
  }
});
