import * as dotenv from 'dotenv';
import { User } from '../../db';

export interface UserEvent {
  eventId: number;
  eventName: string;
  userId: number;
  userName: string;
  eventDescription: string;
}

export enum UserEventId {
  loggedIn,
  loggedOut,
  loggedOutFromAll,
  editedUser,
  deletedUser,
  createdPost,
  editedPost,
  deletedPost,
  createdComment,
  editedComment,
  deletedComment,
  createdSubforum,
}

dotenv.config();

async function sendRegisteredEvent(userEvent: UserEvent) {
  const eventDashboardUrl = process.env.EVENT_DASHBOARD_URL;
  if (!eventDashboardUrl) {
    throw new Error('Invalid backend url');
  }

  try {
    await fetch(eventDashboardUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userEvent),
    });
  } catch (error) {
    console.error(`Error logging user event: ${error}`);
  }
}

export async function registerEvent(
  user: User,
  userEventId: UserEventId,
  extraInfo = '',
) {
  const { id: userId, username: userName } = user;
  const eventSentence = getEventIdAsSentence(userEventId);

  sendRegisteredEvent({
    eventId: userEventId,
    userId,
    eventName: UserEventId[userEventId],
    eventDescription: `${userName} ${eventSentence}${extraInfo}`,
    userName,
  });
}

function getCamelCaseArray(camel: string) {
  const reg = /([a-z0-9])([A-Z])/g;
  return camel.replace(reg, '$1 $2').split(' ');
}

export function getEventIdAsSentence(eventId: UserEventId) {
  return getCamelCaseArray(UserEventId[eventId])
    .map((w) => w.toLowerCase())
    .join(' ');
}
