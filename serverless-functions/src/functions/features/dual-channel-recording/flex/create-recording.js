const { prepareFlexFunction, extractStandardResponse } = require(Runtime.getFunctions()[
  'common/helpers/function-helper'
].path);
const VoiceOperations = require(Runtime.getFunctions()['common/twilio-wrappers/programmable-voice'].path);

const requiredParameters = [{ key: 'callSid', purpose: 'unique ID of call to record' }];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const { callSid } = event;

    const result = await VoiceOperations.createRecording({
      context,
      callSid,
      params: {
        recordingChannels: 'dual',
      },
    });

    const { recording, status } = result;
    let developerComment;

    if (result.twilioErrorCode) {
      // eslint-disable-next-line sonarjs/no-small-switch
      switch (result.twilioErrorCode) {
        case 21220:
          developerComment =
            'It is typical to see this error when trying to start a call recording on a call thats already ended.  This can happen when a hungup occurs after the agent accepts the task but before the recording is able to start';
          break;
        default:
          break;
      }
    }

    response.setStatusCode(status);
    response.setBody({ recording, ...extractStandardResponse(result), developerComment });
    return callback(null, response);
  } catch (error) {
    return handleError(error);
  }
});
