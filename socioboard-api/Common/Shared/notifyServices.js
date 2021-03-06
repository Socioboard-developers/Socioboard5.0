import requestPromise from 'request-promise';
import NotifyModel from '../Mongoose/models/notifications.js';
import logger from '../../Publish/resources/Log/logger.log.js';

function Notification(host_url) {
  this.host_url = host_url;

  let notificationMessage = '';
  Object.defineProperty(this, 'notificationMessage', {
    set: function (message) {
      if (typeof message == 'string') {
        notificationMessage = message;
      }
    },
    get: function () {
      return notificationMessage;
    },
  });

  let teamName = '';
  Object.defineProperty(this, 'teamName', {
    set: function (team) {
      if (typeof team == 'string') {
        teamName = team;
      }
    },
    get: function () {
      return teamName;
    },
  });

  let notifyType = '';
  Object.defineProperty(this, 'notifyType', {
    set: function (type) {
      if (typeof type == 'string') {
        notifyType = type;
      }
    },
    get: function () {
      return notifyType;
    },
  });

  let initiatorName = '';
  Object.defineProperty(this, 'initiatorName', {
    set: function (initiator) {
      if (typeof initiator == 'string') {
        initiatorName = initiator;
      }
    },
    get: function () {
      return initiatorName;
    },
  });

  let profileType = '';
  Object.defineProperty(this, 'profileType', {
    set: function (profile) {
      if (typeof initiator == 'string') {
        profileType = profile;
      }
    },
    get: function () {
      return profileType;
    },
  });

  let status = '';
  Object.defineProperty(this, 'status', {
    set: function (nofityStatus) {
      if (typeof nofityStatus == 'string') {
        status = nofityStatus;
      }
    },
    get: function () {
      return status;
    },
  });
}

Notification.prototype.saveNotifications = function () {
  let mongoDetails = {
    notificationMessage: this.notificationMessage,
    teamName: this.teamName,
    notifyType: this.notifyType,
    initiatorName: this.initiatorName,
    profileType: this.profileType,
    status: this.status,
    targetUserIds: this.targetUserId,
    targetTeamIds: this.targetTeamsId,
  };
  let notifyMongo = new NotifyModel(mongoDetails);
  return notifyMongo.save();
};

Notification.prototype.sendTeamNotification = async function (teamId, Message) {
  try {
    await requestPromise(
      `${this.host_url}/v1/notify/sendTeamNotification?teamId=${teamId}&notificationDetails=${Message}`
    );
    logger.info('Send Notifications');
    return;
  } catch (error) {
    throw error;
  }
};

Notification.prototype.sendUserNotification = function (userId, Message) {
  return requestPromise(
    `${this.host_url}/v1/notify/sendUserNotification?userId=${userId}&notificationDetails=${Message}`
  )
    .then(() => {
      logger.info('Send Notifications');
      return;
    })
    .catch(error => {
      return;
    });
};

export default Notification;
