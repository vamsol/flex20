import * as Flex from '@twilio/flex-ui';

import { StringTemplates } from '../strings';

// Export the notification IDs an enum for better maintainability when accessing them elsewhere
export enum DispositionsNotification {
  DispositionRequired = 'PSDispositionRequired',
}

// Return an array of Flex.Notification
export const notificationHook = (_flex: typeof Flex, _manager: Flex.Manager) => [
  {
    id: DispositionsNotification.DispositionRequired,
    type: Flex.NotificationType.error,
    content: StringTemplates.DispositionRequired,
    timeout: 3500,
  },
];
