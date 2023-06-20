// Export the template names as an enum for better maintainability when accessing them elsewhere
export enum StringTemplates {
  ErrorCallingCustomer = 'PSCallbackErrorCallingCustomerNotification',
  OutboundDialingNotEnabled = 'PSCallbackOutboundDialingNotEnabledNotification',
  CallbackRequestHeading = 'PSCallbackRequestHeading',
  CallbackRequestDescription = 'PSCallbackRequestDescription',
  VoicemailRequestHeading = 'PSCallbackVoicemailRequestHeading',
  VoicemailRequestDescription = 'PSCallbackVoicemailRequestDescription',
  VoicemailRecording = 'PSCallbackVoicemailRecording',
  VoicemailTranscript = 'PSCallbackVoicemailTranscript',
  ContactPhone = 'PSCallbackContactPhone',
  CallReceptionTime = 'PSCallbackCallReceptionTime',
  CallbackAttemptHeading = 'PSCallbackAttemptHeading',
  CallbackAttempts = 'PSCallbackAttempts',
  PlaceCallNow = 'PSCallbackPlaceCallNow',
  RetryLater = 'PSCallbackRetryLater',
  SystemTime = 'PSCallbackSystemTime',
}

export const stringHook = () => ({
  'en-US': {
    [StringTemplates.ErrorCallingCustomer]: 'Failed to call {{customer}}, please try again',
    [StringTemplates.OutboundDialingNotEnabled]:
      'Outbound dialing is not enabled, please notify a systems administrator',
    [StringTemplates.CallbackRequestHeading]: 'Callback Request',
    [StringTemplates.CallbackRequestDescription]: 'A contact has requested an immediate callback.',
    [StringTemplates.VoicemailRequestHeading]: 'Contact Voicemail',
    [StringTemplates.VoicemailRequestDescription]: 'A contact has left a voicemail that requires attention.',
    [StringTemplates.VoicemailRecording]: 'Voicemail recording',
    [StringTemplates.VoicemailTranscript]: 'Voicemail transcript',
    [StringTemplates.ContactPhone]: 'Contact phone',
    [StringTemplates.CallReceptionTime]: 'Call reception time',
    [StringTemplates.CallbackAttemptHeading]: 'Callback attempt',
    [StringTemplates.CallbackAttempts]: '{{thisAttempt}} of {{maxAttempts}}',
    [StringTemplates.PlaceCallNow]: 'Place Call Now To {{phoneNumber}}',
    [StringTemplates.RetryLater]: 'Retry Later',
    [StringTemplates.SystemTime]: 'System time: {{systemTime}}',
  },
});
